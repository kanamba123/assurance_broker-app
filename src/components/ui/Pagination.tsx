import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
      <div className="text-sm text-gray-600">
        Affichage de <span className="font-semibold">{startItem}</span> à{" "}
        <span className="font-semibold">{endItem}</span> sur{" "}
        <span className="font-semibold">{totalItems}</span> entrées
      </div>

      <div className="flex justify-end">
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center px-3 py-1 rounded-md border text-sm disabled:opacity-50 hover:bg-gray-100 transition"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Précédent
          </button>

          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2 text-sm text-gray-500">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => onPageChange(Number(page))}
                className={`px-3 py-1 rounded-md border text-sm transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            className="flex items-center px-3 py-1 rounded-md border text-sm disabled:opacity-50 hover:bg-gray-100 transition"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
