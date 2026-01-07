export const getEnv = (key: string, fallback: string) => {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  return fallback;
};

export type NetworkKey = "hardhat" | "sepolia";

export interface ContractAddresses {
  ydToken: string;
  courseMarket: string;
  yieldVault: string;
}

export interface NetworkConfig {
  key: NetworkKey;
  name: string;
  chainId: string;
  rpcUrl: string;
  explorer?: string;
  contracts: ContractAddresses;
}

const hardhatChainId = getEnv("VITE_HARDHAT_CHAIN_ID", "31337");
const sepoliaChainId = getEnv("VITE_SEPOLIA_CHAIN_ID", "11155111");
const contractsAddress: Record<string, ContractAddresses> = {
  31337: {
    ydToken: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    courseMarket: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    yieldVault: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  },
  11155111: {
    ydToken: '',
    courseMarket: '',
    yieldVault: '',
  }
}

export const NETWORKS: Record<NetworkKey, NetworkConfig> = {
  hardhat: {
    key: "hardhat",
    name: "Hardhat Localhost",
    chainId: hardhatChainId,
    rpcUrl: getEnv("VITE_HARDHAT_RPC_URL", "http://127.0.0.1:8545"),
    explorer: getEnv("VITE_HARDHAT_EXPLORER", "http://127.0.0.1:8545"),
    contracts: contractsAddress[hardhatChainId],
  },
  sepolia: {
    key: "sepolia",
    name: "Sepolia Testnet",
    chainId: sepoliaChainId,
    rpcUrl: getEnv("VITE_SEPOLIA_RPC_URL", "https://sepolia.infura.io/v3/YOUR_KEY"),
    explorer: "https://sepolia.etherscan.io",
    contracts: contractsAddress[sepoliaChainId],
  },
};

export const SUPPORTED_NETWORKS = Object.values(NETWORKS);
export const SUPPORTED_CHAIN_IDS = SUPPORTED_NETWORKS.map((network) => network.chainId);

export const getNetworkByChainId = (chainId?: string) => {
  if (!chainId) return NETWORKS.hardhat;
  return SUPPORTED_NETWORKS.find((network) => network.chainId === chainId) ?? NETWORKS.hardhat;
};

export const getContractAddresses = (chainId?: string) => getNetworkByChainId(chainId).contracts;

export const getSupportedNetworkLabel = () =>
  SUPPORTED_NETWORKS.map((network) => `${network.name} (${network.chainId})`).join(" / ");
