import type {Message}  from "../Modules/Chat/Models/messageTypes";
import MessageRow from "./Message";


const MessagesList = ({
  messages,
  me,
}: {
  messages: Message[];
  me: string;
}) => {
  return (
    <div className="messagesList">
      <p className="empty">No messages yet — say hi!</p>
      {messages.map((item) => (
        <MessageRow key={item.id} message={item} mine={item.from === me} />
      ))}
    </div>
  );
};

export default MessagesList;
