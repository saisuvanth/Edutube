import { getVideo } from './api.js'

const cards = document.querySelectorAll('.mycard');
let Data = [];


async function getData() {
	Data = await getVideo();
	cards.forEach((card, index) => {
		let id = Data[index]["id"];
		let image = Data[index].snippet.thumbnails.medium;
		let title = Data[index].snippet.title;
		let description = Data[index].snippet.description.slice(0, 20) + ' ...';
		let channel = Data[index].snippet.channelTitle;
		card.querySelector('img').src = image.url;
		card.querySelector('h3').innerHTML = title;
		card.querySelector('p')[0].innerHTML = description;
		card.querySelector('p')[1].innerHTML = 'By ' + channel;
	});
}

getData()