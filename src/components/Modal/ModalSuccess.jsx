import { CheckCircleIcon } from "@heroicons/react/24/solid";

function ModalSuccess(show) {
  const buttonSuccess = () => {
    return (location.href = "/");
  };
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } flex flex-row items-center justify-center h-screen bg-slate-300/40 w-full absolute`}
    >
      <div className="md:w-1/4 w-full p-5 transition duration-200 transform bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center gap-3">
          <CheckCircleIcon className="w-14 h-14 text-lime-500 font-bold animate-bounce" />
          <p className="text-base font-bold text-lime-500">Data Berhasil diubah</p>
          <button
            className="px-2 py-0.5 rounded-md text-lime-500 gb-white border border-1 border-lime-500 text-sm font-bold hover:border-none hover:ring hover:ring-lime-300 hover:text-white transition duration-200 hover:bg-lime-500"
            onClick={buttonSuccess}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccess;
