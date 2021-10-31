import express from 'express';
const router = express.Router();
import { getVideo } from './api/api.js'

router.get('/:key/:limit', async (req, res) => {
	const data = await getVideo(req.params.key, req.params.limit ? req.params.limit + 5 : 10);
	res.json(data);
});


export default router;