import { User } from "@/models/User";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

// Function to verify user credentials
export async function verifyUser(
  email: string,
  password: string
): Promise<User | null> {
  const result = await sql`SELECT * FROM users WHERE email = ${email}`;
  const user = result[0] as User | undefined;

  if (user && user.password && bcrypt.compareSync(password, user.password)) {
    return user;
  }

  return null;
}

// Function to create a new user (for registration)
export async function createUser(
  username: string,
  name: string,
  email: string,
  password: string
): Promise<User> {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const result =
    await sql`INSERT INTO users (username, name, email, password) VALUES (${username}, ${name}, ${email}, ${hashedPassword}) RETURNING *`;
  return result[0] as User;
}
