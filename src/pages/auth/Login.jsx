import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Login() {
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [user, setuser] = useState(false);

  const data = { username: nis, password };

  const onHandlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      let response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(response);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (response.status === 400) {
          setMessage(response.message);
          setTimeout(() => {
            setMessage("");
          }, 8000);
        }
        if (response.status === 401) {
          setError(response.message);
          setTimeout(() => {
            setError("");
          }, 8000);
        }
        var date = new Date();
        date.setTime(date.getTime() + 60 * 60 * 1000);
        Cookies.set(
          "authentication",
          [response.token, response.user.no_induk],
          { expires: date }
        );

        setuser(response.user);
        console.log(response);
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };

  const showPassword = () => {
    setShow(!show);
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="flex flex-col md:flex-row h-screen bg-primary ">
        <div className="md:w-3/5 md:flex hidden bg-white shadow-md h-full md:justify-center md:items-center">
          <img
            src="/assets/images/svg/studying.svg"
            alt="bg"
            className="w-2/3"
          />
        </div>

        <div className="md:w-2/5 w-full h-screen flex flex-col gap-y-5 justify-center items-center ">
          <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
            <img
              src="/assets/images/png/logo-pendidikan.png"
              alt="logo"
              className="w-12 h-12 text-center block"
            />
          </div>
          <h1 className="text-white font-extrabold text-2xl">
            Sistem Informasi Siswa
          </h1>
          {error ? (
            <div className="py-3 flex justify-center items-center rounded-md shadow-md bg-slate-100 px-5">
              <p className="text-sm font-bold text-rose-400 animate-pulse">
                {error}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="md:p-10 p-5 bg-white rounded-md shadow-md px-5">
            <form onSubmit={onHandlerSubmit} className="flex flex-col gap-y-5 ">
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="nis"
                  className="text-base font-normal text-slate-500"
                >
                  No.Induk
                </label>
                <input
                  type="text"
                  onChange={(e) => setNis(e.target.value)}
                  className="border border-blue-500 rounded-md shadow-md outline-none py-1.5 px-4 hover:ring hover:ring-blue-300"
                />
                {message.username ? (
                  <p className="text-red-500 text-xs">{message.username}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="nis"
                  className="text-base font-normal text-slate-500"
                >
                  Password
                </label>
                <div className="relative flex flex-col py-2 gap-y-2">
                  <input
                    type={show ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-blue-500 rounded-md shadow-md outline-none py-1.5 px-4 hover:ring hover:ring-blue-300"
                  />
                  <div
                    onClick={showPassword}
                    className="absolute px-2 bg-white outline-none cursor-pointer right-2 bottom-4"
                  >
                    {show ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-cyan-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-cyan-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {message.password ? (
                  <p className="text-red-500 text-xs">{message.password}</p>
                ) : (
                  ""
                )}
              </div>
              <button
                type="submit"
                className="p-2 text-base font-bold text-white transition duration-200 rounded-full shadow-md outline-none bg-cyan-500 hover:ring hover:ring-cyan-300 hover:bg-white hover:text-cyan-500"
              >
                {loading ? (
                  <div className="flex flex-row items-center justify-center gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 animate-spin"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
