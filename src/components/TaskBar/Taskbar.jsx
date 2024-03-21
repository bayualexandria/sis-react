import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";

function Taskbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [siswa, setSiswa] = useState([]);

  const getUserData = async () => {
    let authentication = Cookies.get("authentication");
    const auth = authentication.split(",");
    try {
      let response = await fetch(`http://localhost:8080/api/user/${auth[1]}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "4lex@ndr!413 " + auth[0],
        },
      })
        .then((res) => res.json())
        .then((res) => res.data);
      if (response.message === "Token tidak valid") {
        localStorage.removeItem("authentication");
        return (location.href = "/");
      }
      Cookies.set("kelas", response.kelas_id);
      setSiswa(response);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const menuShow = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <Menu show={showMenu} setShow={setShowMenu} />
      <footer className="fixed bottom-0 w-full bg-light-primary">
        <div className="flex flex-row items-center justify-between p-2 text-sm font-bold border-t border-b-0 shadow-md text-slate-500">
          <button
            className={`${
              showMenu ? "ring ring-sky-200 bg-sky-400" : ""
            } w-10 h-10 p-1 transition duration-75 border rounded-full shadow-md shadow-slate-500 border-slate-100 hover:ring hover:ring-sky-200`}
            onClick={menuShow}
          >
            <img
              src="https://seeklogo.com/images/D/Departemen_Pendidikan_Nasional-logo-E2BD667284-seeklogo.com.png"
              alt="logo"
              className="w-8 rounded-full"
            />
          </button>
          <div id="time" className="hidden md:block"></div>
          <p>Hello, {siswa.nama} Selamat Datang!</p>
        </div>
      </footer>
    </>
  );
}

export default Taskbar;
