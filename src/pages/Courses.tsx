import { useMemo, useState } from "react";
import { useCourses } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/contexts/UserContext";
import { useQuickPurchase } from "@/hooks/useQuickPurchase";

const levels = ["全部", "Beginner", "Intermediate", "Advanced"];

export const CoursesPage = () => {
  const { courses, loading } = useCourses();
  const { user } = useUserContext();
  const { buyCourse, feedbackFor, txStatus } = useQuickPurchase();
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("全部");


  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = level === "全部" ? true : course.level === level;
      return matchesSearch && matchesLevel;
    });
  }, [courses, level, search]);

  return (
    <section className="space-y-8">
      <header className="glass-panel flex flex-col gap-6 p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">课程市场</p>
          <h1 className="mt-2 text-3xl font-semibold">链上课程一览</h1>
          <p className="text-sm text-muted">PC 优先体验 · 实时授权 · 一键权益管理</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <input
            className="simple-input md:w-80"
            placeholder="按标题搜索课程"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {levels.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLevel(item)}
                className={`chip ${level === item ? "border-white/60 text-white" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-60 w-full rounded-2xl bg-slate-600/20" />
          ))}
        </div>
      ) : (
        <div className="course-grid">
          {filtered.map((course) => {
            const owned = user?.purchasedCourseIds.includes(course.id);
            return (
              <article key={course.id} className="course-card gap-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                  <span>{course.category}</span>
                  <span>{course.level}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                  <p className="text-sm text-muted line-clamp-2">{course.shortDescription}</p>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-white">
                  <span>{course.price} YDT</span>
                  <span className="text-muted">{course.students} 学员</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(course.tags ?? []).slice(0, 3).map((tag) => (
                    <span key={tag} className="chip text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className={owned ? "text-emerald-400" : ""}>{owned ? "已购买" : "待购买"}</span>
                  <span>{course.rating} / 5</span>
                </div>
                <div className="space-y-2">
                  <button
                    type="button"
                    className="plain-button w-full text-center"
                    disabled={owned || txStatus !== "idle"}
                    onClick={() => void buyCourse(course)}
                  >
                    {owned ? "已购买" : txStatus !== "idle" ? "交易处理中..." : "使用 YDT 购买"}
                  </button>
                  {feedbackFor(course.id) && (
                    <p className="text-xs text-emerald-400">{feedbackFor(course.id)}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CoursesPage;
