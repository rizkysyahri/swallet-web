export type ILoginAuth = {
  email: string;
  password: string;
};

export type IRegisterAuth = {
  username: string;
  email: string;
  password: string;
};

export type IUser = {
  id: string;
  username: string;
  email: string;
  profile: IProfile;
  walletSetting: IWallet[];
  Expense: IExpense[];
};

export type IPostWallet = {
  walletName: string;
  beginning_balance: number;
};

export type SaveConfigWallet = {
  walletName?: string;
  beginning_balance?: number;
}

export type IWallet = {
  id: string;
  walletName: string;
  beginning_balance: number;
};

export type IWalletDetail = {
  id: string;
  walletName: string;
  beginning_balance: number;
  expense: IExpense[];
};

export type IExpense = {
  id: string;
  date: string;
  label: string;
  amount: number;
  category: ICategory;
};

export type ICategory = {
  id: string;
  name: string;
};

export type IProfile = {
  gender?: string;
  avatar?: string;
  user: IUser;
};

export type IPostTransaction = {
  walletId: string | string[];
  categoryId: string;
  label: string;
  amount: number;
};

export type IProfileUpdate = {
  username?: string | null;
  gender?: string | null;
  avatar?: File | null | string;
};

export type ITransactionUpdate = {
  id: string;
  categoryId?: string;
  label?: string;
  amount?: number;
};

export type ITransaction = {
  amount: number;
  label: string;
  categoryId: string;
};
