"use server";
import { authenticated } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getBlogById } from "./blog";
import { commentSchema } from "@/lib/zod";

const prisma = new PrismaClient();

export type CreateCommentState = {
  message: string;
  error: boolean;
  createdCommentId: null | string;
};

// Create a new Comment
export async function createComment(
  prevState: CreateCommentState,
  formData: FormData
): Promise<CreateCommentState> {
  const user = await authenticated();

  const blogId = Number(formData.get("blogId"));
  const content = formData.get("content") as string;

  const blog = await getBlogById(blogId);

  let message = "";
  let error = false;

  let createdCommentId = null;

  const validation = commentSchema.safeParse(content);

  if (!validation.success) {
    message = validation.error.errors[0].message; // Handle validation errors
    error = true;

    // if validation fails, return early
    return {
      message,
      error,
      createdCommentId,
    };
  }

  if (blog) {
    const comment = await prisma.comment.create({
      data: {
        content: content,
        authorId: user.id!,
        blogId: blog.id,
      },
    });
    createdCommentId = comment.id;
    message = "Commenet created";
  } else {
    error = true;
    message = "Blog not found.";
  }

  return {
    error,
    message,
    createdCommentId,
  };
}

// Get all Comments
export async function getAllComments(blogId: number) {
  const comments = await prisma.comment.findMany({
    where: {
      blogId,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log(comments);
  return comments;
}
