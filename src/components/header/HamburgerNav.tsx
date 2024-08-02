import { FC } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Text } from "lucide-react";
import useWallet from "@/hooks/api/wallet/useWallet";
import Link from "next/link";

interface HamburgerNavProps {
  onclick: () => void;
}

const HamburgerNav: FC<HamburgerNavProps> = ({ onclick }) => {
  const { wallet } = useWallet();

  return (
    <Sheet>
      <SheetTrigger onClick={onclick}>
        <Text />
      </SheetTrigger>
      <SheetContent className="w-full mt-14" side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            <ul className="mt-4 space-y-2">
              <SheetClose>
                <li>
                  <Link
                    href={`/wallet/${wallet?.id}/transaction`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Transaction
                  </Link>
                </li>
              </SheetClose>

              <li>
                <Link
                  href={`/wallet/${wallet?.id}/review`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Review
                </Link>
              </li>
              <li>
                <Link
                  href={`/wallet/${wallet?.id}/wallet-setting`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Wallet Settings
                </Link>
              </li>
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerNav;
