import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchGroup } from "../../service/UserService";
import { toast } from "react-toastify";
function ModalUser(props) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [group, setGroup] = useState("");
  const [userGroup, setUserGroup] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.EC === 0) {
      setUserGroup(res.data.DT);
    } else {
      toast.error(res.data.EM);
    }
  };
  return (
    <div>
      <Modal size="lg" show={props.show} className="modal-user">
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address <span className="text-danger">(*)</span>
              </label>
              <input className="form-control" type="email"></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number <span className="text-danger">(*)</span>
              </label>
              <input className="form-control" type="text"></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>User name</label>
              <input className="form-control" type="text"></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password <span className="text-danger">(*)</span>
              </label>
              <input className="form-control" type="password"></input>
            </div>
            <div className="col-12 col-sm-12  form-group">
              <label>Address</label>
              <input className="form-control" type="text"></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender</label>
              <select className="form-select">
                <option defaultValue="Male">Male</option>
                <option vale="Female">Female</option>
                <option value="Other">Other </option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group <span className="text-danger">(*)</span>
              </label>
              <select className="form-select">
                {userGroup &&
                  userGroup.length > 0 &&
                  userGroup.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalUser;
