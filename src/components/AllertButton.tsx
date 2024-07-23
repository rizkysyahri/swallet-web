import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MessageSquareWarning } from "lucide-react";
import Link from "next/link";

interface AllertButtonProps {}

const AllertButton: FC<AllertButtonProps> = ({}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="fixed w-[50px] h-[50px] bottom-[20px] right-[20px] z-[99999] cursor-pointer bg-[#D6EFD8] flex items-center justify-center rounded-full">
        {" "}
        <MessageSquareWarning className="w-5 h-5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hi User</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col">
            This application is still under development. If you encounter any
            bugs or have suggestions for this project, please discuss them on
            this GitHub page. Thank you!
            <Link href="https://github.com/rizkysyahri/swallet-web" className="mt-5 underline text-blue-500" target="_blank">
              See more detail on my github
            </Link>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AllertButton;
