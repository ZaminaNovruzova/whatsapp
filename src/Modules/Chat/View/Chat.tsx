import { CiCamera, CiVideoOn } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { GrMicrophone } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";
import Login from "../../Auth/View/Login";
import { useEffect, useMemo, useState } from "react";
import type { IMessage } from "../Models/messageTypes";
import { uid } from "../../../utils/randomID";
import {
  loadMessages,
  LS_KEY,
  saveMessages,
} from "../../../utils/localStorage";
import MessagesList from "../../../components/MessagesList";

const Chat = () => {
  //*login olan user
  const [currentUser, setCurrentUser] = useState<string | null>(() =>
    localStorage.getItem("currentUser")
  );

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>(() => loadMessages());

  useEffect(() => {
    saveMessages(messages);
    localStorage.setItem(
      "two_user_messages_v1_updated_at",
      new Date().toISOString()
    );
  }, [messages]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === LS_KEY || e.key === "two_user_messages_v1_updated_at") {
        setMessages(loadMessages());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const sorted = useMemo(
    () => [...messages].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [messages]
  );

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

  //*current user alice dirse other  bob kimi teyin etsin 
  const me = currentUser as "alice" | "bob"; 
  const other = me === "alice" ? "bob" : "alice";

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const msg: IMessage = {
      id: uid(),
      from: me,
      to: other,
      text: trimmed,
      createdAt: new Date().toISOString(),
    };
    setMessages((s) => [...s, msg]);
    setText("");
  }

  return (
    <div className="chatPage">
      <header className="header">
        <div className="leftSide">
          <div className="goToAllMessages">
            {/* <FaArrowLeft />
            <span></span> */}
          </div>
          <div className="profileDetails">
            <div className="userProfilePhoto">
              {/* <img
                src="src/assets/images/fotor-ai-20241209113950.jpg"
                alt="photo"
              /> */}
            </div>
            <h4 className="userProfileName">{other}</h4>
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
              <MessagesList messages={sorted} me={me} />
            </div>
          </div>
        </section>
      </main>
      <footer className="sendMessages">
        <div>+</div>
        <input
          type="text"
          className="text"
          placeholder="Write a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button onClick={send}>Send</button>
        <CiCamera />
        <GrMicrophone />
      </footer>
    </div>
  );
};

export default Chat;
