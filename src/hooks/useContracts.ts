import { useMemo } from "react";
import { Contract } from "ethers";
import { useAtomValue } from "jotai";
import { walletAtom } from "@/stores";
import { courseMarketAbi, ydTokenAbi, yieldVaultAbi } from "@/abis";
import { getContractAddresses } from "@/config/contracts";

export const useContracts = () => {
  const wallet = useAtomValue(walletAtom);

  return useMemo(() => {
    const addresses = getContractAddresses(wallet.chainId);

    if (!wallet.signer) {
      return { courseMarket: null, ydToken: null, yieldVault: null, addresses };
    }

    const courseMarket = new Contract(addresses.courseMarket, courseMarketAbi, wallet.signer);
    const ydToken = new Contract(addresses.ydToken, ydTokenAbi, wallet.signer);
    const yieldVault = new Contract(addresses.yieldVault, yieldVaultAbi, wallet.signer);

    return { courseMarket, ydToken, yieldVault, addresses };
  }, [wallet.chainId, wallet.signer]);
};
