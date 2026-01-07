import { useEffect } from "react";
import { BrowserProvider, type Eip1193Provider } from "ethers";
import { useSetAtom } from "jotai";
import { useAccount, useWalletClient } from "wagmi";
import { walletAtom } from "@/stores";

const mapStatus = (status: ReturnType<typeof useAccount>["status"]) => {
  if (status === "connected") return "connected";
  if (status === "connecting" || status === "reconnecting") return "connecting";
  return "disconnected";
};

export const WalletStateSync = () => {
  const { address, chainId, status } = useAccount();
  const { data: walletClient } = useWalletClient();
  const setWallet = useSetAtom(walletAtom);

  useEffect(() => {
    let cancelled = false;
    const sync = async () => {
      if (walletClient && address) {
        try {
          const eip1193Provider: Eip1193Provider = {
            request: walletClient.transport.request,
          };
          const provider = new BrowserProvider(eip1193Provider, walletClient.chain?.id);
          const signer = await provider.getSigner();
          if (cancelled) return;
          setWallet({
            provider,
            signer,
            address,
            chainId:
              walletClient.chain?.id !== undefined
                ? String(walletClient.chain.id)
                : chainId !== undefined
                  ? String(chainId)
                  : undefined,
            status: "connected",
          });
          return;
        } catch (error) {
          console.warn("Failed to setup ethers signer", error);
        }
      }

      setWallet({
        provider: null,
        signer: null,
        address: address ?? undefined,
        chainId: chainId !== undefined ? String(chainId) : undefined,
        status: mapStatus(status),
      });
    };

    void sync();
    return () => {
      cancelled = true;
    };
  }, [address, chainId, status, walletClient, setWallet]);

  return null;
};
