import { auth, signOut } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { AUTH_URLS } from "@/config/auth";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = (await auth())?.user;
  return (
    <SessionProvider>
      <>
        <header className="max-w-4xl mx-auto p-6 flex items-center gap-8">
          <Image
            src="/images/neon-max-logo.svg"
            width={40}
            height={40}
            alt="logo"
          />
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="font-semibold hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/examples/blog"
                className="font-semibold hover:underline"
              >
                Blog List
              </Link>
            </li>
          </ul>
          <div className="ml-auto flex gap-2">
            {user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit" variant="outline">
                  Sign Out
                </Button>
              </form>
            ) : (
              <>
                <Link
                  href={AUTH_URLS.REGISTER}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Register
                </Link>
                <Link
                  href={AUTH_URLS.LOGIN}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </header>
        {children}
      </>
    </SessionProvider>
  );
}
