"use server";

import { Blog } from "@/models/Blog";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Create a new blog
export async function createBlog(
  title: string,
  content: string
): Promise<Blog> {
  const result =
    await sql`INSERT INTO blogs (title, content) VALUES (${title}, ${content}) RETURNING *`;
  return result[0] as Blog;
}

// Retrieve all blogs
export async function getBlogs(): Promise<Blog[]> {
  const result = await sql`SELECT * FROM blogs ORDER BY created_at DESC`;
  return result as Blog[];
}

// Retrieve a single blog by ID
export async function getBlogById(id: number): Promise<Blog | null> {
  const result = await sql`SELECT * FROM blogs WHERE id = ${id}`;
  return (result[0] as Blog) || null;
}

// Update an existing blog
export async function updateBlog(
  id: number,
  title: string,
  content: string
): Promise<Blog> {
  const result =
    await sql`UPDATE blogs SET title = ${title}, content = ${content}, updated_at = NOW() WHERE id = ${id} RETURNING *`;
  return result[0] as Blog;
}

// Delete a blog by ID
export async function deleteBlog(id: number): Promise<void> {
  await sql`DELETE FROM blogs WHERE id = ${id}`;
}
