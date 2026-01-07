import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { formatUnits } from "ethers";
import { useUserContext } from "@/contexts/UserContext";
import { useCourses } from "@/hooks/useCourses";
import { useWallet } from "@/hooks/useWallet";
import { useContracts } from "@/hooks/useContracts";
import { api } from "@/utils/api";

export const MePage = () => {
  const { user } = useUserContext();
  const { courses } = useCourses();
  const { wallet, connect } = useWallet();
  const { ydToken } = useContracts();
  const [ydBalance, setYdBalance] = useState<string>("0.0000");
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("100");
  const [topUpStatus, setTopUpStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [topUpMessage, setTopUpMessage] = useState<string | null>(null);

  const purchasedIds = user?.purchasedCourseIds ?? [];
  const purchasedCourses = useMemo(() => courses.filter((course) => purchasedIds.includes(course.id)), [courses, purchasedIds]);

  const refreshYdBalance = useCallback(async () => {
    if (!wallet.address || !ydToken) {
      setYdBalance("0.0000");
      return;
    }
    setBalanceLoading(true);
    try {
      const raw = await ydToken.balanceOf(wallet.address);
      setYdBalance(Number.parseFloat(formatUnits(raw, 18)).toFixed(4));
    } catch (error) {
      console.warn("读取 YDT 余额失败", error);
      setYdBalance("--");
    } finally {
      setBalanceLoading(false);
    }
  }, [wallet.address, ydToken]);

  useEffect(() => {
    void refreshYdBalance();
  }, [refreshYdBalance]);

  const handleTopUp = useCallback(async () => {
    setTopUpMessage(null);
    if (!wallet.address) {
      await connect();
      setTopUpMessage("请先完成钱包连接后再次点击。");
      return;
    }
    const amountValue = Number(topUpAmount);
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      setTopUpStatus("error");
      setTopUpMessage("请输入正确的充值数量。");
      return;
    }
    setTopUpStatus("pending");
    try {
      await api.requestYdTopUp(wallet.address, amountValue);
      setTopUpStatus("success");
      setTopUpMessage(`已提交 ${amountValue} YDT 的购买请求，等待区块确认。`);
      await refreshYdBalance();
    } catch (error) {
      setTopUpStatus("error");
      setTopUpMessage(error instanceof Error ? error.message : "购买失败，请稍后再试。");
    } finally {
      setTimeout(() => setTopUpStatus("idle"), 1200);
    }
  }, [wallet.address, connect, topUpAmount, refreshYdBalance]);

  const renderBalanceLabel = balanceLoading ? "同步中..." : `${ydBalance} YDT`;

  if (!user) {
    return <p className="text-sm text-muted">请先同步个人资料。</p>;
  }

  const initials = (user.nickname?.slice(0, 1) ?? "?").toUpperCase();

  return (
    <section className="space-y-8">
      <div className="glass-panel flex flex-wrap items-center gap-4 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl font-semibold">
          {initials}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{user.nickname}</h1>
          <p className="text-sm text-muted">{user.bio}</p>
          <div className="mt-2 text-xs text-muted">
            钱包：{user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
          </div>
          <div className="mt-2 text-sm text-cyan-200">YDT 余额：{renderBalanceLabel}</div>
        </div>
        <Link className="plain-button" to="/courses">
          继续学习
        </Link>
      </div>

      <div className="glass-panel space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">充值 YDT</h2>
            <p className="text-xs text-muted">合约自动铸造 YDT，请保持钱包连接以完成充值。</p>
          </div>
          <button
            type="button"
            className="text-xs text-cyan-200 hover:text-white"
            onClick={() => void refreshYdBalance()}
            disabled={balanceLoading}
          >
            {balanceLoading ? "同步中..." : "刷新余额"}
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <label className="text-xs uppercase tracking-[0.3em] text-muted" htmlFor="topUpAmount">充值数量（YDT）</label>
          <div className="mt-2 flex flex-wrap gap-3">
            <input
              type="number"
              min="1"
              className="simple-input md:w-48"
              value={topUpAmount}
              onChange={(event) => setTopUpAmount(event.target.value)}
            />
            <button
              type="button"
              className="plain-button"
              onClick={() => void handleTopUp()}
              disabled={topUpStatus === "pending"}
            >
              {topUpStatus === "pending" ? "提交中..." : "购买 / 领取"}
            </button>
          </div>
          {topUpMessage && (
            <p className={`mt-2 text-xs ${topUpStatus === "error" ? "text-red-400" : "text-emerald-400"}`}>
              {topUpMessage}
            </p>
          )}
          {!wallet.address && (
            <p className="mt-2 text-xs text-amber-300">当前未连接钱包，点击按钮后会弹出连接请求。</p>
          )}
        </div>
      </div>

      <div className="glass-panel space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">已购课程</h2>
          <span className="chip">共 {purchasedCourses.length} 门</span>
        </div>
        {purchasedCourses.length === 0 ? (
          <p className="text-sm text-muted">还没有已购课程，去逛逛吧。</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {purchasedCourses.map((course) => (
              <article key={course.id} className="course-card">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">{course.level}</p>
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-muted">{course.shortDescription}</p>
                <Link className="ghost-btn px-4 py-2 text-center" to={`/learn/${course.id}`}>
                  打开学习页
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MePage;
