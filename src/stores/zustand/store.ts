import { IProfile } from "@/types/types";
import { create } from "zustand";

type CounterStore = {
  user: IProfile | null | undefined;
  token: string;
  login: (user: IProfile, token: string) => void;
  logout: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  user: undefined,
  token: "",
  login: (user, token) => {
    set({ user, token });
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ user: undefined, token: "" });
    localStorage.removeItem("token");
  },
}));
