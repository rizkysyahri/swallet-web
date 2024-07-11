import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/store";
import { ILoginAuth, IProfile } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as React from "react";

const useLogin = () => {
  const [form, setForm] = React.useState<ILoginAuth>({
    email: "",
    password: "",
  });
  const [isDirty, setIsDirty] = React.useState(false);

  const router = useRouter();
  const login = useCounterStore((state) => state.login);

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (dto: ILoginAuth) => {
      const res = await axiosInstance.post("/auth/signin", dto);
      const token = res.data.accessToken;
      const user: IProfile = res.data;
      localStorage.setItem("token", token);
      login(user, token);
    },

    onSuccess: () => {
      return router.push("/dashboard");
    },
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!form.email && !form.password) {
        setIsDirty(false);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [form.email, form.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(form);
  };

  return {
    handleSubmit,
    handleChange,
    isPending,
    isError,
    isSuccess,
    isDirty,
  };
};

export default useLogin;
