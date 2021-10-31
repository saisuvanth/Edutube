import express from 'express';
const router = express.Router();
import { getVideo } from './api/api.js'

router.get('/', async (req, res) => {
	const data = await getVideo();
	res.json(data);
});

export default router;