import { Router } from 'express';
import { login, logout, verifyMagicLink, getToken } from '../controllers/adminAuthController';

const adminRoute = Router();

adminRoute.post('/login', login);
adminRoute.get('/logout', logout);
adminRoute.get('/verifyMagicLink', verifyMagicLink);
adminRoute.get('/getToken', getToken);

export default adminRoute;
