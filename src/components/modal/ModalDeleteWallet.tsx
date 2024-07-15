import { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface ModalDeleteWalletProps {
  onClick: () => void;
}

const ModalDeleteWallet: FC<ModalDeleteWalletProps> = ({
  onClick,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" className="text-red-500">
          Hapus dompet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center text-center">
            <div className="bg-rose-100 rounded-2xl px-2 py-2">
              <Trash2 className="h-14 w-14" />
            </div>
            <p className="mt-4">
              Anda benar-benar yakin ingin menghapus dompet ini?
            </p>
          </DialogTitle>
          <DialogDescription className="flex items-center justify-center gap-3 pt-4">
            <DialogClose>
              <Button variant="secondary">Batal</Button>
            </DialogClose>
            <Button onClick={onClick} variant="destructive">
              Hapus
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeleteWallet;
