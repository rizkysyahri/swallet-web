"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegister from "@/hooks/api/auth/useRegister";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SignUp = () => {
  const { handleChange, handleSubmit, isDirty } = useRegister();
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-sm w-full mx-auto p-4">
        <div className="flex flex-col mb-10">
          <div className="flex items-center justify-center">
            <Link href="/">
              <Image
                src="/swallet.png"
                alt="swallet"
                className=" w-40"
                width={500}
                height={500}
              />
            </Link>
          </div>
          <h1 className="mt-5 text-2xl font-semibold">Create 🫵 account</h1>
        </div>

        <form className="w-full" onClick={handleSubmit}>
          <div className="mt-10">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="Username"
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full"
            />
          </div>
          <div className="mt-5 rounded-md bg-black">
            <Button className="w-full" variant="neu" type="submit" disabled={!isDirty}>
              Create your account
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-10">
          Already have an account ?{" "}
          <Button
            variant="link"
            onClick={() => router.push("/login")}
            className="text-md font-bold"
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
