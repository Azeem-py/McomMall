import { useState } from 'react';
import { Conversation, Message } from '../data';

interface MessageViewProps {
  conversation: Conversation | null;
  onSendMessage: (message: Message) => void;
}

export default function MessageView({ conversation, onSendMessage }: MessageViewProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: conversation.messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onSendMessage(message);
    setNewMessage('');
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b flex items-center">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
        <h2 className="text-xl font-semibold">{conversation.contactName}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex my-2 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs text-right mt-1 opacity-75">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="relative">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
            {/* Send icon placeholder */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
