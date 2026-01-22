"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(12);

  const { data, isSuccess, isFetching, isError } = useQuery({
    queryKey: ["notes", page, tag],
    queryFn: () => fetchNotes(page, perPage, tag),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      {isSuccess && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {isFetching && !isError && <span>Updating...</span>}

      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
