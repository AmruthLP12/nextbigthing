import { auth, signOut, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="NextBigThing Logo"
            width={140}
            height={30}
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              {/* Create Idea */}
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              {/* Logout */}
              <form action={async () => {
                'use server'
                await signOut({ redirectTo: '/' });
              }}>
                <button type='submit'>Logout</button>
              </form>

              {/* User Profile */}
              <Link href={`/user/${session?.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            // Login
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
