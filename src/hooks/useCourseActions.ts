import { useCallback, useState } from "react";
import { useAtomValue } from "jotai";
import { formatUnits, parseUnits } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useContracts } from "@/hooks/useContracts";
import { walletAtom } from "@/stores";

const isErrorWithCode = (value: unknown): value is { code: string } =>
  typeof value === "object" &&
  value !== null &&
  "code" in value &&
  typeof (value as { code: unknown }).code === "string";

export const useCourseActions = () => {
  const { courseMarket, ydToken, yieldVault, addresses } = useContracts();
  const wallet = useAtomValue(walletAtom);
  const { openConnectModal } = useConnectModal();
  const [txStatus, setTxStatus] = useState<string>("idle");

  const ensureSigner = useCallback(() => {
    if (!wallet.signer || !wallet.address) {
      openConnectModal?.();
      throw new Error("请先连接钱包");
    }
  }, [openConnectModal, wallet.address, wallet.signer]);

  const formatTokenAmount = useCallback(
    (value: bigint, decimals = 18) => formatUnits(value, decimals),
    []
  );

  const approve = useCallback(
    async (amount: string | number) => {
      ensureSigner();
      if (!ydToken) throw new Error("token 合约未准备好");
      setTxStatus("approving");
      try {
        let allowance: bigint;
        try {
          console.log(`当前 YDT 授权--1 `, wallet.address, addresses.courseMarket);
          allowance = await ydToken.allowance(wallet.address, addresses.courseMarket);
          console.log(`当前 YDT 授权: ${formatTokenAmount(allowance)}`);
        } catch (error) {
          console.error("读取 YDT 授权失败", error);
          throw new Error("无法读取 YDT 授权，请确认合约地址正确并已充值后重试。");
        }
        const amountWei =
          typeof amount === "string"
            ? BigInt(amount)
            : parseUnits(amount.toString(), 18);
        const balance = await ydToken.balanceOf(wallet.address);
        if (balance < amountWei) {
          throw new Error("可用 YDT 余额不足，请先充值后再尝试购买课程。");
        }
        if (allowance >= amountWei) {
          return allowance;
        }
        const tx = await ydToken.approve(addresses.courseMarket, amountWei);
        await tx.wait();
        return amountWei;
      } catch (error) {
        if (error instanceof Error && isErrorWithCode(error) && error.code === "BAD_DATA") {
          throw new Error("无法与 YDT 合约交互，可能余额不足或未部署，请在 CourseMarket 中充值 YDT。");
        }
        throw error;
      } finally {
        setTxStatus("idle");
      }
    },
    [
      addresses.courseMarket,
      ensureSigner,
      formatTokenAmount,
      wallet.address,
      ydToken
    ],
  );

  const purchaseCourse = useCallback(
    async (courseId: number) => {
      ensureSigner();
      if (!courseMarket) throw new Error("课程市场合约未准备好");
      setTxStatus("purchasing");
      try {
        const tx = await courseMarket.purchaseCourse(courseId);
        await tx.wait();
      } finally {
        setTxStatus("idle");
      }
    },
    [courseMarket, ensureSigner],
  );

  const stakeRevenue = useCallback(
    async (amountWei: string) => {
      ensureSigner();
      if (!courseMarket) throw new Error("课程市场合约未准备好");
      setTxStatus("staking");
      try {
        const tx = await courseMarket.stakeRevenue(amountWei);
        await tx.wait();
      } finally {
        setTxStatus("idle");
      }
    },
    [courseMarket, ensureSigner],
  );

  const withdrawFromVault = useCallback(
    async (amount: string) => {
      ensureSigner();
      if (!yieldVault) throw new Error("收益金库未准备好");
      setTxStatus("withdrawing");
      try {
        const tx = await yieldVault.withdraw(amount);
        return await tx.wait();
      } finally {
        setTxStatus("idle");
      }
    },
    [ensureSigner, yieldVault],
  );

  return {
    txStatus,
    approve,
    purchaseCourse,
    stakeRevenue,
    withdrawFromVault,
    formatTokenAmount,
  };
};
