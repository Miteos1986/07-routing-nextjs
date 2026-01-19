"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import css from "./Notes.module.css";

import { fetchNotes } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
//import Loader from "@/components/Loader/Loader";
//import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import SearchBox from "@/components/SearchBox/SearchBox";

function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isSuccess, isFetching, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, perPage, search),
    placeholderData: keepPreviousData,
  });

  const debouncedSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearch(event.target.value);
    },
    1000
  );
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onChange={debouncedSearch} />
        <Toaster position="top-right" />
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        {isFetching && !isError && (
          <span className={css.fetching}>Updating...</span>
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default NotesClient;
