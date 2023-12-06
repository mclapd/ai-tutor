import ChatClient from "./components/chat-client";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const note = await prisma.note.findUnique({
    where: {
      id: params.chatId,
    },
  });

  if (!note) {
    return redirect("/");
  }
  return <ChatClient note={note} />;
};

export default ChatPage;
