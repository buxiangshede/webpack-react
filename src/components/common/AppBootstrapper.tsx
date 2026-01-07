import type { PropsWithChildren } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Loading } from "@/components/common/Loading";

export const AppBootstrapper = ({ children }: PropsWithChildren) => {
  const { loading, error } = useUserProfile();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-sm text-red-500">{error}</p>
        {children}
      </div>
    );
  }

  return <>{children}</>;
};
