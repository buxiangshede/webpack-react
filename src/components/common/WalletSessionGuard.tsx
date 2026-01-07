import { type PropsWithChildren, useEffect, useRef } from "react";
import { useAccount, useDisconnect } from "wagmi";

/**
 * 开发阶段每次刷新都断开钱包，确保 ConnectButton 必须手动点击。
 * 仅在首次渲染执行一次，避免影响后续正常连接/断开行为。
 */
export const WalletSessionGuard = ({ children }: PropsWithChildren) => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const hasReset = useRef(false);

  useEffect(() => {
    if (hasReset.current) return;
    hasReset.current = true;
    if (isConnected) {
      disconnect().catch(() => undefined);
    }
  }, [isConnected, disconnect]);

  return <>{children}</>;
};
