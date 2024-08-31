import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        </header>
        {children}
      </>
    </SessionProvider>
  );
}
