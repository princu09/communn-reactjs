import React, { useEffect, useState } from "react";
import ContactList from "./ContactList";
import ChatBody from "./ChatBody";
import ChatInfo from "./ChatInfo";
import ChatFooter from "../ChatFooter";
import classNames from "classnames";
import InvitePeopleModal from "../InvitePeopleModal";
import ChatHeader from "../ChatHeader";
import { useWindowWidth } from "@react-hook/window-size";
import { useSelector } from "react-redux";
//Redux

const Chats = ({}) => {
  const [showInfo, setShowInfo] = useState(true);
  const [invitePeople, setInvitePeople] = useState(false);

  const windowWidth = useWindowWidth();
  useEffect(() => {
    if (windowWidth <= 1199) {
      setShowInfo(false);
    } else {
      setShowInfo(true);
    }
  }, [windowWidth]);

  const { currentChat } = useSelector((state) => state.chatReducer);

  const [newMessage, setNewMessage] = useState(false);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="hk-pg-body py-0">
      <div
        className={classNames(
          "chatapp-wrap",
          { "chatapp-info-active": showInfo }
          //   { "chatapp-slide": startChating }
        )}
      >
        <div className="chatapp-content">
          <ContactList invitePeople={() => setInvitePeople(!invitePeople)} />
          {currentChat == null ? (
            <div className=""></div>
          ) : (
            <div className="chatapp-single-chat">
              <ChatHeader
                infoState={showInfo}
                infoToggle={() => setShowInfo(!showInfo)}
                invitePeople={() => setInvitePeople(!invitePeople)}
                isTyping={isTyping}
              />
              <ChatBody
                setNewMessage={setNewMessage}
                newMessage={newMessage}
                typing={typing}
                setTyping={setTyping}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
              />
              <ChatFooter setNewMessage={setNewMessage} setTyping={setTyping} />
              <ChatInfo infoToggle={() => setShowInfo(!showInfo)} />
            </div>
          )}
          {/* Invite People */}
          <InvitePeopleModal
            show={invitePeople}
            onClose={() => setInvitePeople(!invitePeople)}
          />
        </div>
      </div>
    </div>
  );
};

export default Chats;
