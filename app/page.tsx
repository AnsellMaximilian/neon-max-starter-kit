import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { authenticated } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
  const user = await authenticated();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Neon Max Next.js OSS Starter Kit
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A robust, open-source starter kit built with Next.js, powered by Neon
          Max, and designed for modern web applications.
        </p>

        {user ? (
          // If user is authenticated, display welcome message and logout button
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg font-medium text-gray-800">
              Welcome, {user.name || "User"}!
            </p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        ) : (
          // If user is not authenticated, display register and login buttons
          <div className="flex space-x-4 justify-center">
            <Button asChild variant="outline">
              <a href="/register">Register</a>
            </Button>
            <Button asChild>
              <a href="/login">Login</a>
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-center mb-8">
        <Image
          src="/images/neon-logo.svg"
          alt="Neon Logo"
          width={150}
          height={150}
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full text-center">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Feature-Rich
          </h2>
          <p className="text-gray-600">
            Packed with essential features and integrations, this starter kit
            provides a comprehensive foundation for your next project.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Powered by Neon Max
          </h2>
          <p className="text-gray-600">
            Leverage the power of Neon Max's advanced features and capabilities
            to build fast, scalable, and secure applications.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Modern Technologies
          </h2>
          <p className="text-gray-600">
            Built with Next.js, Tailwind CSS, and other modern technologies,
            this starter kit ensures a smooth development experience.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Open Source
          </h2>
          <p className="text-gray-600">
            Completely open-source and community-driven, the Neon Max Next.js
            OSS Starter Kit is perfect for both personal and commercial
            projects.
          </p>
        </div>
      </div>
    </main>
  );
}
