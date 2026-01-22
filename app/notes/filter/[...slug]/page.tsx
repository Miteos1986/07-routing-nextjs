//import NoteList from "@/components/NoteList/NoteList";
//import Link from "next/link";
//import { fetchNotes } from "@/lib/api";

import { notFound } from "next/navigation";
import NotesClient from "./Notes.client";

interface NotesByTagProps {
  params: Promise<{ slug: string[] }>;
}
const NotesByTag = async ({ params }: NotesByTagProps) => {
  const { slug } = await params;
  const currentTag = slug[0];

  const VALID_TAGS = ["all", "Work", "Personal", "Meeting", "Shopping", "Todo"];

  if (!VALID_TAGS.includes(currentTag)) {
    notFound();
  }

  return (
    <div>
      <h2>{currentTag === "all" ? "All notes" : `Tag: ${currentTag}`}</h2>
      <NotesClient tag={currentTag === "all" ? "" : currentTag} />
    </div>
  );
};

export default NotesByTag;
