import { loginUser } from "@/actions/auth";
import ErrorMessage from "@/components/ui/error-message";
import { AUTH_URLS } from "@/config/auth";
import { Auth } from "@/lib/auth";
import { Errors } from "@/lib/errors";
import Image from "next/image";
import Link from "next/link";

export default async function LoginPage() {
  // if user is already authenticated, redirect to home page
  await Auth.guest();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <ErrorMessage message={Errors.get("auth")} className="mb-4" />
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
          <ErrorMessage message={Errors.get("email")} className="mt-2" />

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
            <ErrorMessage message={Errors.get("password")} className="mt-2" />
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
          <Link className="text-green-400" href={AUTH_URLS.REGISTER}>
            here
          </Link>
          .
        </div>
      </div>
    </main>
  );
}
