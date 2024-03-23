import React, { useEffect, useState } from "react";
import { FetchAllUsers } from "../../service/UserService";
function Users(props) {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let res = await FetchAllUsers();

    if (res && res.data && res.data.EC === 0) {
      setListUsers(res.data.DT);
    }
    console.log("List user", listUsers);
  };

  return (
    <div className="container">
      <div className="manage-users-container">
        <div className="user-header">
          <div className="title">
            <h3>Table users</h3>
          </div>
          <div className="actions">
            <button className="btn btn-success">Refresh</button>
            <button className="btn btn-primary"> Add new user</button>
          </div>
        </div>

        <div className="user-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <td className="fw-bold" scope="col">
                  No
                </td>
                <td className="fw-bold" scope="col">
                  Id
                </td>
                <td className="fw-bold" scope="col">
                  Email
                </td>
                <td className="fw-bold" scope="col">
                  Username
                </td>
                <td className="fw-bold" scope="col">
                  Group
                </td>
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length > 0 ? (
                <>
                  {listUsers.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.Group ? item.Group.name : ""}</td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <span>Not found User!</span>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="user-footer"></div>
      </div>
    </div>
  );
}

export default Users;
