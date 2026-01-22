//import NoteList from "@/components/NoteList/NoteList";

import { fetchNotes } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  const response = await fetchNotes(
    1,
    10,
    "",
    currentTag === "all" ? undefined : currentTag,
  );

  return (
    <div>
      <h2>{currentTag === "all" ? "All notes" : `Tag: ${currentTag}`}</h2>

      {response.notes.map((note) => (
        <Link key={note.id} href={`/notes/${note.id}`} scroll={false}>
          <div style={{ cursor: "pointer" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <span>Tag: {note.tag}</span>
          </div>
        </Link>
      ))}

      {/*response.notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span>Tag: {note.tag}</span>
        </div>
      ))*/}
      {/*<NoteList notes={response.notes} />*/}
    </div>
  );
};

export default NotesByTag;
