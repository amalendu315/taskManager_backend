import express from 'express';
import authRouter from '../apis/auth/auth_route';

const router = express.Router();


router.use('/auth', authRouter);


export default router;