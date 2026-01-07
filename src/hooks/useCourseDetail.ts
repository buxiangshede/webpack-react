import { useCallback, useEffect, useState } from "react";
import type { Course } from "@/types/course";
import { api } from "@/utils/api";

export const useCourseDetail = (courseId?: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!courseId) return;
    setLoading(true);
    setError(null);
    try {
      const detail = await api.getCourseById(courseId);
      if (!detail) {
        setError("课程不存在");
        setCourse(null);
        return;
      }
      setCourse(detail);
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载失败");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { course, loading, error, refetch: fetchDetail };
};
