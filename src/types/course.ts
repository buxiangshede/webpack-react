export type LessonType = "video" | "article" | "quiz";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
  contentUrl?: string;
  transcript?: string;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  marketId: number;
  title: string;
  author: string;
  authorWallet: string;
  category: string;
  level: string;
  rating: number;
  students: number;
  price: number;
  priceWei: string;
  thumbnail: string;
  shortDescription: string;
  highlights: string[];
  tags: string[];
  metadataURI: string;
  sections: Section[];
}
