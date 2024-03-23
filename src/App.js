import "./App.scss";
import { useEffect, useState } from "react";
import Nav from "./Navigations/Nav";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [account, setAccount] = useState({});

  // hàm useEffect chỉ chạy 1 lần
  useEffect(() => {
    // kiểm tra người dùng đã đăng nhập chưa
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app-header">
          <Nav />
        </div>
        <div className="app-container">
          <AppRoutes />
        </div>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
    </div>
  );
}

export default App;
