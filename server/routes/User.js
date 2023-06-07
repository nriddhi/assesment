import express from 'express';
import {createUser, loginUser} from '../controllers/User.js'

const router = express.Router();

router.post('/createuser', createUser);
router.post('/loginuser', loginUser);

export default router;