import { Conversation } from '../data';

interface ConversationSidebarProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onConversationSelect: (conversation: Conversation) => void;
}

export default function ConversationSidebar({
  conversations,
  selectedConversation,
  onConversationSelect,
}: ConversationSidebarProps) {
  return (
    <div className="h-full overflow-y-auto">
      <h2 className="p-4 text-xl font-semibold border-b">Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              selectedConversation?.id === conversation.id ? 'bg-gray-200' : ''
            }`}
            onClick={() => onConversationSelect(conversation)}
          >
            <div className="flex items-center">
              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <p className="font-semibold">{conversation.contactName}</p>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.messages[conversation.messages.length - 1].text}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
