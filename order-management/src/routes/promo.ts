import { Router } from 'express';
import { protectAuth } from '../middleware/protectAuth';
import { addPromo, getPromos, deletePromo, getValidPromos, incrementTotalApply } from '../controllers/promo';
const promoRoutes = Router();

promoRoutes.post('/add', protectAuth, addPromo);
promoRoutes.get('/get', protectAuth, getPromos);
promoRoutes.delete('/delete/:id', protectAuth, deletePromo);
promoRoutes.get('/getValidPromos', getValidPromos);
promoRoutes.put('/incrementTotalApply/:id', incrementTotalApply);

export default promoRoutes;
