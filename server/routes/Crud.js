import express from 'express';
import {createData, getData, editData, deleteData} from '../controllers/Crud.js'

const router = express.Router();

router.post('/create', createData);
router.get('/getData', getData);
router.patch('/edit/:id', editData);
router.delete('/delete', deleteData);

export default router;