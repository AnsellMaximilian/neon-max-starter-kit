import { auth, signOut } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { AUTH_URLS } from "@/config/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

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
          Neon Max Next.js Starter Kit
        </h1>
        <p className="text-lg  mb-6">
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
        <div className="bg-black text-white shadow-xl shadow-[#20FFE7]/50 rounded-lg p-6">
          <h2 className={cn(" text-2xl font-semibold mb-2", styles.neonGlow)}>
            Feature-Rich
          </h2>
          <p className="">
            Packed with essential features and integrations, this starter kit
            provides a comprehensive foundation for your next project.
          </p>
        </div>
        <div className="bg-black text-white shadow-xl shadow-[#20FFE7]/50 rounded-lg p-6">
          <h2 className={cn(" text-2xl font-semibold mb-2", styles.neonGlow)}>
            Powered by Neon
          </h2>
          <p className="">
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
        <div className="bg-black text-white shadow-xl shadow-[#20FFE7]/50 rounded-lg p-6">
          <h2 className={cn(" text-2xl font-semibold mb-2", styles.neonGlow)}>
            Modern Technologies
          </h2>
          <p className="">
            Built with Next.js, Tailwind CSS, and other modern technologies,
            this starter kit ensures a smooth development experience.
          </p>
        </div>
        <div className="bg-black text-white shadow-xl shadow-[#20FFE7]/50 rounded-lg p-6">
          <h2 className={cn(" text-2xl font-semibold mb-2", styles.neonGlow)}>
            Open Source
          </h2>
          <p className="">
            Completely open-source and community-driven, the Neon Max Next.js
            Starter Kit is perfect for both personal and commercial projects.
          </p>
        </div>
      </div>

      <section className="mt-16 text-center max-w-4xl w-full">
        <h2 className=" text-3xl font-bold mb-4">Working Blog Example</h2>
        <p className="text-lg tracking-wide">
          Neon Max comes equipped with a working blog example complete with CRUD
          actions, authorization, etc. Check out the code under{" "}
          <code>app/examples/blog</code> to learn how the included libraries and
          tools are used as well as Neon Max&apos;s own functionalities like{" "}
          <strong>Auth</strong> and <strong>Authorization</strong> helpers..
        </p>
        <Link href="/examples/blog" className={cn(buttonVariants(), "mt-6")}>
          Go to Blogs
        </Link>
      </section>
    </main>
  );
}
