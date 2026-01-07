import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { formatEther } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWallet } from "@/hooks/useWallet";

const navItems = [
  { to: "/", label: "首页", end: true },
  { to: "/courses", label: "课程" },
  { to: "/courses/new", label: "创建课程" },
  { to: "/instructor/yield", label: "收益" },
  { to: "/me", label: "我的" },
];

export const Header = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "text-xs uppercase tracking-[0.15em] transition-colors",
      isActive ? "text-cyan-200" : "text-slate-200/70 hover:text-white",
    ].join(" ");

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#040c1a]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-lg font-semibold tracking-[0.25em] text-white">
          YD HANDLER
        </NavLink>
        <div className="hidden gap-6 lg:flex">
          {navItems.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </div>
        <WalletControls />
      </div>
    </header>
  );
};

const WalletControls = () => {
  const { wallet } = useWallet();
  const [balanceLabel, setBalanceLabel] = useState("--");

  useEffect(() => {
    if (!wallet.address || !wallet.provider) {
      setBalanceLabel("--");
      return;
    }

    let cancelled = false;
    const refreshBalance = async () => {
      try {
        const raw = await wallet.provider?.getBalance(wallet.address);
        if (cancelled) return;
        const parsed = Number.parseFloat(formatEther(raw));
        setBalanceLabel(Number.isFinite(parsed) ? parsed.toFixed(4) : "0.0000");
      } catch (error) {
        if (!cancelled) {
          console.warn("获取钱包余额失败", error);
          setBalanceLabel("--");
        }
      }
    };

    void refreshBalance();
    const interval = setInterval(refreshBalance, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [wallet.address, wallet.provider]);

  const balanceDisplay = useMemo(() => {
    if (!wallet.address || balanceLabel === "--") {
      return "余额同步中...";
    }
    return `${balanceLabel} ETH`;
  }, [wallet.address, balanceLabel]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openAccountModal, openChainModal, openConnectModal }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {connected ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={openChainModal}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/90 transition hover:border-cyan-300 hover:text-white"
                >
                  {chain.unsupported ? "切换网络" : chain.name}
                </button>
                <button
                  type="button"
                  onClick={openAccountModal}
                  className="flex items-center gap-3 rounded-full border border-white/15 bg-gradient-to-r from-white/10 to-white/5 px-4 py-2 text-sm text-white shadow-lg shadow-cyan-500/10 transition hover:border-cyan-300"
                >
                  <span className="text-xs font-semibold text-white/70">{balanceDisplay}</span>
                  <span className="font-semibold text-white">{account.displayName}</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/90 transition hover:border-cyan-300 hover:text-white"
                onClick={openConnectModal}
              >
                连接钱包
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
