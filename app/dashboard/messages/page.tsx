'use client';

import { useState } from 'react';
import { conversations, Conversation } from './data';
import ConversationSidebar from './components/ConversationSidebar';
import MessageView from './components/MessageView';
import { Menu, X } from 'lucide-react';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] bg-gray-100">
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white rounded-md shadow-md"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Conversation Sidebar */}
      <div
        className={`
          w-full md:w-1/4 bg-white border-r border-gray-200
          transition-transform transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          absolute md:relative z-10 md:z-auto
          h-full
        `}
      >
        <ConversationSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          onConversationSelect={handleConversationSelect}
        />
      </div>

      {/* Main Message View */}
      <div className="flex-1 flex flex-col w-full md:w-3/4">
        <MessageView conversation={selectedConversation} />
      </div>
    </div>
  );
}
