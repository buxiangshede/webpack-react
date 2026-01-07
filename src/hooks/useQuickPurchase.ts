import { useState } from "react";
import type { Course } from "@/types/course";
import { useWallet } from "@/hooks/useWallet";
import { useCourseActions } from "@/hooks/useCourseActions";
import { useUserContext } from "@/contexts/UserContext";

export const useQuickPurchase = () => {
  const { wallet, connect } = useWallet();
  const { approve, purchaseCourse, txStatus } = useCourseActions();
  const { user, setUser } = useUserContext();
  const [feedback, setFeedback] = useState<Record<string, string | null>>({});

  const buyCourse = async (course: Course) => {
    try {
      if (user?.purchasedCourseIds.includes(course.id)) {
        setFeedback((prev) => ({ ...prev, [course.id]: "您已拥有该课程，可直接开始学习。" }));
        return;
      }
      if (!wallet.address) {
        await connect();
        setFeedback((prev) => ({
          ...prev,
          [course.id]: "请先完成钱包连接，再点击购买。",
        }));
        return;
      }

      setFeedback((prev) => ({ ...prev, [course.id]: null }));
      await approve(course.priceWei);
      await purchaseCourse(course.marketId);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              purchasedCourseIds: Array.from(new Set([...prev.purchasedCourseIds, course.id])),
            }
          : prev,
      );
      setFeedback((prev) => ({ ...prev, [course.id]: "购买成功，开始学习吧！" }));
    } catch (error) {
      const rawMessage = error instanceof Error ? error.message : "购买失败";
      const message =
        rawMessage.includes("余额不足") || rawMessage.includes("insufficient")
          ? "YDT 余额不足，请先充值后再购买。"
          : rawMessage;
      setFeedback((prev) => ({ ...prev, [course.id]: message }));
    }
  };

  const feedbackFor = (courseId: string) => feedback[courseId] ?? null;

  return { buyCourse, feedbackFor, txStatus };
};
