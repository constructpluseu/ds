export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  "aria-label"?: string;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  "aria-label": ariaLabel = "Paginação",
}: PaginationProps) {
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <nav className="cp-pagination" aria-label={ariaLabel}>
      <span className="cp-pagination__status">
        Página {page} de {totalPages}
      </span>
      <div className="cp-pagination__nav">
        <button
          type="button"
          className="cp-pagination__button"
          disabled={!canGoPrevious}
          aria-label="Página anterior"
          onClick={() => onPageChange(page - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="cp-pagination__button"
          disabled={!canGoNext}
          aria-label="Página seguinte"
          onClick={() => onPageChange(page + 1)}
        >
          ›
        </button>
      </div>
    </nav>
  );
}
