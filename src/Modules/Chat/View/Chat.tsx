import { CiCamera, CiVideoOn } from "react-icons/ci";
// import { FaArrowLeft } from "react-icons/fa";
import { GrMicrophone } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";
import Login from "../../Auth/View/Login";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IMessage, UserId } from "../Models/messageTypes";
import { uid } from "../../../utils/randomID";
import {
  getConversationMessages,
  loadMessages,
  LS_KEY,
  saveMessages,
} from "../../../utils/localStorage";
import MessagesList from "../../../components/MessagesList";
import { users } from "../../../db/users";
import { useAudioRecorder } from "../../../customHooks/useAudioRecorder";
import { useCameraCapture } from "../../../customHooks/useCameraCapture";

const Chat = () => {
  //*login olan user
  const [currentUser, setCurrentUser] = useState<string | null>(() =>
    localStorage.getItem("currentUser")
  );

  const [otherUser, setOtherUser] = useState<UserId | null>(() => {
    const cu = localStorage.getItem("currentUser");
    if (!cu) return null;
    return (localStorage.getItem(`otherUser_${cu}`) as UserId) || null;
  });

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>(() => loadMessages());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { start, stop, isRecording } = useAudioRecorder(
    async (dataUrl, mimeType) => {
      sendAudioMessage(
        dataUrl,
        `Recording.${mimeType?.split("/")[1] ?? "webm"}`
      );
    }
  );

  const { videoRef, startCamera, takePhoto, stopCamera } = useCameraCapture(
    (dataUrl) => {
      sendPhotoMessage(dataUrl);
    }
  );

  useEffect(() => {
    if (!currentUser) {
      setOtherUser(null);
      return;
    }
    const saved = localStorage.getItem(`otherUser_${currentUser}`);
    setOtherUser((saved as UserId) || null);
  }, [currentUser]);

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

  const conversationMessages = useMemo(() => {
    return getConversationMessages(messages, currentUser, otherUser);
  }, [messages, currentUser, otherUser]);

  function handleLogin(id: string) {
    localStorage.setItem("currentUser", id);
    setCurrentUser(id);
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  function handleSelectOther(value: string) {
    const val = value || null;
    setOtherUser(val);
    if (currentUser) {
      if (val) {
        localStorage.setItem(`otherUser_${currentUser}`, val);
      } else {
        localStorage.removeItem(`otherUser_${currentUser}`);
      }
    }
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (currentUser && otherUser) {
      const msg: IMessage = {
        id: uid(),
        from: currentUser,
        to: otherUser,
        text: trimmed,
        createdAt: new Date().toISOString(),
      };
      setMessages((s) => [...s, msg]);
      setText("");
    }
  }

  function sendAudioMessage(audioDataUrl?: string, audioName?: string) {
    const trimmed = text.trim();
    if (currentUser && otherUser) {
      const msg: IMessage = {
        id: uid(),
        from: currentUser,
        to: otherUser,
        text: trimmed || undefined,
        audio: audioDataUrl,
        audioName: audioName,
        createdAt: new Date().toISOString(),
      };
      setMessages((s) => [...s, msg]);
      setText("");
    }
  }
  function sendFileMessage(dataUrl: string, name: string, type: string) {
    if (!currentUser || !otherUser) return;

    const msg: IMessage = {
      id: uid(),
      from: currentUser,
      to: otherUser,
      createdAt: new Date().toISOString(),
      file: {
        url: dataUrl,
        name,
        type,
      },
    };

    setMessages((s) => [...s, msg]);
  }

  function sendPhotoMessage(photoDataUrl: string) {
    if (currentUser && otherUser) {
      const msg: IMessage = {
        id: uid(),
        from: currentUser,
        to: otherUser,
        text: undefined,
        image: photoDataUrl,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, msg]);
    }
  }

  function clearAll() {
    if (!confirm("Clear all messages?")) return;
    setMessages([]);
  }
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      sendFileMessage(dataUrl, file.name, file.type);
    };
    reader.readAsDataURL(file);
  }

  const otherUserObj = users.find((u) => u.id === otherUser) ?? null;

  if (!otherUserObj) {
    return (
      <div className="chatPage">
        <header className="header">
          <div className="leftSide">
            <div className="chat-select">
              <span>Chat with: </span>
              <select
                value={otherUser ?? ""}
                onChange={(e) => handleSelectOther(e.target.value)}
              >
                <option value="">Select user...</option>
                {users
                  .filter((u) => u.id !== currentUser)
                  .map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="rightSide">
            <button onClick={logout}>Logout</button>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="chatPage">
      <header className="header">
        <div className="leftSide">
          <div className="chat-select">
            <span>Chat with: </span>
            <select
              value={otherUser ?? ""}
              onChange={(e) => handleSelectOther(e.target.value)}
            >
              <option value="">Select user...</option>
              {users
                .filter((u) => u.id !== currentUser)
                .map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="profileDetails">
            <div className="userProfilePhoto">
              <img src={otherUserObj?.image} alt="photo" />
            </div>
            <h4 className="userProfileName">{otherUserObj?.name}</h4>
          </div>
        </div>
        <div className="rightSide">
          <CiVideoOn />
          <IoCallOutline />
          <button onClick={clearAll}>Clear All</button>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <main>
        <section className="messages">
          <div className="container">
            <div className="row">
              <MessagesList messages={conversationMessages} me={currentUser} />
            </div>
          </div>
        </section>
      </main>
      <footer className="sendMessages">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <button onClick={() => fileInputRef.current?.click()}>+</button>
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
        <div>
          {videoRef && (
            <div className="cameraPreview">
              <video ref={videoRef} autoPlay playsInline />
              <button onClick={takePhoto}>📸 Çək</button>
              <button onClick={stopCamera}>❌ Bağla</button>
            </div>
          )}
        </div>
        <CiCamera onClick={startCamera} className="camera" />
        {!isRecording ? (
          <GrMicrophone className="audio" onClick={start} />
        ) : (
          <GrMicrophone
            className="audio"
            onClick={stop}
            style={{ stroke: "red", transform: "scale(1.05)" }}
          />
        )}
      </footer>
    </div>
  );
};

export default Chat;
