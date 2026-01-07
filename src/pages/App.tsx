/*
 * @Author: shasha0102 970284297@qq.com
 * @Date: 2025-12-04 21:31:21
 * @LastEditors: shasha0102 970284297@qq.com
 * @LastEditTime: 2025-12-04 21:40:55
 * @FilePath: /handler-spa/react-webpack/src/pages/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { UserProvider } from "@/contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { AppBootstrapper } from "@/components/common/AppBootstrapper";
import { WalletSessionGuard } from "@/components/common/WalletSessionGuard";
import { WalletStateSync } from "@/components/common/WalletStateSync";
import { AppRouter } from "../routes";
import { chains, wagmiConfig } from "@/config/web3";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <UserProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider chains={chains} modalSize="compact">
            <WalletSessionGuard>
              <WalletStateSync />
              <AppBootstrapper>
                <AppRouter />
              </AppBootstrapper>
            </WalletSessionGuard>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </UserProvider>
  );
};
