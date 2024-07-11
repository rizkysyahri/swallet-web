import axiosInstance from "@/lib/axios";
import { IRegisterAuth } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as React from "react";

const useRegister = () => {
  const [formRegister, setFormRegister] = React.useState<IRegisterAuth>({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [isDirty, setIsDirty] = React.useState(false);

  const { mutate } = useMutation({
    mutationFn: async (dto: IRegisterAuth) => {
      await axiosInstance.post("/auth/signup", dto);
    },
    onSuccess: () => {
      return router.push("/login");
    },
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        !formRegister.username &&
        !formRegister.email &&
        !formRegister.password
      ) {
        setIsDirty(false);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [formRegister.username, formRegister.email, formRegister.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });

    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formRegister);
  };

  return {
    handleChange,
    handleSubmit,
    isDirty,
  };
};

export default useRegister;
