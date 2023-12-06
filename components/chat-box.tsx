"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Message } from "ai";
import { useChat } from "ai/react";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Note } from "@prisma/client";
import { BeatLoader } from "react-spinners";
import { useTheme } from "next-themes";

const ChatBox = ({ note }: { note: Note }) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <div>
        <div className="h-[700px] rounded border">
          <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
            {messages.map((message) => (
              <ChatMessage note={note} message={message} key={message.id} />
            ))}
            {isLoading && lastMessageIsUser && (
              <ChatMessage
                note={note}
                message={{
                  role: "assistant",
                  content: "BeatLoader",
                }}
              />
            )}
            {error && (
              <ChatMessage
                note={note}
                message={{
                  role: "assistant",
                  content: "",
                }}
              />
            )}
            {!error && messages.length === 0 && (
              <div className="flex h-full items-center justify-center gap-3">
                <Image
                  src={note.src}
                  alt="User image"
                  width={100}
                  height={100}
                  className="mr-5 h-50 w-50 rounded-full object-cover"
                />
                Ask questions to {note.name} about anything
              </div>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="border-t border-primary/10 py-4 flex items-center gap-x-2"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Say something..."
              ref={inputRef}
              className="rounded-lg bg-primary/10"
            />
            <Button type="submit" variant="ghost">
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

function ChatMessage({
  message: { role, content },
  note,
}: {
  message: Pick<Message, "role" | "content">;
  note: Note;
}) {
  const { user } = useUser();
  const { theme } = useTheme();

  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end"
      )}
    >
      {isAiMessage && (
        <Image
          src={note.src}
          alt="User image"
          width={100}
          height={100}
          className="mr-5 h-8 w-8 rounded-full object-cover"
        />
      )}
      <p
        className={cn(
          "rounded-md px-4 py-2 max-w-sm text-sm ",
          isAiMessage ? "bg-primary/10" : "bg-primary/10"
        )}
      >
        <div>
          {content === "BeatLoader" ? (
            <BeatLoader
              color={theme === "light" ? "black" : "white"}
              size={5}
            />
          ) : (
            <div>{content}</div>
          )}
        </div>
      </p>
      {!isAiMessage && user?.imageUrl && (
        <Image
          src={user.imageUrl}
          alt="User image"
          width={100}
          height={100}
          className="ml-5 h-8 w-8 rounded-full object-cover"
        />
      )}
    </div>
  );
}
