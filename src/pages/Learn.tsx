import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourseDetail } from "@/hooks/useCourseDetail";
import { Skeleton } from "@/components/ui/skeleton";
import type { Lesson } from "@/types/course";
import { useUserContext } from "@/contexts/UserContext";

export const LearnPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { course, loading } = useCourseDetail(id);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const purchased = useMemo(() => user?.purchasedCourseIds.includes(id ?? "") ?? false, [id, user]);

  useEffect(() => {
    if (!loading && course) {
      setCurrentLesson(course.sections[0]?.lessons[0] ?? null);
    }
  }, [course, loading]);

  useEffect(() => {
    if (!loading && !purchased && course) {
      navigate("/courses", { replace: true });
    }
  }, [course, loading, navigate, purchased]);

  if (loading || !course) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (!purchased) {
    return (
      <div className="glass-panel space-y-4 p-6 text-sm text-muted">
        <p>需要购买课程后才能访问内容。</p>
        <button type="button" className="plain-button w-fit" onClick={() => navigate("/courses")}>
          返回课程列表
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
      <aside className="glass-panel p-6">
        <h2 className="text-lg font-semibold">课程目录</h2>
        <div className="mt-4 space-y-4">
          {course.sections.map((section) => (
            <div key={section.id}>
              <p className="text-sm font-medium text-muted">{section.title}</p>
              <ul className="mt-2 space-y-1">
                {section.lessons.map((lesson) => {
                  const active = currentLesson?.id === lesson.id;
                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        onClick={() => setCurrentLesson(lesson)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                          active ? "bg-white/10 text-white" : "text-muted hover:bg-white/5"
                        }`}
                      >
                        {lesson.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>
      <section className="glass-panel p-8">
        {currentLesson ? (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              {currentLesson.type.toUpperCase()} · {currentLesson.duration}
            </p>
            <h1 className="text-3xl font-semibold">{currentLesson.title}</h1>
            <div className="h-72 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <p className="text-sm text-muted">
              课程内容由后端提供，这里展示占位区域。可根据链上元数据渲染视频、文稿或者互动练习。
            </p>
          </div>
        ) : (
          <p className="text-muted">请选择左侧的小节开始学习。</p>
        )}
      </section>
    </div>
  );
};

export default LearnPage;
