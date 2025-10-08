import type { IMessage } from "../Modules/Chat/Models/messageTypes";

const Message = ({ message, mine }: { message: IMessage; mine: boolean }) => {
  const time = new Date(message.createdAt).toLocaleDateString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const avatarColor = message.from === "alice" ? "#7c3aed" : "#0ea5e9";
  const background = message.from === "alice" ? "#f3e8ff" : "#dff8ff";
  const firstLetter = message.from ? message.from[0].toUpperCase() : "";

  return (
    <div
      className={`message ${mine ? "mine" : ""}`}
      style={{ justifyContent: mine ? "flex-end" : "flex-start" }}
    >
      <p className="firstLetterBox" style={{ background: avatarColor }}>
        {firstLetter}
      </p>
      <div className="messageRow" style={{ background: background }}>
        <p className="message">{message.text}</p>
        <p className="time">{time}</p>
      </div>
    </div>
  );
};

export default Message;
