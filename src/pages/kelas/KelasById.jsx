import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Main from "../../components/Main/Main";
import Cookies from "js-cookie";
import repositori from "../../utils/repositories";
import repoimages from "../../utils/repoimages";
import ShowDataSiswa from "./modal/ShowDataSiswa";

function KelasById() {
  const { nip, id } = useParams();
  const dataToken = Cookies.get("authentication");
  const token = dataToken.split(",");
  const [kelas, setKelas] = useState([]);
  const [guru, setGuru] = useState([]);

  const getDataKelasById = async () => {
    try {
      let response = await fetch(`${repositori}kelas/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token[0],
        },
      }).then((res) => res.json());
      // console.log("kelas hello", response.data);
      setKelas(response.data);
    } catch (error) {}
  };



  useEffect(() => {
    getDataKelasById();
  }, []);


  const dataGuru = async () => {
    try {
      let response = await fetch(`${repositori}guru/${nip}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token[0],
        },
      }).then((res) => res.json());
      setGuru(response.data);
      // console.log("guru", nip);
    } catch (error) {}
  };

  useEffect(() => {
    getDataKelasById();
    
    dataGuru();
  }, []);

  return (
    <Main>
      <div className="grid grid-cols-6 bg-slate-100">
        <div className="col-span-5 col-start-2 p-5 overflow-y-auto">
          <div className="flex justify-start py-4">
            <h4 className="font-bold text-xl text-slate-500">
              Data Kelas {kelas.kelas}|{kelas.jurusan}
            </h4>
          </div>
         
         <ShowDataSiswa />
          <div className="flex flex-col md:flex-row gap-12 pt-8 h-auto">
            <div className="w-full md:w-2/6">
              <div className="rounded-md shadow-md p-10 bg-white flex flex-col gap-5">
                <h1 className="text-xl font-bold text-slate-500 text-center">
                  Data Wali Kelas {kelas.kelas}|{kelas.jurusan}
                </h1>
                <div className="flex flex-col text-center justify-center items-center">
                  <div className="w-36 h-36 rounded-full shadow-md border-2 border-slate-600 items-center overflow-hidden">
                    <img
                      src={repoimages + guru.image_profile}
                      alt="profile"
                      className="w-36 h-36 rounded-full shadow-md"
                    />
                  </div>
                  <h1 className="text-base font-bold text-slate-500 text-center">
                    {guru.nama}
                  </h1>
                  <h4 className="text-sm font-thin text-slate-500 text-center">
                    {guru.nip}
                  </h4>
                  <div className="flex flex-row">
                    <p>{}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/5">
              <div className="rounded-md shadow-md p-10 bg-white flex flex-col gap-5"></div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default KelasById;
