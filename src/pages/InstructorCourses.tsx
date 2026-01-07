import { useCourses } from "@/hooks/useCourses";
import { useUserContext } from "@/contexts/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export const InstructorCoursesPage = () => {
  const { courses, loading } = useCourses();
  const { user } = useUserContext();

  const authored = courses.filter((course) => user?.authoredCourseIds.includes(course.id));

  if (loading) {
    return <Skeleton className="h-64 w-full rounded-2xl bg-slate-600/20" />;
  }

  return (
    <section className="space-y-6">
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Instructor</p>
          <h1 className="text-3xl font-semibold">作者控制面板</h1>
        </div>
        <Link className="plain-button" to="/instructor/courses/new">
          新建课程
        </Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {authored.map((course) => (
          <article key={course.id} className="glass-panel p-6 space-y-3">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-sm text-muted">价格 {course.price} YDT · {course.students} 学员 · 评分 {course.rating}</p>
            <div className="flex gap-3">
              <span className="plain-button pointer-events-none opacity-70">详情页暂未开放</span>
              <Link className="ghost-btn px-4 py-2" to={`/learn/${course.id}`}>
                查看内容
              </Link>
            </div>
          </article>
        ))}
        {authored.length === 0 && <p className="text-sm text-muted">暂无课程，点击右侧按钮开始创建。</p>}
      </div>
    </section>
  );
};

export default InstructorCoursesPage;
