import fetch from 'node-fetch';
import fs from 'fs';
import { readFile } from 'fs/promises';
const Searchdata = JSON.parse(
	await readFile(
		new URL('./data.json', import.meta.url)
	)
);


async function buildRequest(key = null, limit = 30) {
	const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDa8c0toCXc67ilT_0vNLzflrg-ZfQFoTw&part=id,snippet&q=${key ? key.toString() : Searchdata.list.toString()}&maxResults=${limit}`;
	const request = fetch(url)
		.then(response => response.json())
		.then(json => {
			const data = json.items;
			return data;
		});
	console.log(request);
	return request;
}
let i = 0;

function getVideo(key = Searchdata.list, limit = 30) {
	return buildRequest(key, limit).then(async data => {
		let filtData;
		const videoId = data.map(element => element.id.videoId);
		const url = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDa8c0toCXc67ilT_0vNLzflrg-ZfQFoTw&part=id,snippet&fields=items(id,snippet(title,description,tags,thumbnails,channelTitle))&id=${videoId.join(',')}& maxResults=${limit}`;
		const request = await fetch(url)
		let response = await request.json();
		response = response.items;
		filtData = response.filter(element => videoFilter(element.snippet.tags));
		console.log('SAVED');
		fs.writeFileSync('data.json', JSON.stringify(Searchdata));
		return filtData;
	});
}

function videoFilter(element) {
	if (element) {
		let l = element.length > 5 ? 5 : element.length;
		try {
			let regex = new RegExp(Searchdata.list.join('|'), 'gi');
			for (let i = 0; i < l; i++) {
				if (regex.test(element[i])) {
					Searchdata.list.push(...(element.slice(0, i)));
					return true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	} return false;
}


export { getVideo };
// console.log(getVideo());