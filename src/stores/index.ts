import type { UserProfile } from "@/types/user";
import type { BrowserProvider, JsonRpcSigner } from "ethers";
import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

export type produceType = {
  id: number;
  name: string;
  tags: string[];
};

const produce = atom<produceType>({ id: 1, name: "jotai", tags: [] });
const produceWithImmer = atomWithImmer<produceType>({
  id: 1,
  name: "jotai",
  tags: [],
});

export type WalletStatus = "disconnected" | "connecting" | "connected";

export interface WalletState {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  address?: string;
  chainId?: string;
  status: WalletStatus;
}

export const walletAtom = atom<WalletState>({
  provider: null,
  signer: null,
  address: undefined,
  chainId: undefined,
  status: "disconnected",
});

export const userAtom = atom<UserProfile | null>(null);

export const purchasesAtom = atom<string[]>([]);

export { produce, produceWithImmer };
