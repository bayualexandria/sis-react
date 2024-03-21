import Watermark from "../../components/Watermark";
import Taskbar from "../../components/TaskBar/Taskbar";
import { Link } from "react-router-dom";

function Laporan() {
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
          <div className="flex flex-col md:flex-row justify-center items-center w-full h-full gap-y-5 md:gap-x-10">
            <div className="flex flex-col justify-center items-center gap-y-5">
              <div className="md:w-32 w-20 h-20 md:h-32 rounded-md shadow-md bg-lime-500"></div>
              <p className="text-base font-bold text-white">Laporan Nilai</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-y-5">
              <div className="md:w-32 w-20 h-20 md:h-32 rounded-md shadow-md bg-rose-500"></div>
              <p className="text-base font-bold text-white">Laporan </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-y-5">
              <div className="md:w-32 w-20 h-20 md:h-32 rounded-md shadow-md bg-cyan-500"></div>
              <p className="text-base font-bold text-white">Laporan Nilai</p>
            </div>
          </div>
        </div>
      </div>
      <Taskbar />
    </div>
  );
}

export default Laporan;
