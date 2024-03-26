import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchGroup, createNewUser } from "../../service/UserService";
import { toast } from "react-toastify";
import _ from "lodash";

function ModalUser(props) {
  const [userGroup, setUserGroup] = useState([]);
  const listGender = ["Male", "Female", "Other"];

  const defaultUserData = {
    email: "",
    phoneNumber: "",
    userName: "",
    password: "",
    address: "",
    sex: listGender[0],
    group: "",
  };
  const [userData, setUserData] = useState(defaultUserData);
  const validInputDefault = {
    email: true,
    phoneNumber: true,
    userName: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [validInputs, setValidInputs] = useState(validInputDefault);
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.EC === 0) {
      setUserGroup(res.data.DT);

      if (res.data.DT && res.data.DT.length > 0) {
        let groups = res.data.DT;

        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.data.EM);
    }
  };

  const handleOnchangeInput = (value, name) => {
    //  _.cloneDeep copy lai bien userData
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };
  const checkValidate = () => {
    // create user
    setValidInputs(validInputDefault);
    let array = [
      "email",
      "phoneNumber",
      "userName",
      "password",
      "address",
      "sex",
      "group",
    ];
    let check = true;
    for (let i = 0; i < array.length; i++) {
      if (!userData[array[i]]) {
        let _validInputs = _.cloneDeep(validInputDefault);
        _validInputs[array[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty input ${array[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };
  const handleConfirmUser = async () => {
    let check = checkValidate();
    if (check === true) {
      let res = await createNewUser({
        ...userData,
        groupId: userData["group"],
      });
      if (res.data && res.data.EC === 0) {
        setUserData({
          ...defaultUserData,
          group: userGroup[0].id,
        });
        toast.success(res.data.EM);
        props.toggleShowModalUser();
        props.fetchUser();
      } else {
        toast.error("Error create user...!");
      }
    }
  };
  return (
    <div>
      <Modal size="lg" show={props.show} className="modal-user">
        <Modal.Header closeButton onClick={props.toggleShowModalUser}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address <span className="text-danger">(*)</span>
              </label>
              <input
                className={
                  validInputs.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "email")
                }
              ></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number <span className="text-danger">(*)</span>
              </label>
              <input
                className={
                  validInputs.phoneNumber
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.phoneNumber}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "phoneNumber")
                }
              ></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>User name</label>
              <input
                className={
                  validInputs.userName
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.userName}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "userName")
                }
              ></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password <span className="text-danger">(*)</span>
              </label>
              <input
                className={
                  validInputs.password
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="password"
                value={userData.password}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "password")
                }
              ></input>
            </div>
            <div className="col-12 col-sm-12  form-group">
              <label>Address</label>
              <input
                className={
                  validInputs.address
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.address}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "address")
                }
              ></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender</label>
              <select
                className={
                  validInputs.sex ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "sex")
                }
              >
                {listGender &&
                  listGender.length > 0 &&
                  listGender.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                {/* <option value="Male">Male</option>
                <option vale="Female">Female</option>
                <option value="Other">Other </option> */}
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group <span className="text-danger">(*)</span>
              </label>
              <select
                className={
                  validInputs.group ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "group")
                }
              >
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
          <Button variant="secondary" onClick={props.toggleShowModalUser}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalUser;
