import { loginUser } from "@/actions/auth";
import { unAuthenticated } from "@/lib/auth";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function LoginPage() {
  const errCookie = cookies().get("errors");
  let errMessages: string[] = [];

  try {
    errMessages = errCookie?.value ? JSON.parse(errCookie.value) : [];
  } catch (error) {}

  // if user is already authenticated, redirect to home page
  await unAuthenticated();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ul className="flex flex-col gap-2 mb-4">
        {errMessages.map((msg, index) => (
          <li
            key={index}
            className="bg-red-100 border border-red-600 p-2 rounded-md"
          >
            {msg}
          </li>
        ))}
      </ul>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/images/neon-max-logo-full.svg"
              alt="Neon Logo"
              width={220}
              height={150}
              className="w-44"
              priority
            />
          </Link>
        </div>
        <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
        <form action={loginUser} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          Don&apos;t have an account? Register{" "}
          <Link className="text-green-400" href="/auth/register">
            here
          </Link>
          .
        </div>
      </div>
    </main>
  );
}
