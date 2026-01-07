import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http, noopStorage } from "wagmi";
import { sepolia } from "wagmi/chains";
import { defineChain } from "viem";


const hardhatLocal = defineChain({
  id: 31337,
  name: 'Hardhat Local',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
  },
});

export const chains = [hardhatLocal, sepolia] as const;
export const wagmiConfig = getDefaultConfig({
  appName: "Web-university",
  projectId: "83ab48988bbb1000c763665a8025696a",
  chains,
  transports: {
    [hardhatLocal.id]: http(),
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/..."),
  },
  autoConnect: false,
  storage: noopStorage,
  enableTelemetry: false,
});
