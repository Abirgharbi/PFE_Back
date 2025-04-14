import { Router } from 'express';
import { pay } from '../controllers/payment';
const router = Router();

router.post('/pay', pay);

export default router;