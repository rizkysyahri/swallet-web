import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/zustand/store";
import { IProfileUpdate } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";

const useEditProfile = () => {
  const token = useCounterStore((state) => state.token);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [formProfile, setFormProfile] = React.useState<{
    gender?: string;
    avatar?: File | null | string;
    username?: string;
    email?: string;
  }>({
    gender: "",
    avatar: null,
    username: "",
  });

  const [isDirty, setIsDirty] = React.useState(false);

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
  });

  React.useEffect(() => {
    if (data) {
      setFormProfile({
        gender: data.gender || "",
        avatar: data.avatar || null,
        username: data.user.username || "",
      });
    }
  }, [data]);

  const { mutate: saveProfileUpdate } = useMutation({
    mutationFn: async (credentials: Omit<IProfileUpdate, "email">) => {
      const formData = new FormData();

      (
        Object.keys(credentials) as Array<keyof Omit<IProfileUpdate, "email">>
      ).forEach((key) => {
        if (credentials[key] !== null && credentials[key] !== undefined) {
          formData.append(key, credentials[key] as Blob);
        }
      });

      await axiosInstance.put("/profile", credentials, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Profile was update successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormProfile({
      ...formProfile,
      [e.target.name]: e.target.value,
    });
    setIsDirty(true);
  };

  const handleSelectGender = (name: string, value: string) => {
    setFormProfile({
      ...formProfile,
      [name]: value,
    });
    setIsDirty(true);
  };

  return {
    handleChange,
    handleSelectGender,
    isDirty,
    setIsDirty,
    formProfile,
    saveProfileUpdate,
  };
};

export default useEditProfile;
