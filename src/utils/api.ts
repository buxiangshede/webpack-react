import type { Course } from "@/types/course";
import type { UserProfile } from "@/types/user";

const API_BASE = "http://localhost:4000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export const api = {
  async getCourses(): Promise<Course[]> {
    return request<Course[]>("/courses");
  },
  async getCourseById(id: string): Promise<Course> {
    return request<Course>(`/courses/${id}`);
  },
  async getUserProfile(wallet: string): Promise<UserProfile> {
    return request<UserProfile>(`/users/${wallet}`);
  },
  async createCourseDraft(payload: Record<string, unknown>) {
    return request<Course>("/courses", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  async requestYdTopUp(wallet: string, amount: number) {
    return request<{ txHash: string; wallet: string; amount: string }>("/ydtoken/topup", {
      method: "POST",
      body: JSON.stringify({ wallet, amount }),
    });
  },
};
