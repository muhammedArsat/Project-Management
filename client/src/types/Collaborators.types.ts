export type SortDirection = "asc" | "desc" | null;
export type SortField = "name" | "email" | "role" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile: string;
}

export interface CollaboratorResponse {
  success: boolean;
  message: string;
  users: User[];
  currPage: number;
  totalPages: number;
  totalUsers: number;
}

export interface paginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
