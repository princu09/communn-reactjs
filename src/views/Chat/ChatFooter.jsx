import Cookies from "js-cookie";
import React, { useState } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import { ArrowRight, Share, Smile } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage as NewMessage } from "../../redux/reducer/Message";
import { handleLastMessage } from "../../redux/reducer/Chat";

const ChatFooter = ({ setNewMessage }) => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { currentChat } = useSelector((state) => state.chatReducer);

  const sendMessage = () => {
    dispatch(
      NewMessage({
        content: message,
        chatId: currentChat._id,
        myId: Cookies.get("refreshToken"),
      })
    );

    dispatch(
      handleLastMessage({
        chatId: currentChat._id,
        content: message,
        createdAt: new Date(),
      })
    );
    setNewMessage(true);
  };

  const handleClick = () => {
    sendMessage();
    setMessage("");
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
      setMessage("");
    }
  };

  return (
    <footer className="chat-footer">
      <Dropdown>
        <Dropdown.Toggle
          variant="flush-dark"
          className="btn-icon btn-rounded flush-soft-hover no-caret flex-shrink-0"
        >
          <span className="icon">
            <span className="feather-icon">
              <Share />
            </span>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <div className="d-flex align-items-center">
              <div className="avatar avatar-icon avatar-xs avatar-soft-primary avatar-rounded me-3">
                <span className="initial-wrap">
                  <i className="ri-image-line" />
                </span>
              </div>
              <div>
                <span className="h6 mb-0">Photo or Video Library</span>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div className="d-flex align-items-center">
              <div className="avatar avatar-icon avatar-xs avatar-soft-info avatar-rounded me-3">
                <span className="initial-wrap">
                  <i className="ri-file-4-line" />
                </span>
              </div>
              <div>
                <span className="h6 mb-0">Documents</span>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div className="d-flex align-items-center">
              <div className="avatar avatar-icon avatar-xs avatar-soft-success avatar-rounded me-3">
                <span className="initial-wrap">
                  <i className="ri-map-pin-line" />
                </span>
              </div>
              <div>
                <span className="h6 mb-0">Location</span>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div className="d-flex align-items-center">
              <div className="avatar avatar-icon avatar-xs avatar-soft-blue avatar-rounded me-3">
                <span className="initial-wrap">
                  <i className="ri-contacts-line" />
                </span>
              </div>
              <div>
                <span className="h6 mb-0">Contact</span>
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <InputGroup>
        <span className="input-affix-wrapper">
          <Form.Control
            type="text"
            id="input_msg_send_chatapp"
            name="send-msg"
            className="input-msg-send rounded-input"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <span className="input-suffix">
            <Button
              variant="flush-primary"
              className="btn-icon btn-rounded btn-send"
            >
              <span className="icon" onClick={handleClick}>
                <span className="feather-icon">
                  <ArrowRight />
                </span>
              </span>
            </Button>
          </span>
        </span>
      </InputGroup>
      <Button
        variant="flush-dark"
        className="btn-icon btn-rounded flush-soft-hover"
      >
        <span className="icon">
          <span className="feather-icon">
            <Smile />
          </span>
        </span>
      </Button>
    </footer>
  );
};

export default ChatFooter;
