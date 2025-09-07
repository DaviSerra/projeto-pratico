import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = window.innerWidth < 640 ? 5 : 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 0; i < (window.innerWidth < 640 ? 3 : 5); i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages - 1);
      } else if (currentPage >= totalPages - 4) {
        pages.push(0);
        pages.push(-1);
        for (
          let i = totalPages - (window.innerWidth < 640 ? 3 : 5);
          i < totalPages;
          i++
        ) {
          pages.push(i);
        }
      } else {
        pages.push(0);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages - 1);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-6 sm:mt-8 px-4 sm:px-6 sm:flex-row">
      <div className="flex items-center gap-1 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
          className="hidden sm:flex p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-200 dark:hover:bg-dark-700 text-dark-600 dark:text-light-400"
          title="Primeira página"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="p-1.5 sm:p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-200 dark:hover:bg-dark-700 text-dark-600 dark:text-light-400"
          title="Página anterior"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <div className="flex items-center gap-1 sm:gap-3 mx-1 sm:mx-2">
          {generatePageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === -1 ? (
                <span className="px-2 py-1.5 sm:px-3 sm:py-2 text-dark-500 dark:text-light-500 text-sm">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all font-medium text-sm cursor-pointer ${
                    currentPage === page
                      ? "bg-secondary-500 text-white shadow-md"
                      : "text-dark-600 dark:text-light-400 hover:bg-light-200 dark:hover:bg-dark-700"
                  }`}
                >
                  {page + 1}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="p-1.5 sm:p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-200 dark:hover:bg-dark-700 text-dark-600 dark:text-light-400"
          title="Próxima página"
        >
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
          className="hidden sm:flex p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-200 dark:hover:bg-dark-700 text-dark-600 dark:text-light-400"
          title="Última página"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
