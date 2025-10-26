import { ChevronLeft, ChevronRight } from "lucide-react";
import type { paginationProps } from "../types/Collaborators.types";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: paginationProps) => {
  return (
    <div className="flex justify-between items-center p-2">
      <button
        className="flex justify-center items-center gap-2 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-200 hover:dark:bg-neutral-600 active:bg-neutral-400 active:dark:bg-neutral-900 transition-all  p-2 rounded-md cursor-pointer"
        onClick={() => onPageChange(currentPage <= 0 ? currentPage: currentPage - 1)}
      >
        <ChevronLeft />
        Previous
      </button>
      <div className="flex justify-center items-center space-x-4">
        <span className="p-2 min-w-[50px] flex justify-center border border-neutral-300 dark:border-neutral-800 rounded-md ">
          {currentPage}
        </span>
        <span>Of</span>
        <span>{totalPages}</span>
      </div>

      <button
        className="flex justify-center items-center gap-2 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-200 hover:dark:bg-neutral-600 active:bg-neutral-400 active:dark:bg-neutral-900 transition-all  p-2 rounded-md cursor-pointer"
        onClick={() => onPageChange(totalPages === currentPage ? currentPage: currentPage + 1)}
      >
        Next
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
