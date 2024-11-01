import prisma from "../../config/db";
import error from "../../utils/error";

export const getAllBlogsService = async () => {
  const blogs = await prisma.blogs.findMany();

  if (blogs.length === 0) {
    throw error('No blogs found for the given user ID', 404);
  }

  return blogs;
};

export const getusersBlogService = async (author_id: string) => {
  const blog = await prisma.blogs.findMany({
    where:{
      userId: author_id
    }
  })

  if (!blog) {
    throw error('There is no blog related to this ID', 400);
  }

  return blog;
};

export const createBlogService = async (title: string, description: string, username: string, author_id:string) => {
  let blog = await prisma.blogs.findFirst({
    where: {
      title: title,
    },
  });

  if (blog) {
    throw error('Blog with this title already exists.', 400);
  }

  const newBlog = await prisma.blogs.create({
    data: {
      title: title,
      description: description,
      username:username,
      user: {
        connect: {
          id:author_id
        },
      },
    },
  });

  if (!newBlog) {
    throw error('Blog is not created', 500);
  }

  return newBlog;
};

export const updateBlogService = async ( title: string, description: string, blog_id: string,) => {
  const blog = await prisma.blogs.findUnique({
    where: {
      id: blog_id,
    },
  });

  if (!blog) {
    throw error('Blog not found for the given ID', 404);
  }

  const updatedBlog = await prisma.blogs.update({
    where: {
      id: blog_id,
    },
    data: {
      title: title,
      description: description,
    },
  });

  return updatedBlog;
};

export const deleteBlogService = async (blog_id: string) => {
  const blog = await prisma.blogs.findUnique({
    where: {
      id: blog_id,
    },
  });

  if (!blog) {
    throw error('Blog not found for the given ID', 404);
  }

  const deletedBlog = await prisma.blogs.delete({
    where: {
      id: blog_id,
    },
  });

  return deletedBlog;
};