"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Edit, Send, Menu, Settings, HelpCircle, LogOut, Crown, Search } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChatMessage } from "@/components/chat-message";
import { EmptyState } from "@/components/empty-state";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SettingsDialog } from "@/components/settings-dialog";

interface Chat {
  id: string;
  title: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SidebarContent = ({
  isExpanded,
  onSettingsClick,
  onLogoutClick,
  onMenuClick,
}: {
  isExpanded: boolean;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
  onMenuClick?: () => void;
}) => (
  <div className="flex flex-col h-full bg-[#1e1f20]">
    {/* Top Section */}
    <div className="p-2">
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Wrapped in a span */}
          <span>
            <Button variant="ghost" size="icon" className="mb-4" onClick={onMenuClick}>
              <Menu className="w-5 h-5" />
            </Button>
          </span>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right">Open sidebar</TooltipContent>}
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          {/* Wrapped in a span */}
          <span>
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-3 rounded-full h-12 px-3 hover:bg-neutral-700/50")}
            >
              <Edit className="w-5 h-5 flex-shrink-0" />
              <span className={cn("truncate transition-opacity", !isExpanded && "opacity-0")}>New chat</span>
            </Button>
          </span>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right">New Chat</TooltipContent>}
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          {/* Wrapped in a span */}
          <span>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-full h-12 px-3 hover:bg-neutral-700/50"
            >
              <Search className="w-5 h-5 flex-shrink-0" />
              <span className={cn("truncate transition-opacity", !isExpanded && "opacity-0")}>
                Search
              </span>
            </Button>
          </span>
        </TooltipTrigger>
        {!isExpanded && (
          <TooltipContent side="right" className="flex items-center gap-2">
            Search chats
          </TooltipContent>
        )}
      </Tooltip>
    </div>

    {/* Recent Chats (Scrollable) */}
    <div className={cn("flex-1 space-y-1 mt-4 overflow-y-auto", !isExpanded && "opacity-0")}>
      <p className="text-sm text-neutral-400 mb-2 px-3 font-medium">Recent</p>
    </div>

    {/* Bottom Section */}
    <div className="p-2 mt-auto border-t border-neutral-800 space-y-1">
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Wrapped in a span */}
          <span>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-neutral-700/50 rounded-full h-12 px-3"
              onClick={onSettingsClick}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              <span className={cn("truncate transition-opacity", !isExpanded && "opacity-0")}>Settings</span>
            </Button>
          </span>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right">Settings</TooltipContent>}
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/faq">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-neutral-700/50 rounded-full h-12 px-3"
            >
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              <span className={cn("truncate transition-opacity", !isExpanded && "opacity-0")}>Help & FAQ</span>
            </Button>
          </Link>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right">Help & FAQ</TooltipContent>}
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          {/* Wrapped in a span */}
          <span>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-neutral-700/50 rounded-full h-12 px-3"
              onClick={onLogoutClick}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={cn("truncate transition-opacity", !isExpanded && "opacity-0")}>Logout</span>
            </Button>
          </span>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right">Logout</TooltipContent>}
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/pricing">
            <Button className="w-full justify-start gap-3 bg-lime-500/10 text-lime-400 hover:bg-lime-500/20 rounded-full h-12 px-3 mt-2 border border-lime-500/20">
              <Crown className="w-5 h-5 flex-shrink-0" />
              <span className={cn("truncate transition-opacity", !isExpanded && "opacity-0")}>Upgrade to Pro</span>
            </Button>
          </Link>
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right">Upgrade to Pro</TooltipContent>}
      </Tooltip>
    </div>
  </div>
);

export default function ChatUIPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUserData();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let chatId = currentChatId;

    // Create a new chat if there isn't one
    if (!chatId) {
      const { data, error } = await supabase
        .from("chats")
        .insert({ user_id: user.id, title: input.substring(0, 50) })
        .select()
        .single();

      if (error) {
        console.error("Error creating chat:", error);
        // Handle error appropriately
        setIsLoading(false);
        return;
      }
      chatId = data.id;
      setCurrentChatId(chatId);
    }
    
    // Save user message
    const { error: userMessageError } = await supabase.from("messages").insert({
      chat_id: chatId,
      role: "user",
      content: input,
    });

    if (userMessageError) {
      console.error("Error saving user message:", userMessageError);
      // Handle error
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to get a response from the AI.");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Save assistant message
      const { error: assistantMessageError } = await supabase.from("messages").insert({
        chat_id: chatId,
        role: "assistant",
        content: data.text,
      });

      if (assistantMessageError) {
        console.error("Error saving assistant message:", assistantMessageError);
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TooltipProvider delayDuration={0}>
        <div className="h-screen bg-[#131314] text-white overflow-hidden relative">
          
          <div
            ref={sidebarRef}
            className={cn(
              "fixed top-0 left-0 h-full flex-col z-20 hidden md:flex",
              "transition-[width] duration-200 ease-out",
              isSidebarOpen ? "w-64" : "w-20"
            )}
          >
            <SidebarContent 
              isExpanded={isSidebarOpen}
              onSettingsClick={() => setIsSettingsOpen(true)}
              onLogoutClick={handleLogout}
              onMenuClick={() => setIsSidebarOpen(prev => !prev)}
            />
          </div>

          <div
            className={cn(
              "h-full flex flex-col",
              "transition-[padding-left] duration-200 ease-out",
              isSidebarOpen ? "md:pl-64" : "md:pl-20"
            )}
          >
            <div className="p-2 flex items-center border-b border-neutral-800 md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-5 h-5" />
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 bg-transparent border-r-0">
                        <SidebarContent 
                          isExpanded={true}
                          onSettingsClick={() => setIsSettingsOpen(true)}
                          onLogoutClick={handleLogout}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.length === 0 ? <EmptyState /> : messages.map((msg) => <ChatMessage key={msg.id} role={msg.role} content={msg.content} />)}
              </div>
            </div>
            <div className="p-4 bg-gradient-to-t from-[#131314] to-transparent">
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSendMessage} className="relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about your career..."
                    className="bg-[#1e1f20] border-neutral-700 text-white placeholder:text-gray-400 rounded-2xl text-base py-7 pl-6 pr-16"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full w-10 h-10"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}