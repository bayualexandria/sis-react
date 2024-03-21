import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function ModalLogout(setShow, show ) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(Cookies.get("authentication"));
  const closeModal = () => {
    setShow(false);
  };

  const logout = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      Cookies.remove("authentication");
      setLoading(false);
      setShow(false);
      // return (location.href = "/");
      setUser(Cookies.remove("authentication"));
    }, 5000);
  };
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } flex flex-row items-center justify-center h-screen bg-slate-300/40 absolute w-full`}
    >
      {user == null && <Navigate to="/login" replace={true} />}
      <div className="md:w-1/3 w-full p-5 transition duration-200 transform bg-white rounded-lg shadow-md">
        {loading ? (
          <div className="flex flex-row items-center justify-center gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 animate-spin text-lime-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <p className="text-base font-normal text-slate-700 animate-pulse">
              Loading...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 text-rose-500 animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>

            <h1 className="text-base font-bold text-slate-500 text-center">
              Apakah anda ingin keluar dari sistem
            </h1>
            <div className="flex flex-row px-10 py-5 gap-x-10">
              <button
                onClick={closeModal}
                className="py-1.5 px-6 text-white transition duration-200 rounded-full shadow-md outline-none bg-cyan-500 hover:ring hover:ring-cyan-300 hover:text-cyan-500 hover:bg-white text-sm font-normal"
              >
                Tidak
              </button>
              <button
                onClick={logout}
                className="py-1.5 px-8 text-white transition duration-200 rounded-full shadow-md outline-none bg-rose-500 hover:ring hover:ring-rose-300 hover:text-rose-500 hover:bg-white text-sm font-normal"
              >
                Ya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalLogout;
