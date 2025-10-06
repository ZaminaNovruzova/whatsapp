import { CiVideoOn } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";

const Messages = () => {
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
              <img src="" alt="profile-photo" />
            </div>
            <h4 className="userProfileName">Elşən</h4>
          </div>
        </div>
        <div className="rightSide">
          <CiVideoOn />
          <IoCallOutline />
        </div>
      </header>
      <main>
        <section className="messages">
          <div className="container">
            <div className="row">
              burda mesajlar olacaq message list co=omponentinden gelecek
            </div>
          </div>
        </section>
      </main>
      <footer className="SendMessages">
        <div className="modalWindow"></div>
        <input type="text" className="text" />
        <div className="camera"></div>
        <div className="audio"></div>
      </footer>
    </div>
  );
};

export default Messages;
