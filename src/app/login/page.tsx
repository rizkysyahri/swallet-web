"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLogin from "@/hooks/api/auth/useLogin";
import Image from "next/image";

const Login = () => {
  const { handleSubmit, handleChange, isPending, isError, isSuccess, isDirty } =
    useLogin();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-sm w-full mx-auto p-4">
        <div className="flex flex-col mb-10">
          <div className="flex items-center justify-center">
            <Link href="/">
              <Image src="/swallet.png" alt="swallet" className="w-40" />
            </Link>
          </div>
          <h1 className="mt-5 text-2xl">Hi You 🫵, Welcome!</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mt-10">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <Button className="mt-5 w-full" type="submit" disabled={!isDirty}>
            {isPending ? "Logging in ..." : "Login"}
          </Button>
          {isError && <p className="text-red-500 mt-2">Login Failed</p>}
          {isSuccess && (
            <p className="text-green-500 mt-2">Login Successfully</p>
          )}
        </form>
        <div className="flex items-center justify-center mt-10">
          No Account
          <Button
            onClick={() => router.push("/signup")}
            variant="link"
            className="text-md font-bold"
          >
            Create one
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
