import { useEffect, useState } from "react";
import Watermark from "../../components/Watermark";
import Taskbar from "../../components/TaskBar/Taskbar";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import Cookies from "js-cookie";

export default function Ujian() {
  const [mapel, setMapel] = useState([]);

  const getMapel = async () => {
    let authentication = Cookies.get("authentication");
    const auth = authentication.split(",");
    let kelas = Cookies.get("kelas");
    try {
      let response = await axios
        .get(`http://localhost:8080/api/mapel/${kelas}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "4lex@ndr!413 " + auth[0],
          },
        })
        .then((res) => res.data);
      setMapel(response.data);
      console.log(response.data);
    } catch (error) {
      return error
    }
  };

  useEffect(() => {
    getMapel();
  }, []);

  return (
    <div>
      <Watermark />
      <div className="absolute w-full md:px-10 md:pt-5 md:pb-20 p-2 h-[90vh] md:h-full">
        <div className="relative w-full rounded-lg shadow-md  bg-primary/80 px-2 py-10 md:px-5 md:py-20 h-full text-white">
          <div className="absolute top-1 right-1 md:top-3 md:right-3">
            <Link
              to="/"
              className="w-5 h-5 rounded-full shadow-md flex justify-center items-center bg-light-primary text-white hover:ring hover:ring-light-primary hover:bg-white hover:text-light-primary transition duration-200"
            >
              <p className="font-bold text-sm">x</p>
            </Link>
          </div>
          <h1 className="text-white font-bold text-2xl text-center mb-5">
            Jadwal Ujian Sekolah
          </h1>
          <div className="flex flex-row gap-3 justify-center">
            {mapel.map((m) => {
              return (
                <div className="rounded-md shadow-md bg-white text-black p-5" key={m.id}>
                  <div className="flex flex-row">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-base font-bold text-slate-500">
                        {m.nama_mapel}
                      </h1>
                     
                      <div className="flex flex-row">
                        <CalendarIcon className="text-slate-500 text-sm font-bold w-4" />
                        <p className="text-sm text-slate-500">{m.hari}</p>
                      </div>
                      <div className="flex flex-row">
                        <ClockIcon className="text-slate-500 text-sm font-bold w-4" />
                        <p className="text-sm text-slate-500">{m.waktu}</p>
                      </div>
                      <PlayCircleIcon className="text-red-500 font-bold w-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Taskbar />
    </div>
  );
}
