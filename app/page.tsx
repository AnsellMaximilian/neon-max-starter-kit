import { auth, signOut } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { AUTH_URLS } from "@/config/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="flex justify-center mb-8">
        <Image
          src="/images/neon-max-logo-full.svg"
          alt="Neon Logo"
          width={220}
          height={150}
          priority
        />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Neon Max Next.js OSS Starter Kit
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A robust, open-source starter kit built with Next.js, powered by Neon,
          and designed for modern web applications.
        </p>

        {user ? (
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
          <div className="flex space-x-4 justify-center">
            <Link
              href={AUTH_URLS.REGISTER}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Register
            </Link>
            <Link href={AUTH_URLS.LOGIN} className={cn(buttonVariants({}))}>
              Login
            </Link>
          </div>
        )}
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
            Powered by Neon
          </h2>
          <p className="text-gray-600">
            Leverage the power of{" "}
            <Link
              href="https://neon.tech/"
              className="text-green-400 font-bold"
            >
              Neon
            </Link>
            &apos;s serverless Postgres database and its advanced features and
            capabilities to build fast, scalable, and secure applications.
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
