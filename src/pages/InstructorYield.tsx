import { useEffect, useState, useCallback } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useContracts } from "@/hooks/useContracts";
import { useCourseActions } from "@/hooks/useCourseActions";
import { formatUnits, parseUnits } from "ethers";

export const InstructorYieldPage = () => {
  const { wallet, connect } = useWallet();
  const { courseMarket, yieldVault } = useContracts();
  const { stakeRevenue, withdrawFromVault } = useCourseActions();
  const [authorBalance, setAuthorBalance] = useState<bigint>(0n);
  const [stakedBalance, setStakedBalance] = useState<bigint>(0n);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const refreshBalances = useCallback(async () => {
    if (!wallet.address || !courseMarket || !yieldVault) return;
    const onChainAuthorBalance = await courseMarket.authorBalances(wallet.address);
    const onChainStaked = await yieldVault.stakedBalance(wallet.address);
    setAuthorBalance(onChainAuthorBalance);
    setStakedBalance(onChainStaked);
  }, [courseMarket, wallet.address, yieldVault]);

  useEffect(() => {
    refreshBalances();
  }, [refreshBalances]);

  const handleStake = async () => {
    if (!wallet.address) {
      await connect();
    }
    try {
      const amountWei = parseUnits(amount || "0", 18).toString();
      await stakeRevenue(amountWei);
      setMessage("质押成功");
      setAmount("");
      await refreshBalances();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "质押失败");
    }
  };

  const handleWithdraw = async () => {
    try {
      const amountWei = parseUnits(amount || "0", 18).toString();
      await withdrawFromVault(amountWei);
      setMessage("赎回成功");
      setAmount("");
      await refreshBalances();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "赎回失败");
    }
  };

  return (
    <section className="space-y-6">
      <div className="glass-panel p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Yield Control</p>
        <h1 className="text-3xl font-semibold">收益管理</h1>
        <p className="text-sm text-muted">作者收入可以质押进 Aave 或即时赎回到钱包。</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">可提取收入</p>
          <p className="mt-3 text-4xl font-semibold">{formatUnits(authorBalance, 18)} YDT</p>
        </div>
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">已质押收益</p>
          <p className="mt-3 text-4xl font-semibold">{formatUnits(stakedBalance, 18)} YDT</p>
        </div>
      </div>
      <div className="glass-panel space-y-4 p-6">
        <p className="text-sm text-muted">操作金额（YDT）</p>
        <input
          className="simple-input"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="50"
          type="number"
          min="0"
        />
        <div className="flex flex-wrap gap-3">
          <button type="button" className="plain-button" disabled={!amount} onClick={() => void handleStake()}>
            质押到 Aave
          </button>
          <button type="button" className="ghost-btn px-6 py-2" disabled={!amount} onClick={() => void handleWithdraw()}>
            赎回收益
          </button>
        </div>
        {message && <p className="text-sm text-emerald-400">{message}</p>}
      </div>
    </section>
  );
};

export default InstructorYieldPage;
