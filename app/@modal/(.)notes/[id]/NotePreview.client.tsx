"use client";

import { useRouter } from "next/navigation";
import css from "@/app/@modal/(.)notes/[id]/NotePreview.module.css";

interface NotePreviewProps {
  note: {
    title: string;
    content: string;
    tag: string;
    createdAt: string;
  };
}

function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();
  const close = () => router.back();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <p className={css.content}>{note.content}</p>

        <div className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </div>

        <button className={css.backBtn} onClick={close}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default NotePreview;
