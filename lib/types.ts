// Client-side type (after JSON serialization)
export interface BlobImage {
  url: string;
  downloadUrl: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  contentType?: string;
  contentDisposition?: string;
}

// Hotmart API Types
export type StudentRole =
  | "STUDENT"
  | "FREE_STUDENT"
  | "ADMIN"
  | "OWNER"
  | "CONTENT_EDITOR"
  | "MODERATOR";
export type StudentStatus =
  | "ACTIVE"
  | "BLOCKED"
  | "BLOCKED_BY_OWNER"
  | "OVERDUE";
export type StudentType = "BUYER" | "FREE" | "IMPORTED" | "OWNER" | "GUEST";
export type StudentEngagement =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "VERY_HIGH";
export type PlusAccess =
  | "WITHOUT_PLUS_ACCESS"
  | "HOLDER"
  | "DEPENDENT"
  | "HOLDER_WITH_DEPENDENTS"
  | "HOLDER_WITHOUT_DEPENDENTS";

export interface Student {
  user_id: string;
  engagement: StudentEngagement;
  name: string;
  email: string;
  last_access_date: number;
  role: StudentRole;
  first_access_date: number;
  locale: string;
  plus_access: PlusAccess;
  progress: {
    completed_percentage: number;
    total: number;
    completed: number;
  };
  status: StudentStatus;
  access_count: number;
  is_deletable: boolean;
  class_id: string;
  type: StudentType;
  purchase_date: number; // Optional - only present for BUYER and IMPORTED types
}

export interface HotmartApiResponse {
  items: Student[];
  page_info: {
    total_results: number;
    next_page_token: string;
    prev_page_token: string;
    results_per_page: number;
  };
}
