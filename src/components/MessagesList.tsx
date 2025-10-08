import type { IMessage } from "../Modules/Chat/Models/messageTypes";
import Message from "./Message";

const MessagesList = ({
  messages,
  me,
}: {
  messages: IMessage[];
  me: string;
}) => {
  return (
    <div className="messagesList">
      {messages.length === 0 && (
        <p className="empty">No messages yet — say hi!</p>
      )}
      {messages.map((item) => (
        <Message key={item.id} message={item} mine={item.from === me} />
      ))}
    </div>
  );
};

export default MessagesList;
