import type { Message } from "../Modules/Chat/Models/messageTypes";

const Message = ({ message, mine }: { message: Message; mine: boolean }) => {
  const time = new Date(message.createdAt).toLocaleDateString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const avatarColor = message.from === "alice" ? "#7c3aed" : "#0ea5e9";
  const bg = message.from === "alice" ? "#f3e8ff" : "#dff8ff";

    const Avatar = (
    <div className="avatar" style={{ background: avatarColor }}>
      {message.from[0].toUpperCase()}
    </div>
  );

  return (
    <div className={`message ${mine ? "mine" : ""}`}>
      <p className="firstLetterBox"></p>
      <div className="messageRow">
        <p className="message">mesaj</p>
        <p className="time">{time}</p>
      </div>
    </div>
  );
};

export default Message;
