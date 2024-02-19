import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  let right = null;

  if (status === "loading") {
    right = (
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
          type="button"
          className="iinline-flex items-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          Favorites
        </button>
        {/* <Link href="/api/auth/signin">
          <a
            data-active={isActive("/signup")}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log in
          </a>
        </Link> */}
      </div>
    );
  }

  if (session) {
    right = (
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Favorites
        </button>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    );
  }

  return (
    <nav className="p-6">
      <div className="md:flex md:items-center md:justify-between">
        <a href="/" className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dogpatch Apartment communities
          </h2>
        </a>
        {right}
      </div>
    </nav>
  );
};

export default Header;
