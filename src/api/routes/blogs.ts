import { Router } from "express";
import { createBlogController, deleteBlogController,  getUsersBlogController, updateBlogController } from "../controllers/blogs";

const blogsRoute = Router();


blogsRoute.post('/create', createBlogController )
blogsRoute.get('/', getUsersBlogController )  // get users all blog
blogsRoute.patch('/:blog_id', updateBlogController  )
blogsRoute.delete('/:blog_id', deleteBlogController  ) // deleting single blog


export default blogsRoute;

