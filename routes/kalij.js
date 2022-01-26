import express from 'express';
import { getKalijs,getKalij,getKal, createKalij, updateKalij, deleteKalij, likeKalij } from '../controller/kalijinfo.js';
const router =  express.Router();
import auth from '../middleware/auth.js';

router.get('/', getKalijs)
router.get('/all', getKal)
router.get('/:id', getKalij)
router.post('/', createKalij)
router.patch('/:id', updateKalij)
router.delete('/:id', deleteKalij)
router.patch('/:id/likeKalij', likeKalij)
export default router;