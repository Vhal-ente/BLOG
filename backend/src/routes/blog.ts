import express from 'express';
import { getBlogs, createBlogs, updateBlogs , getOneblog,deleteBlog, getUserBlogs } from "../controller/blogController";
import { auth } from '../middleware/auth';
import cors from 'cors'

const router = express.Router()

router.get('/get-blogs', getBlogs);
router.get('/get-user-blogs',auth, getUserBlogs);
router.get('/get-blogs/:id', getOneblog);
router.post('/create',auth, createBlogs);
router.patch('/update/:id',  updateBlogs);
router.delete('/delete/:id', deleteBlog)


export default router;