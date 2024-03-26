import React, { useCallback, useEffect, useState } from "react";
import { FetchAllUsers } from "../../service/UserService";
import ReactPaginate from "react-paginate";
import { deleteUser } from "../../service/UserService";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
function Users(props) {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(6);
  const [totalPages, setTotalPage] = useState(0);
  const [isShowModalDelete, setShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [isShowModalUser, setShowModalUser] = useState(false);
  useEffect(() => {
    fetchUser();
  }, [currentPage]);

  const fetchUser = async () => {
    let res = await FetchAllUsers(currentPage, currentLimit);

    if (res && res.data && res.data.EC === 0) {
      setTotalPage(res.data.DT.totalPages);
      setListUsers(res.data.DT.users);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteUser = async (user) => {
    setDataModal(user);
    setShowModalDelete(!isShowModalDelete);
  };

  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataModal);
    if (res && res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      await fetchUser();
    } else {
      toast.error(res.data.EM);
    }
  };
  const toggleShowModal = () => {
    setDataModal({});
    setShowModalDelete(!isShowModalDelete);
  };

  const toggleShowModalUser = () => {
    setShowModalUser(!isShowModalUser);
  };
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title">
              <h3>Table users</h3>
            </div>
            <div className="actions my-3">
              <button className="btn btn-success mx-3">Refresh</button>
              <button
                className="btn btn-primary"
                onClick={() => toggleShowModalUser()}
              >
                {" "}
                Add new user
              </button>
            </div>
          </div>

          <div className="user-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group</th>
                  <th scope="col">Actions</th>
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
                          <td>
                            <button className="btn btn-warning mx-3">
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteUser(item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not found User!</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="user-footer">
            {totalPages > 0 && (
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        toggleShowModal={toggleShowModal}
        dataModal={dataModal}
        confirmDeleteUser={confirmDeleteUser}
      ></ModalDelete>
      <ModalUser show={isShowModalUser} title="Create new user!"></ModalUser>
    </>
  );
}

export default Users;
