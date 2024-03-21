import { useState } from "react";
import { Link } from "react-router-dom";
import ModalLogout from "../Modal/ModalLogout";

export default function Menu(show, setShow) {
  const [showLogout, setShowLogout] = useState(false);

  const modalShow = () => {
    setShow(false);
    setShowLogout(!showLogout);
    // Splitcing token and username
    // let authentication = localStorage.getItem("authentication");
    // const auth = authentication.split(",");
    // console.log(auth[1]);
  };

  const showMenu = () => {
    setShow(!show);
  };

  return (
    <div>
      <ModalLogout setShow={setShowLogout} show={showLogout} />
      {show ? (
        <div
          className="fixed w-4/4 sm:w-3/4 md:2/4 lg:w-1/4  bottom-[60px]"
          id="menu"
        >
          <div className="grid grid-cols-2 text-[10px] font-bold divide-x rounded-md shadow-md md:text-xs bg-light-primary divide-slate-400 h-80 text-slate-500">
            <ul className="flex flex-col gap-3 px-5 py-6">
              <li>
                <Link
                  to="/mapel"
                  className="flex flex-row items-center gap-x-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-cyan-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Jadwal Mapel
                </Link>
              </li>
              <li>
                <Link
                  to="/jadwal-ujian"
                  className="flex flex-row items-center gap-x-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  Jadwal Ujian
                </Link>
              </li>
              <li>
                <Link
                  to="/laporan"
                  className="flex flex-row items-center gap-x-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-orange-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Hasil Laporan
                </Link>
              </li>
              <li>
                <Link to="" className="flex flex-row items-center gap-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-lime-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Info
                </Link>
              </li>
              <li></li>
            </ul>
            <div className="flex flex-col ">
              <ul className="flex flex-col gap-3 px-5 py-6"></ul>
              <ul className="flex flex-col justify-end h-full px-5 py-6 gap-y-3">
                <li>
                  <Link
                    className="flex items-center fexl-row gap-x-3"
                    to="/profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Ubah Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="flex flex-row items-center text-xs font-bold gap-x-3 text-slate-500"
                    onClick={modalShow}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-rose-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="fixed bottom-0 w-full bg-light-primary">
        <div className="flex flex-row items-center justify-between p-2 text-sm font-bold border-t border-b-0 shadow-md text-slate-500">
          <button
            className="w-10 h-10 p-1 transition duration-75 border rounded-full shadow-md shadow-slate-500 border-slate-100 hover:ring hover:ring-sky-200 "
            onClick={showMenu}
          >
            <img
              src="https://seeklogo.com/images/D/Departemen_Pendidikan_Nasional-logo-E2BD667284-seeklogo.com.png"
              alt="logo"
              className="w-8 rounded-full"
            />
          </button>
          <div id="time" className="hidden md:block"></div>
          <p>Hello, Bayu Wardana. Selamat Datang!</p>
        </div>
      </div>
    </div>
  );
}
