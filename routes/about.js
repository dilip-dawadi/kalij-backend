import express from 'express';
import { getAbouts, createAbout, deleteAbout, updateAbout } from '../controller/about.js';

const router =  express.Router();
router.get('/', getAbouts)
router.delete('/:id', deleteAbout)
router.patch('/:id', updateAbout)
router.post('/', createAbout)
export default router;