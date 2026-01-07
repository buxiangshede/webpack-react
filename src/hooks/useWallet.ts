import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { walletAtom } from "@/stores";

export const useWallet = () => {
  const wallet = useAtomValue(walletAtom);
  const { disconnectAsync } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const connect = useCallback(async () => {
    if (!openConnectModal) {
      throw new Error("连接组件尚未初始化，请稍后重试");
    }
    openConnectModal();
  }, [openConnectModal]);

  const disconnect = useCallback(async () => {
    await disconnectAsync();
  }, [disconnectAsync]);

  return { wallet, connect, disconnect };
};
