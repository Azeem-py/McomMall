'use client';

import { useState } from 'react';
import { conversations as initialConversations, Conversation, Message } from './data';
import ConversationSidebar from './components/ConversationSidebar';
import MessageView from './components/MessageView';
import { Menu, X } from 'lucide-react';

export default function MessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(conversations[0]?.id || null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId) || null;

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversationId(conversation.id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleSendMessage = (message: Message) => {
    if (!selectedConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, message],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
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
        <MessageView conversation={selectedConversation} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
