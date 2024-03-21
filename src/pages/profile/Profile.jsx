import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Taskbar from "../../components/TaskBar/Taskbar";
import Watermark from "../../components/Watermark";
import Cookies from "js-cookie";
import axios from "axios";
import { InputText, TextArea, Upload } from "../../components/Form/Index";
import Button from "../../components/Button/Button";
import ModalSuccess from "../../components/Modal/ModalSuccess";

function Profile() {
  const [user, setUser] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

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
      setUser(response);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [loading, setLoading] = useState(false);

  const userUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nama", nama);
    data.append("no_hp", noHp);
    data.append("alamat", alamat);
    data.append("image_profile", image);

    let authentication = Cookies.get("authentication");
    const auth = authentication.split(",");
    setLoading(true);
    setTimeout(() => {
      axios
        .post(`http://localhost:8080/api/user/${auth[1]}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "4lex@ndr!413 " + auth[0],
          },
        })
        .then((res) => res)
        .catch((e) => console.log(e));
      setLoading(false);
      setShowSuccess(true);
    }, 5000);
  };

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <Watermark />
      <div className="absolute w-full md:px-10 md:pt-5 md:pb-20 p-2 h-full">
        <div className="relative md:w-1/2 w-full rounded-lg shadow-md  bg-primary/80 px-2 py-10 md:px-5 md:py-20 h-full text-white">
          <div className="absolute top-1 right-1 md:top-3 md:right-3">
            <Link
              to="/"
              className="w-5 h-5 rounded-full shadow-md flex justify-center items-center bg-light-primary text-white hover:ring hover:ring-light-primary hover:bg-white hover:text-light-primary transition duration-200"
            >
              <p className="font-bold text-sm">x</p>
            </Link>
          </div>

          <form
            onSubmit={userUpdate}
            className="flex flex-col gap-y-2 px-3 scroll-my-2"
          >
            <div className="flex md:flex-row justify-between flex-col">
              <InputText
                label="Nama Lengkap"
                onChange={(e) => setNama(e.target.value)}
                defaultValue={user.nama}
              />
              <InputText
                label="No. Handphone"
                onChange={(e) => setNoHp(e.target.value)}
                defaultValue={user.no_hp}
              />
            </div>
            <Upload
              onChange={(e) => onImageUpload(e)}
              imageProfile={
                imagePreview
                  ? imagePreview
                  : `http://localhost:8080/assets/img/profile/siswa/${user.image_profile}`
              }
            />
            <TextArea
              label="Alamat"
              onChange={(e) => setAlamat(e.target.value)}
              defaultValue={user.alamat}
            />

            <Button
              name={
                loading ? (
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
                  "Ubah profile"
                )
              }
              type="submit"
            />
          </form>
        </div>
      </div>
      <ModalSuccess show={showSuccess} />
      <Taskbar></Taskbar>
    </div>
  );
}

export default Profile;
