import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseDetail } from "@/hooks/useCourseDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourseActions } from "@/hooks/useCourseActions";
import { useUserContext } from "@/contexts/UserContext";
import { useWallet } from "@/hooks/useWallet";

export const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { course, loading, error } = useCourseDetail(id);
  const { approve, purchaseCourse, txStatus } = useCourseActions();
  const { wallet, connect } = useWallet();
  const { user, setUser } = useUserContext();
  const [message, setMessage] = useState<string | null>(null);

  const purchased = useMemo(() => user?.purchasedCourseIds.includes(id ?? "") ?? false, [id, user]);

  if (loading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (error || !course) {
    return <p className="text-red-500">{error ?? "课程不存在"}</p>;
  }

  const handleAuthorize = async () => {
    if (!wallet.address) {
      await connect();
    }
    try {
      await approve(course.priceWei);
      setMessage("授权成功，接下来可以购买课程");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "授权失败");
    }
  };

  const handlePurchase = async () => {
    try {
      await purchaseCourse(course.marketId);
      setUser((prev) => (prev ? { ...prev, purchasedCourseIds: Array.from(new Set([...prev.purchasedCourseIds, course.id])) } : prev));
      setMessage("购买成功，开始学习吧！");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "购买失败");
    }
  };

  return (
    <section className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="glass-panel p-8 space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">
            {course.category} · {course.level}
          </p>
          <h1 className="text-4xl font-semibold">{course.title}</h1>
          <p className="text-sm text-muted max-w-3xl">{course.shortDescription}</p>
          <div className="flex flex-wrap gap-2">
            {(course?.tags || []).map((tag) => (
              <span key={tag} className="chip text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(course.highlights|| []).map((highlight) => (
              <div key={highlight} className="stat-card">
                <p className="text-sm text-muted">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="glass-panel p-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">课程价格</p>
            <p className="mt-3 text-4xl font-semibold">{course.price} YDT</p>
          </div>
          {message && <p className="text-sm text-emerald-400">{message}</p>}
          {purchased ? (
            <button type="button" className="plain-button w-full" onClick={() => navigate(`/learn/${course.id}`)}>
              进入课程
            </button>
          ) : (
            <>
              <button
                type="button"
                className="plain-button w-full bg-transparent"
                disabled={txStatus !== "idle"}
                onClick={() => void handleAuthorize()}
              >
                授权 CourseMarket 支付
              </button>
              <button type="button" className="plain-button w-full" disabled={txStatus !== "idle"} onClick={() => void handlePurchase()}>
                立即购买
              </button>
            </>
          )}
          <p className="text-xs text-muted">
            链上交易需要确认，请确保钱包余额充足。授权后可直接在 CourseMarket 调用购买接口。
          </p>
        </aside>
      </div>

      <div className="glass-panel p-8 space-y-6">
        <h2 className="text-2xl font-semibold">课程目录</h2>
        <div className="space-y-3">
          {(course.sections || []).map((section) => (
            <div key={section.id} className="rounded-2xl border border-white/5 p-6">
              <p className="text-lg font-medium">{section.title}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {(section.lessons || section.lessons).map((lesson) => (
                  <li key={lesson.id} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2">
                    <span>{lesson.title}</span>
                    <span>{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
