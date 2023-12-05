import Notes from "@/components/notes";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";

const NotesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("userId is undefined");
  }

  const allNotes = await prisma.note.findMany({ where: { userId } });

  return (
    <div className="h-full p-4 space-y-2">
      <Notes allNotes={allNotes} />
    </div>
  );
};

export default NotesPage;
