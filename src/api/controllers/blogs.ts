import { Request, Response, NextFunction } from 'express';
import { createBlogService, deleteBlogService,  getAllBlogsService,  getusersBlogService, updateBlogService } from '../services/blogs';
import checkRequiredFields from '../../utils/helpers/checkRequiredFields';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const getAllBlogsController = async (req:Request, res: Response, next: NextFunction) => {
  
  try {
    const blogs = await getAllBlogsService();
    return res.status(200).json({ message: 'Successfully retrieved the blog list', data:blogs });
  } catch (err) {
    console.error('Error retrieving blogs:', err);
    next(err);
  }
};

export const getUsersBlogController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let { author_id } = req?.user;
  
  try {
    const blog = await getusersBlogService(author_id);
    return res.status(200).json({ message: 'Successfully retrieved the blog', data: blog });
  } catch (err) {
    console.error('Error retrieving blog:', err);
    next(err);
  }
};

export const createBlogController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { title,  description } = req.body;
  const {  username, author_id } = req?.user;
  
  checkRequiredFields({ title, description }, res);

  if (!author_id) {
    return res.status(400).json({ message: "Missing author_id in request user" });
  } 
  if (username.length == 0) {
    return res.status(400).json({ message: "Missing in user name request user" });
  }

  try {
    const blog = await createBlogService(title, description,username, author_id);
    return res.status(200).json({ message: "Blog created successfully", data:blog });
  } catch (err) {
    console.error('Error creating blog:', err);
    next(err);
  }
};

export const updateBlogController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let { blog_id } = req.params;
  const { title,  description } = req.body;

  if (blog_id.startsWith(':')) {
    blog_id = blog_id.replace(':', '');
  }

  checkRequiredFields({ title,  description }, res);

  try {
    const blog = await updateBlogService(title,  description, blog_id);
    return res.status(200).json({ message: 'Updated successfully', data:blog });
  } catch (err) {
    console.error('Error updating blog:', err);
    next(err);
  }
};

export const deleteBlogController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let { blog_id } = req.params;

  if (blog_id.startsWith(':')) {
    blog_id = blog_id.replace(':', '');
  }

  checkRequiredFields({ blog_id }, res);

  try {
    const deletedBlog = await deleteBlogService(blog_id);
    return res.status(200).json({ message: 'Deleted successfully', deletedBlog });
  } catch (err) {
    console.error('Error deleting blog:', err);
    next(err);
  }
};