"use client";

import React, { useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { useCounterStore } from "@/stores/store";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { buttonVariants } from "./ui/button";
import NavbarUser from "./NavbarUser";
import useWallet from "@/hooks/api/wallet/useWallet";
import Image from "next/image";

const Navbar = () => {
  const user = useCounterStore((state) => state.user);
  const login = useCounterStore((state) => state.login);
  const { wallet } = useWallet();
  const pathname = usePathname();
  const router = useRouter();

  const checkToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axiosInstance.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data;

      login(user, token);
      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const isLoginPage = pathname === "/login";
  const isSignUpPage = pathname === "/signup";
  const isDashboradPage = pathname === "/dashboard";
  const isProfilPage = pathname === "/settings/account";

  if (isLoginPage || isSignUpPage) return null;

  return (
    <>
      <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between border-zinc-200 p-2">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Image src="/swallet.png" alt="swallet" className="w-20" />
                </Link>
              </>
            ) : (
              <>
                <div>
                  <Image src="/swallet.png" alt="swallet" className="w-20" />
                </div>
              </>
            )}

            {user && !isDashboradPage && !isProfilPage && (
              <div>
                <ul className="flex justify-center items-center gap-5">
                  <Link href={`/wallet/${wallet?.id}/transaction`}>
                    Transaction
                  </Link>
                  <Link href={`/wallet/${wallet?.id}/review`}>Review</Link>
                  <Link href={`/wallet/${wallet?.id}/wallet-setting`}>Wallet Settings</Link>
                </ul>
              </div>
            )}

            <div className="flex h-full items-center space-x-4">
              {user ? (
                <>
                  <NavbarUser />
                </>
              ) : (
                <>
                  <Link
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                    href="/login"
                  >
                    Login
                  </Link>
                  <div className="h-8 w-px bg-zinc-200 hidden md:block" />

                  <Link
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                    href="/signup"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </>
  );
};

export default Navbar;
