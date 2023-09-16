import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import SimpleBar from "simplebar-react";
//Images
import avatar2 from "../../assets/dist/img/avatar2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/reducer/Users";

const InvitePeopleModal = ({ show, onClose }) => {
  const dispatch = useDispatch();

  const [Search, setSearch] = useState("");

  const { data } = useSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(
      getUsers({
        search: Search,
      })
    );
  }, [dispatch, Search]);

  return (
    <Modal show={show} onHide={onClose} centered dialogClassName="mw-400p">
      <Modal.Header className="header-wth-bg-inv">
        <Modal.Title as="h5">Invite People</Modal.Title>
        <Button bsPrefix="btn-close" className="text-white" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Form className="m-3" role="search">
          <Form.Control
            type="text"
            className="rounded-input user-search"
            placeholder="Search People"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
        <div className="h-350p">
          <SimpleBar style={{ height: "100%" }} className="nicescroll-bar">
            <ul className="invite-user-list">
              {data?.map((user) => (
                <li
                  key={user._id}
                  onClick={() => {
                    alert(user._id);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div className="media d-flex align-items-center">
                    <div className="media-head me-3">
                      <div className="avatar avatar-sm avatar-rounded">
                        <img
                          src={user?.image}
                          alt="user"
                          className="avatar-img"
                        />
                      </div>
                    </div>
                    <div className="media-body">
                      <div className="user-name">
                        {user?.first_name + " " + user?.last_name}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </SimpleBar>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InvitePeopleModal;
