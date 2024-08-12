"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "~/ui/pagination";

export default function ProductPagination({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const maxPage = Math.ceil(total / 12);
  let page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  if (page > maxPage) {
    page = maxPage;
  }
  if (total <= 12) return null;

  const getPaginationRange = () => {
    const range = [];
    const start = Math.max(page - 2, 1);
    const end = Math.min(page + 2, maxPage);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  const handlePageChange = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          />
        </PaginationItem>

        {paginationRange[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {paginationRange[0] > 2 && <PaginationEllipsis />}
          </>
        )}

        {paginationRange.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => handlePageChange(p)}
              isActive={p === page}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {paginationRange[paginationRange.length - 1] < maxPage && (
          <>
            {paginationRange[paginationRange.length - 1] < maxPage - 1 && (
              <PaginationEllipsis />
            )}
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(maxPage)}>
                {maxPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            disabled={page === maxPage}
            onClick={() => handlePageChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
