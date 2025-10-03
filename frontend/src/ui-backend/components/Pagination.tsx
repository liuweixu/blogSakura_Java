import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";

export const usePagination = (count: number) => {
  // 预计每页显示的文章个数
  const itemPerPage = 10;
  //计算当前页数
  const [currentPage, setCurrentPage] = useState(1);

  const pagination = (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage((prev: number) => Math.max(prev - 1, 1));
            }}
          />
        </PaginationItem>

        {/* 总是显示第一页 */}
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
            isActive={1 === currentPage}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* 如果第一页和第二页之间有间隔，显示省略号 */}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* 显示当前页附近的页码 */}
        {Array.from({ length: Math.ceil(count / itemPerPage) })
          .map((_, index) => index + 1)
          .filter((page) => {
            // 显示当前页附近的页码（前后各1页）
            return (
              page > 1 &&
              page < Math.ceil(count / itemPerPage) &&
              Math.abs(page - currentPage) <= 1
            );
          })
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* 如果最后一页和倒数第二页之间有间隔，显示省略号 */}
        {currentPage < Math.ceil(count / itemPerPage) - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* 总是显示最后一页（如果总页数大于1） */}
        {Math.ceil(count / itemPerPage) > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.ceil(count / itemPerPage));
              }}
              isActive={Math.ceil(count / itemPerPage) === currentPage}
            >
              {Math.ceil(count / itemPerPage)}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(count / itemPerPage))
              );
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
  return {
    pagination,
    itemPerPage,
    currentPage,
  };
};
