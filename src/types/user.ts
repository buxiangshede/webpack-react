export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
  bio: string;
  walletAddress: string;
  email?: string;
  purchasedCourseIds: string[];
  authoredCourseIds: string[];
  socials?: Record<string, string>;
}
