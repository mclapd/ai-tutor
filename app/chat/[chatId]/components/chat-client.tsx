import ChatBox from "@/components/chat-box";
import ChatHeader from "@/components/chat-header";
import { Note } from "@prisma/client";

interface ChatClientProps {
  note: Note;
}
const ChatClient = ({ note }: ChatClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader note={note} />
      {/* <ChatMessages
        note={note}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      /> */}
      <ChatBox />
    </div>
  );
};

export default ChatClient;
