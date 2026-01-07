import { useCallback, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useUserContext } from "@/contexts/UserContext";
import { useWallet } from "@/hooks/useWallet";
import type { UserProfile } from "@/types/user";

const DEMO_USER: UserProfile = {
  id: "demo-user",
  nickname: "Neo Learner",
  avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=240",
  bio: "链上学习者 · 喜欢 Solidity、DeFi 以及一切新东西。",
  walletAddress: "0xDemoWallet00000000000000000000000000",
  purchasedCourseIds: ["solidity-101"],
  authoredCourseIds: [],
};

export const useUserProfile = () => {
  const { user, setUser } = useUserContext();
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!wallet?.address) {
        setUser((prev) => prev ?? DEMO_USER);
        return;
      }
      console.log("Fetched profile-in", wallet.address);
      const profile = await api.getUserProfile(wallet.address);
      console.log("Fetched profile:", profile);
      setUser(profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [wallet?.address, setUser]);

  useEffect(() => {
    if (!wallet?.address) {
      setUser((prev) => prev ?? DEMO_USER);
      setLoading(false);
      return;
    }
    if (!user || user.walletAddress.toLowerCase() !== wallet.address.toLowerCase()) {
      void fetchProfile();
    }
  }, [user, wallet?.address, fetchProfile, setUser]);

  return { user, loading, error, refresh: fetchProfile };
};
