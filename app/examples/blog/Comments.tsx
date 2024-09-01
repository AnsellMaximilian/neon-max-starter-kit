"use client";

import { createComment, getAllComments } from "@/actions/comment";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AUTH_URLS } from "@/config/auth";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function Comments({ blogId }: { blogId: number }) {
  const { status } = useSession();
  const { toast } = useToast();

  const [comments, setComments] = useState<
    Prisma.CommentGetPayload<{
      include: {
        author: {
          select: {
            name: true;
          };
        };
      };
    }>[]
  >([]);
  const [createCommentState, createCommentAction, submittingComment] =
    useFormState(createComment, {
      message: "",
      error: false,
      createdCommentId: null,
    });

  const userAuthenticated = status === "authenticated";
  const loadingSession = status === "loading";

  useEffect(() => {
    (async () => {
      const comments = await getAllComments(blogId);
      setComments(comments);
    })();
  }, [createCommentState.createdCommentId, blogId]);

  useEffect(() => {
    if (createCommentState.error) {
      toast({
        variant: "destructive",
        title: "Error creating comment",
        description: createCommentState.message,
      });
    }
  }, [createCommentState, toast]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      {loadingSession ? (
        <div>Loading user...</div>
      ) : userAuthenticated ? (
        <form action={createCommentAction}>
          <div className="flex gap-2 items-center">
            <input type="hidden" name="blogId" value={blogId} />
            <Input type="text" name="content" placeholder="Your comment..." />
            <Button type="submit" disabled={submittingComment}>
              Submit
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <p>You need to log in to comment</p>{" "}
          <Link
            href={AUTH_URLS.LOGIN}
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
        </div>
      )}
      <ul className="flex flex-col gap-2 mt-4">
        {comments.map((c) => (
          <li key={c.id} className="p-4 border-border rounded-md border">
            <div className="font-bold text-sm">{c.author.name}</div>
            <div>{c.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
