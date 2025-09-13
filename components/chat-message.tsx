// components/chat-message.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3", isUser && "justify-end")}>
      {!isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarFallback className="bg-lime-500 text-black text-sm">SN</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-md rounded-lg p-3 border",
          isUser
            ? "bg-lime-500/20 border-lime-500/30 text-white" // <-- Changed from purple to lime
            : "bg-white/5 border-white/10"
        )}
      >
        <p className="text-white whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}