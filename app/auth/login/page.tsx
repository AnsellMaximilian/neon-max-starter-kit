import { loginUser } from "@/actions/auth";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
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
      </div>
    </main>
  );
}
