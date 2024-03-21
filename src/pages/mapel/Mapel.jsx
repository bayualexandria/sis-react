import { useState, useEffect } from "react";
import Taskbar from "../../components/TaskBar/Taskbar";
import Watermark from "../../components/Watermark";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
function Mapel() {
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
    } catch (error) {
      return error
    }
  };

  useEffect(() => {
    getMapel();
    // const dataSenin = mapel.filter((s) => s.hari === "Senin");
  }, []);

  return (
    <div>
      <Watermark />
      <div className="absolute w-full md:px-10 md:pt-5 md:pb-20 p-2 h-[90vh] md:h-full">
        <div className="relative md:w-1/2 w-full rounded-lg shadow-md  bg-primary/80 px-2 py-10 md:px-5 md:py-20 h-full text-white">
          <div className="absolute top-1 right-1 md:top-3 md:right-3">
            <Link
              to="/"
              className="w-5 h-5 rounded-full shadow-md flex justify-center items-center bg-light-primary text-white hover:ring hover:ring-light-primary hover:bg-white hover:text-light-primary transition duration-200"
            >
              <p className="font-bold text-sm">x</p>
            </Link>
          </div>
          <h1 className="text-white font-bold text-2xl text-center">
            Jadwal Mata Pelajaran
          </h1>
          <div className="px-5 py-5 h-full w-full relative overflow-x-scroll overflow-y-scroll md:overflow-x-hidden">
            <div className="border rounded-lg boder-slate-300 overflow-hidden">
              <table className="w-full divide-y divide-gray-300 table-auto h-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="md:px-3 md:py-[10px] text-sm text-gray-500 text-center">
                      Hari
                    </th>
                    <th className="md:px-3 md:py-[10px] text-sm text-gray-500 text-center">
                      Waktu
                    </th>
                    <th className="md:px-3 md:py-[10px] text-sm text-gray-500 text-center">
                      Mapel
                    </th>
                    <th className="md:px-3 md:py-[10px] text-sm text-gray-500 text-center">
                      Pengampu
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-scroll bg-white divide-y divide-gray-300 ">
                  {mapel.map((m) => {
                    return (
                      <tr key={m.id}>
                        <td className="md:px-3 md:py-[10px]">
                          <div className="text-sm text-center text-gray-500">
                            {m.hari}
                          </div>
                        </td>
                        <td className="md:px-3 md:py-[10px]">
                          <div className="text-sm text-center text-gray-500">
                            {m.waktu}
                          </div>
                        </td>
                        <td className="md:px-3 md:py-[10px]">
                          <div className="text-sm text-center text-gray-500">
                            {m.nama_mapel}
                          </div>
                        </td>
                        <td className="md:px-3 md:py-[10px]">
                          <div className="text-sm text-center text-gray-500">
                            {m.nama}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex py-2 items-center">
              {/* <PDFDownloadLink document={<PDFFile />} fileName="Doc">
                Download
              </PDFDownloadLink> */}
              <Link
                to="/jadwal-mapel"
                target="_blank"
                className="flex flex-row items-center  text-white gap-x-1 transition duration-200 hover:text-cyan-200 "
              >
                Download
                <ArrowDownCircleIcon className="w-6 h-6 " />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Taskbar />
    </div>
  );
}

export default Mapel;
