"use client";

import { useState } from "react";
import { Pagination } from "@constructpluseu/react";

export function PaginationDemo() {
  const [page, setPage] = useState(3);
  return <Pagination page={page} totalPages={8} onPageChange={setPage} />;
}
