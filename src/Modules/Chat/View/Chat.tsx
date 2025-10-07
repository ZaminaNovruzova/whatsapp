import { CiCamera, CiVideoOn } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { GrMicrophone } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";
import MessagesList from "../../../components/MessagesList";
import { useEffect, useMemo, useState } from "react";
import Login from "../../Auth/View/Login";
import type { Message } from "../Models/messageTypes";
import Message from "../../../components/Message";

const LS_KEY = "two_user_messages_v1";
function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  } catch {
    return [];
  }
}
function saveMessages(arr: Message[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

const Chat = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(() =>
    localStorage.getItem("currentUser")
  );
  const [messages, setMessages] = useState<Message[]>(() => loadMessages());
  const [text, setText] = useState("");

  useEffect(() => {
    saveMessages(messages);
    localStorage.setItem(
      "two_user_messages_v1_updated_at",
      new Date().toISOString()
    );
  }, [messages]);

  function handleLogin(id: string) {
    setCurrentUser(id);
  }
  function logout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }
  const me = currentUser as "alice" | "bob";
  const other = me === "alice" ? "bob" : "alice";

  const sorted = useMemo(
    () => [...messages].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [messages]
  );

  return (
    <div className="chatPage">
      <header className="header">
        <div className="leftSide">
          <div className="goToAllMessages">
            <FaArrowLeft />
            <span>6</span>
          </div>
          <div className="profileDetails">
            <div className="userProfilePhoto">
              <img
                src="src/assets/images/fotor-ai-20241209113950.jpg"
                alt="photo"
              />
            </div>
            <h4 className="userProfileName">Elşən</h4>
          </div>
        </div>
        <div className="rightSide">
          <CiVideoOn />
          <IoCallOutline />
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <main>
        <section className="messages">
          <div className="container">
            <div className="row">
              <MessagesList messages={sorted} me={me} />{" "}
            </div>
          </div>
        </section>
      </main>
      <footer className="sendMessages">
        <div>+</div>
        <input type="text" className="text" placeholder="Write a message..." />
        <button>Send</button>
        <CiCamera />
        <GrMicrophone />
      </footer>
    </div>
  );
};

export default Chat;
