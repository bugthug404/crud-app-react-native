import { atom } from "jotai";
import { UserAuthModel, UserModel } from "./user-model";

export const userDataAtom = atom<UserModel | null>(null);

export const userAuthTokenAtom = atom<string | null>(null);

export const loaderOpenState = atom<boolean>(false);
