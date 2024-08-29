"use server";

import { authenticated } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { Blog, PrismaClient } from "@prisma/client";

const sql = neon(process.env.DATABASE_URL!);
const prisma = new PrismaClient();

// Create a new blog
export async function createBlog(
  title: string,
  content: string
): Promise<Blog> {
  const user = await authenticated();

  const newBlog = await prisma.blog.create({
    data: {
      title,
      content,
      author: { connect: { id: user.id! } },
    },
  });
  return newBlog;
}

// Retrieve all blogs
export async function getBlogs(): Promise<Blog[]> {
  const blogs = await prisma.blog.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return blogs;
}

// Retrieve a single blog by ID
export async function getBlogById(id: number): Promise<Blog | null> {
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: {
      author: true, // Include author details in the response
    },
  });
  return blog;
}

// Update an existing blog
export async function updateBlog(
  id: number,
  title: string,
  content: string
): Promise<Blog> {
  const user = await authenticated();

  const oldPost = await getBlogById(id);

  if (!oldPost) {
    throw new Error("Post not found");
  } else if (oldPost.authorId !== user.id) throw new Error("Unauthorized");

  const updatedPost = await prisma.blog.update({
    where: { id },
    data: {
      title,
      content,
    },
  });
  return updatedPost;
}

// Delete a blog by ID
export async function deleteBlog(id: number): Promise<void> {
  const user = await authenticated();

  const post = await getBlogById(id);

  if (!post) {
    throw new Error("Post not found");
  } else if (post.authorId !== user.id) throw new Error("Unauthorized");

  await prisma.blog.delete({
    where: { id },
  });
}
