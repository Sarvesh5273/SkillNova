// app/chat/page.tsx

"use client";



import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {

AlertDialog,

AlertDialogTrigger,

AlertDialogContent,

// ... other AlertDialog imports

} from "@/components/ui/alert-dialog";

import { Edit, MessageSquare, Send, Trash2, Menu } from "lucide-react";

import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

import { useState, useEffect } from "react";

import { toast } from "sonner";

import { ChatMessage } from "@/components/chat-message";

import { EmptyState } from "@/components/empty-state";

import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";



interface Chat {

id: string;

title: string;

}



interface Message {

id: string;

role: "user" | "assistant";

content: string;

}



export default function ChatUIPage() {

const [chats, setChats] = useState<Chat[]>([]);

const [messages, setMessages] = useState<Message[]>([]);

const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start collapsed

const supabase = createClient();



useEffect(() => {

// ... fetch chats logic

}, []);



const handleDeleteChat = async (chatId: string) => {

// ... delete chat logic

};



return (

<TooltipProvider delayDuration={0}>

<div className="h-screen bg-[#131314] text-white overflow-hidden relative">

{/* === START OF SIDEBAR === */}

<div

className={cn(

"fixed top-0 left-0 h-full bg-[#1e1f20] flex flex-col transition-all duration-300 ease-in-out z-20 border-r border-neutral-800",

isSidebarOpen ? "w-64" : "w-20"

)}

onMouseEnter={() => setIsSidebarOpen(true)}

onMouseLeave={() => setIsSidebarOpen(false)}

>

{/* Top Section */}

<div className="p-2">

<Button variant="ghost" size="icon" className="mb-4">

<Menu className="w-5 h-5" />

</Button>


<Tooltip>

<TooltipTrigger asChild>

<Button variant="ghost" className={cn(

"w-full justify-start gap-3 rounded-full h-12 px-3 hover:bg-neutral-700/50"

)}>

<Edit className="w-5 h-5 flex-shrink-0" />

<span className={cn(

"truncate transition-opacity",

!isSidebarOpen && "opacity-0"

)}>

New chat

</span>

</Button>

</TooltipTrigger>

{!isSidebarOpen && <TooltipContent side="right">New Chat</TooltipContent>}

</Tooltip>

</div>



{/* Recent Chats (Scrollable) */}

<div className={cn(

"flex-1 space-y-1 mt-4 overflow-y-auto transition-opacity",

!isSidebarOpen && "opacity-0"

)}>

<p className="text-sm text-neutral-400 mb-2 px-3 font-medium">Recent</p>

{chats.map((chat) => (

<div key={chat.id} className="px-2">

<Button variant="ghost" className="w-full justify-start gap-3 truncate hover:bg-neutral-700/50 rounded-full">

{chat.title}

</Button>

</div>

))}

</div>


{/* Bottom Section */}

<div className="p-2">

<Link href="/dashboard">

<Tooltip>

<TooltipTrigger asChild>

<Button variant="ghost" className="w-full justify-start gap-3 hover:bg-neutral-700/50 rounded-full h-12">

<Avatar className="w-8 h-8">

<AvatarFallback className="bg-lime-500 text-black text-xs">U</AvatarFallback>

</Avatar>

<span className={cn("truncate transition-opacity", !isSidebarOpen && "opacity-0")}>

User Dashboard

</span>

</Button>

</TooltipTrigger>

{!isSidebarOpen && <TooltipContent side="right">User Dashboard</TooltipContent>}

</Tooltip>

</Link>

</div>

</div>

{/* === END OF SIDEBAR === */}



{/* === START OF MAIN CONTENT AREA === */}

<div

className={cn(

"h-full flex flex-col transition-all duration-300 ease-in-out",

// KEY CHANGE: Padding animates to make room for the sidebar

isSidebarOpen ? "pl-64" : "pl-20"

)}

>

<div className="flex-1 p-6 overflow-y-auto">

<div className="max-w-4xl mx-auto space-y-6">

{messages.length === 0 ? <EmptyState /> : messages.map((msg) => <ChatMessage key={msg.id} role={msg.role} content={msg.content} />)}

</div>

</div>

<div className="p-4 bg-gradient-to-t from-[#131314] to-transparent">

<div className="max-w-4xl mx-auto">

<div className="relative">

<Input placeholder="Ask me anything about your career..." className="bg-[#1e1f20] border-neutral-700 text-white placeholder:text-gray-400 rounded-full py-6 pl-5 pr-14 focus-visible:ring-purple-500/50" />

<Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full w-10 h-10">

<Send className="w-5 h-5" />

<span className="sr-only">Send message</span>

</Button>

</div>

</div>

</div>

</div>

{/* === END OF MAIN CONTENT AREA === */}

</div>

</TooltipProvider>

);

}