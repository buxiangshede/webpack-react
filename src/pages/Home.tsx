import { memo } from "react";
import { Link } from "react-router-dom";
import { useCourses } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuickPurchase } from "@/hooks/useQuickPurchase";
import { useUserContext } from "@/contexts/UserContext";

const Home = () => {
  const { courses, loading } = useCourses();
  const { buyCourse, feedbackFor, txStatus } = useQuickPurchase();
  const { user } = useUserContext();
  const featured = courses.slice(0, 4);

  return (
    <div className="space-y-16">
      <section className="hero-panel">
        <span className="chip">Web3 University</span>
        <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
          代币驱动的课程、权益与 Aave 收益
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-100/90">
          使用 YDToken 支付课程，链上记录每一次学习权益。创作者收入可一键质押至 Aave，打造安全透明的学习经济闭环。
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link className="primary-btn" to="/courses">
            进入课程市场
          </Link>
          <Link className="ghost-btn" to="/instructor/courses/new">
            发行我的课程
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="stat-card">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">链上课程</p>
            <p className="mt-2 text-3xl font-semibold">{courses.length || "00"}+</p>
            <p className="text-sm text-muted">全部可由 CourseMarket 结算</p>
          </div>
          <div className="stat-card">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">权益凭证</p>
            <p className="mt-2 text-3xl font-semibold">NFT / SBT</p>
            <p className="text-sm text-muted">完成课程即可上链记录</p>
          </div>
          <div className="stat-card">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">收益托管</p>
            <p className="mt-2 text-3xl font-semibold">Aave</p>
            <p className="text-sm text-muted">作者收入一键质押、赎回</p>
          </div>
        </div>
      </section>

      <section className="glass-panel p-8 space-y-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">精选课程</p>
            <h2 className="text-2xl font-semibold">深度学习链上专题</h2>
          </div>
          <Link className="ghost-btn px-4 py-2" to="/courses">
            查看全部
          </Link>
        </div>
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-48 w-full rounded-2xl bg-slate-600/20" />
            ))}
          </div>
        ) : (
          <div className="course-grid">
            {featured.map((course) => {
              const owned = user?.purchasedCourseIds.includes(course.id);
              return (
                <article key={course.id} className="course-card">
                  <span className="chip text-xs">{course.level}</span>
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-muted">{course.shortDescription}</p>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>{course.price} YDT</span>
                    <span>{course.students} 位学员</span>
                  </div>
                  <button
                    type="button"
                    className="plain-button text-center"
                    disabled={owned || txStatus !== "idle"}
                    onClick={() => void buyCourse(course)}
                  >
                    {owned ? "已购买" : txStatus !== "idle" ? "处理中..." : "使用 YDT 购买"}
                  </button>
                  {feedbackFor(course.id) && (
                    <p className="text-xs text-emerald-400">{feedbackFor(course.id)}</p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default memo(Home);
