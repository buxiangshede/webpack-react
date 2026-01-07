import { useCallback, useEffect, useMemo, useState } from "react";
import type { Course } from "@/types/course";
import { api } from "@/utils/api";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCourses();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载课程失败");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const groupedByCategory = useMemo(() => {
    return courses.reduce<Record<string, Course[]>>((acc, course) => {
      acc[course.category] = acc[course.category] ? [...acc[course.category], course] : [course];
      return acc;
    }, {});
  }, [courses]);

  return { courses, groupedByCategory, loading, error, refetch: fetchCourses };
};
