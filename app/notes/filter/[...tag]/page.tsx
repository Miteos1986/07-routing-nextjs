import { fetchNotes } from "@/lib/api";

interface NotesByTagProps {
  params: Promise<{ tag: string[] }>;
}

const NotesByTag = async ({ params }: NotesByTagProps) => {
  const { tag } = await params;
  const currentTag = tag[0];

  /*if (currentTag === "all") {
    return null;
  }
*/
  const response = await fetchNotes(
    1,
    10,
    "",
    currentTag === "all" ? undefined : currentTag
  );

  return (
    <div>
      <h2>{currentTag === "all" ? "All notes" : `Tag: ${currentTag}`}</h2>
      {response.notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span>Tag: {note.tag}</span>
        </div>
      ))}
    </div>
  );
};

export default NotesByTag;
