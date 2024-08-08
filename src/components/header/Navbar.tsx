"use client";

import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { useCounterStore } from "@/stores/zustand/store";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { buttonVariants } from "../ui/button";
import NavbarUser from "./NavbarUser";
import useWallet from "@/hooks/api/wallet/useWallet";
import Image from "next/image";
import HamburgerNav from "./HamburgerNav";

const Navbar = () => {
  const user = useCounterStore((state) => state.user);
  const login = useCounterStore((state) => state.login);
  const [open, setOpen] = useState(false);
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

  const sheetMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b-2 border-black bg-white/75 backdrop-blur-lg transition-all ">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between border-zinc-200 p-2">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Image
                    src="/swallet.png"
                    alt="swallet"
                    width={80}
                    height={80}
                  />
                </Link>
              </>
            ) : (
              <>
                <div>
                  <Image
                    src="/swallet.png"
                    alt="swallet"
                    width={80}
                    height={80}
                  />
                </div>
              </>
            )}

            {user && !isDashboradPage && !isProfilPage && (
              <>
                <div className="block md:hidden">
                  <HamburgerNav onclick={sheetMenu} />
                </div>
                <div className="md:block hidden">
                  <ul className="flex justify-center items-center gap-5">
                    <Link href={`/wallet/${wallet?.id}/transaction`}>
                      Transaction
                    </Link>
                    <Link href={`/wallet/${wallet?.id}/review`}>Review</Link>
                    <Link href={`/wallet/${wallet?.id}/wallet-setting`}>
                      Wallet Settings
                    </Link>
                  </ul>
                </div>
              </>
            )}

            <div className="flex h-full items-center space-x-4">
              {user ? (
                <>
                  <NavbarUser />
                </>
              ) : (
                <>
                  <Link className="rounded-md bg-black" href="/login">
                    <span className="flex items-center -translate-x-1 -translate-y-1 rounded-md border-2 border-black bg-white h-8 px-4 py-2 active:translate-x-0 active:translate-y-0 transition-all duration-200">
                      Login
                    </span>
                  </Link>
                  <div className="h-8 w-px bg-zinc-200 hidden md:block" />

                  <Link className="rounded-md bg-black" href="/signup">
                    <span className="flex items-center -translate-x-1 -translate-y-1 rounded-md border-2 border-black bg-white h-8 px-4 py-2 active:translate-x-0 active:translate-y-0 transition-all duration-200">
                      Sign up
                    </span>
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
