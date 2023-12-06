import NoteForm from "./components/note-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";

interface NoteIdPageProps {
  params: {
    noteId: string;
  };
}

const NoteIdPage = async ({ params }: NoteIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  // console.log(params);

  let note;

  if (params.noteId !== "new") {
    note = await prisma.note.findUnique({
      where: {
        id: params.noteId,
        userId,
      },
    });
  } else {
    note = null;
  }

  return <NoteForm noteToEdit={note} />;
};

export default NoteIdPage;
