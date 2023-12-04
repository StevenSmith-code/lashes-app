"use client";
import React from 'react';

import Link from 'next/link';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  UserButton,
  useUser,
} from '@clerk/nextjs';

export function Navbar() {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:w-auto flex items-center justify-between w-full">
          {!user ? (
            <Button size={"sm"} variant={"outline"} asChild>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-md mr-4 text-neutral-400 text-center">
                Welcome back {user?.firstName}!
              </p>
              <UserButton />
            </div>
          )}
          <Button size={"sm"} asChild>
            <Link href={"/sign-up"}>Make an appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
