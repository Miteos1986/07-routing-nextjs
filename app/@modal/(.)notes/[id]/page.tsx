import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

async function NotePreviewPage({ params }: NotePreviewProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return <NotePreview note={note} />;
}

export default NotePreviewPage;
