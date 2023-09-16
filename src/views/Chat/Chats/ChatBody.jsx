import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Spinner } from "react-bootstrap";
import { CornerUpRight, MoreHorizontal } from "react-feather";
import SimpleBar from "simplebar-react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, getAllMessage } from "../../../redux/reducer/Message";
import moment from "moment";

const ChatBody = ({ newMessage, setNewMessage }) => {
  const avatar = "https://via.placeholder.com/150";

  const { currentChat } = useSelector((state) => state.chatReducer);
  const { data: messages, pagination } = useSelector(
    (state) => state.messageReducer
  );

  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [goToBottom, setGoToBottom] = useState(false);
  // 👇️ scroll to bottom every time messages change
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  let currentDate = null; // Initialize currentDate to keep track of date changes

  useEffect(() => {
    setPageNo(1);
    setGoToBottom(true);
    dispatch(clearMessages());
  }, [currentChat]);

  useEffect(() => {
    if (currentChat?._id) {
      dispatch(
        getAllMessage({
          chatId: currentChat._id,
          pageNo,
        })
      );
      setIsLoading(false);
    }
  }, [currentChat, pageNo]);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;

    if (scrollTop === 0 && pagination?.hasNextPage) {
      setIsLoading(true);
      setTimeout(() => {
        setPageNo(pageNo + 1);
      }, 2000);
    }
  };

  useEffect(() => {
    if (bottomRef.current && goToBottom) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      setGoToBottom(false);
    }

    if (newMessage) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      setNewMessage(false);
    }
  }, [messages, newMessage]);

  return (
    <SimpleBar
      style={{ height: "100%" }}
      id="chat_body"
      className="chat-body"
      onScrollCapture={handleScroll}
    >
      <ul
        id="dummy_avatar"
        className="list-unstyled chat-single-list"
        ref={topRef}
      >
        {isLoading && (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {messages?.map((message, index) => {
          const messageDate = moment(message.createdAt);
          let dateLine = null;

          if (!currentDate || !messageDate.isSame(currentDate, "day")) {
            // If currentDate is not set or messageDate is different, display date line
            if (messageDate.isSame(moment(), "day")) {
              dateLine = "Today";
            } else if (
              messageDate.isSame(moment().subtract(1, "days"), "day")
            ) {
              dateLine = "Yesterday";
            } else {
              dateLine = messageDate.format("MMM D, YYYY"); // Display full date
            }
            currentDate = messageDate; // Update currentDate
          }

          return (
            <>
              {dateLine && (
                <li className="day-sep">
                  <span>{dateLine}</span>
                </li>
              )}
              {message.sendByMe ? (
                <li className="media sent" key={index}>
                  <div className="media-body">
                    <div className="msg-box">
                      <div>
                        <p>{message?.content}</p>
                        <span className="chat-time">
                          {moment(message?.createdAt).format("hh:mm A")}
                        </span>
                      </div>
                      <div className="msg-action">
                        <Button className="btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret">
                          <span className="icon">
                            <span className="feather-icon">
                              <CornerUpRight />
                            </span>
                          </span>
                        </Button>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="flush-dark"
                            className="btn-icon btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          >
                            <span className="icon">
                              <span className="feather-icon">
                                <MoreHorizontal />
                              </span>
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item href="#forward">
                              Forward
                            </Dropdown.Item>
                            <Dropdown.Item href="#copy">Copy</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li className="media received" key={index}>
                  <div className="media-body">
                    <div className="msg-box">
                      <div>
                        <p>{message?.content}</p>
                        <span className="chat-time">10:52 PM</span>
                      </div>
                      <div className="msg-action">
                        <Button className="btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret">
                          <span className="icon">
                            <span className="feather-icon">
                              <CornerUpRight />
                            </span>
                          </span>
                        </Button>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="flush-dark"
                            className="btn-icon btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          >
                            <span className="icon">
                              <span className="feather-icon">
                                <MoreHorizontal />
                              </span>
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item href="#forward">
                              Forward
                            </Dropdown.Item>
                            <Dropdown.Item href="#copy">Copy</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </>
          );
        })}
      </ul>
      <div ref={bottomRef} />
    </SimpleBar>
  );
};

export default ChatBody;
