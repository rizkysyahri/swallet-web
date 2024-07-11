import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCounterStore } from "@/stores/store";
import { useRouter } from "next/navigation";
import { LogOut, Settings2 } from "lucide-react";
import Link from "next/link";

const NavbarUser = () => {
  const logout = useCounterStore((state) => state.logout);
  const profile = useCounterStore((state) => state.user);
  const router = useRouter();

  const getInitial = (username: any) => {
    if (!username) return "";
    return username.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {getInitial(profile?.user?.username)}
              </AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <Link href="/settings/account">
              <MenubarItem>
                Settings
                <MenubarShortcut>
                  <Settings2 className="w-4 h-4" />
                </MenubarShortcut>
              </MenubarItem>
            </Link>
            <MenubarSeparator />
            <MenubarItem onClick={handleLogout}>
              Logout{" "}
              <MenubarShortcut>
                <LogOut className="w-4 h-4" />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default NavbarUser;
