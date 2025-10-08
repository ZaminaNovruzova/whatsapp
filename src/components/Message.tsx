import { users } from "../db/users";
import type { IMessage } from "../Modules/Chat/Models/messageTypes";

const Message = ({ message, mine }: { message: IMessage; mine: boolean }) => {
  const time = new Date(message.createdAt).toLocaleDateString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const user = users.find((u) => u.id === message.from);
  const avatarColor = user ? user.color : "#94a3b8";
  const firstLetter = message.from ? message.from[0].toUpperCase() : "";
  const avatarUrl = user?.image ?? null;

  return (
    <div
      className={`message ${mine ? "mine" : ""}`}
      style={{ justifyContent: mine ? "flex-end" : "flex-start" }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={message.from}
          style={{ width: "50px", height: "50px", borderRadius: "100%" }}
        />
      ) : (
        <p className="firstLetterBox" style={{ background: avatarColor }}>
          {firstLetter}
        </p>
      )}
      <div className="messageRow" style={{ background: avatarColor }}>
        <p className="message">{message.text}</p>
        <p className="time">{time}</p>
      </div>
    </div>
  );
};

export default Message;
