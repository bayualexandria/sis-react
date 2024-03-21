import { useState, useEffect } from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import Cookies from "js-cookie";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: "20px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  view: {
    width: "100%",
    height: "94vh",
  },
  image: {
    width: "60px",
    height: "50px",
  },
  hidden: {
    color: "white",
  },
  textHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "center",
    width: "100%",
  },
  textHeadeTitle: {
    fontSize: "15px",
    fontWeight: "extrabold",
  },
  textHeaderAddress: {
    fontSize: "11px",
    fontWeight: "extrabold",
  },
  telp: {
    fontSize: "11px",
    fontWeight: "extrabold",
    marginVertical: "-5px",
  },
  borderHorizontal: {
    marginTop: "10px",
    border: "1px",
    borderColor: "black",
    width: "100%",
    height: "0px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  titleClass: {
    fontSize: "14px",
    fontWeight: "heavy",
    marginTop: "40px",
    textAlign: "center",
  },
  date: {
    fontSize: "10px",
    fontWeight: "bold",
    textAlign: "right",
    marginTop: "20px",
    marginRight: "50px",
  },
  textHari: {
    marginBottom: "10px",
    marginTop: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableRowHeader: {
    margin: "auto",
    flexDirection: "row",
    backgroundColor: "silver",
  },
  tableColNumber: {
    width: "7%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "31%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },

  m5: {
    marginTop: "100px",
    marginBottom: "5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  center: {
    textAlign: "center",
    justifyContent: "center",
    width: "25%",
  },
  textName: {
    fontSize: "12px",
  },
  borderNameHorizontal: {
    border: "0.5px",
    borderColor: "black",
    width: "100%",
    height: "0px",
  },
});

function LaporanMapel() {
  // State data
  const [kelas, setKelas] = useState([]);
  const [tanggal, setTanggal] = useState();
  const [bulan, setBulan] = useState();
  const [tahun, setTahun] = useState();
  const [mapel, setMapel] = useState([]);
  const [sekolah, setSekolah] = useState([]);
  // const [filter, setFilter] = useState(mapel);
  const [siswa, setSiswa] = useState([]);

  // Cookie authentication
  let authentication = Cookies.get("authentication");
  const auth = authentication.split(",");
  const kelasId = Cookies.get("kelas");

  const getKelas = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/kelas/${kelasId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "4lex@ndr!413 " + auth[0],
        },
      })
        .then((res) => res.json())
        .then((res) => res.data[0]);
      setKelas(response);
    } catch (error) {
      return error;
    }
  };

  const getMapel = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/mapel/${kelasId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "4lex@ndr!413 " + auth[0],
        },
      })
        .then((res) => res.json())
        .then((res) => res.data);
      setMapel(response);
    } catch (error) {
      return error;
    }
  };

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
      setSiswa(response);
    } catch (error) {
      return error;
    }
  };

  const dataSenin = mapel.find((obj) => {
    return obj.hari === "Senin";
  });
  const dataSelasa = mapel.find((obj) => {
    return obj.hari === "Selasa";
  });
  const dataRabu = mapel.find((obj) => {
    return obj.hari === "Rabu";
  });
  const dataKamis = mapel.find((obj) => {
    return obj.hari === "Kamis";
  });
  const dataJumat = mapel.find((obj) => {
    return obj.hari === "Jumat";
  });

  // Profile Sekolah
  const dataSekolah = async () => {
    try {
      let response = await fetch("http://localhost:8080/api/profile-sekolah", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => res.data);
      setSekolah(response);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getKelas();
    getMapel();
    getUserData();
    dataSekolah();
    // filterDataMapel();
    // mapelHari();
    setTanggal(new Date().getDate());
    var _bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const formatBulan = new Date().getMonth();
    setBulan(_bulan[formatBulan]);
    setTahun(new Date().getFullYear());
  }, []);

  return (
    <PDFViewer style={styles.view}>
      <Document pageMode="fullScreen" title="Hello">
        <Page size="A4" style={styles.page}>
          <div style={styles.header}>
            <Image
              src="/assets/images/png/logo-pendidikan.png"
              style={styles.image}
            />
            <div style={styles.textHeader}>
              <Text style={styles.textHeadeTitle}>Jadwal Mata Pelajaran</Text>
              <Text style={styles.textHeadeTitle}>{sekolah.nama_sekolah}</Text>
              <Text style={styles.textHeaderAddress}>{sekolah.alamat}</Text>
              <Text style={styles.telp}>Telp. {sekolah.no_telp}</Text>
            </div>
            <Text style={styles.hidden}>Hello</Text>
          </div>
          <div style={styles.borderHorizontal}>
            <hr />
          </div>
          <Text style={styles.titleClass}>
            Kelas {kelas.kelas} - {kelas.jurusan}
          </Text>
          <Text style={styles.date}>{`${tanggal}, ${bulan} ${tahun}`}</Text>
          {dataSenin && (
            <div>
              <Text style={styles.textHari}>{dataSenin.hari}</Text>
              <div style={styles.table}>
                <View style={styles.tableRowHeader}>
                  <View style={styles.tableColNumber}>
                    <Text style={styles.tableCell}>#</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Mapel</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Waktu</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Guru Pengampu</Text>
                  </View>
                </View>
                {mapel.map((data, i) => {
                  if (data.hari == "Senin") {
                    return (
                      <View style={styles.tableRow} key={data.id}>
                        <View style={styles.tableColNumber}>
                          <Text style={styles.tableCell}>{i + 1}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {data.nama_mapel}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{data.waktu}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{data.nama}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </div>
            </div>
          )}
          {dataSelasa && (
            <div>
              <Text style={styles.textHari}>{dataSelasa.hari}</Text>
              <div style={styles.table}>
                <View style={styles.tableRowHeader}>
                  <View style={styles.tableColNumber}>
                    <Text style={styles.tableCell}>#</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Mapel</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Waktu</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Guru Pengampu</Text>
                  </View>
                </View>
                {mapel.map((data, i) => {
                  if (data.hari == "Selasa") {
                    return (
                      <View style={styles.tableRow} key={data.id}>
                        <View style={styles.tableColNumber}>
                          <Text style={styles.tableCell}>{i + 1}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {data.nama_mapel}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{data.waktu}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{data.nama}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </div>
            </div>
          )}
          {dataRabu && (
            <div>
              <Text style={styles.textHari}>{dataRabu.hari}</Text>
              <div style={styles.table}>
                <View style={styles.tableRowHeader}>
                  <View style={styles.tableColNumber}>
                    <Text style={styles.tableCell}>#</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Mapel</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Waktu</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Guru Pengampu</Text>
                  </View>
                </View>
                {mapel.map((data, i) => {
                  if (data.hari == "Rabu") {
                    return (
                      <View style={styles.tableRow} key={data.id}>
                        <View style={styles.tableColNumber}>
                          <Text style={styles.tableCell}>{i + 1}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {data.nama_mapel}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{data.waktu}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{data.nama}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </div>
            </div>
          )}
          {dataKamis && (
            <div>
              <Text style={styles.textHari}>{dataKamis.hari}</Text>
              <div style={styles.table}>
                <View style={styles.tableRowHeader}>
                  <View style={styles.tableColNumber}>
                    <Text style={styles.tableCell}>#</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Mapel</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Waktu</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Guru Pengampu</Text>
                  </View>
                </View>
                {mapel.map((data, i) => {
                  if (data.hari == "Kamis") {
                    return (
                      <View style={styles.tableRow} key={data.id}>
                        <View style={styles.tableColNumber}>
                          <Text style={styles.tableCell}>{i + 1}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {data.nama_mapel}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{data.waktu}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{data.nama}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </div>
            </div>
          )}
          {dataJumat && (
            <div>
              <Text style={styles.textHari}>{dataJumat.hari}</Text>
              <div style={styles.table}>
                <View style={styles.tableRowHeader}>
                  <View style={styles.tableColNumber}>
                    <Text style={styles.tableCell}>#</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Mapel</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Waktu</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Guru Pengampu</Text>
                  </View>
                </View>
                {mapel.map((data, i) => {
                  if (data.hari == "Jumat") {
                    return (
                      <View style={styles.tableRow} key={data.id}>
                        <View style={styles.tableColNumber}>
                          <Text style={styles.tableCell}>{i + 1}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {data.nama_mapel}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{data.waktu}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{data.nama}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </div>
            </div>
          )}
          <View style={styles.m5}>
            <View style={styles.center}>
              <Text style={styles.textName}>Wali Kelas</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.textName}>
                {siswa.jenis_kelamin == "Perempuan" ? "Siswi" : "Siswa"}
              </Text>
            </View>
          </View>

          <View style={styles.m5}>
            <View style={styles.center}>
              <Text style={styles.textName}>{kelas.wali_kelas}</Text>
              <div style={styles.borderNameHorizontal}>
                <hr />
              </div>
              <Text style={styles.textName}>{kelas.nip}</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.textName}>{siswa.nama}</Text>
              <div style={styles.borderNameHorizontal}>
                <hr />
              </div>
              <Text style={styles.textName}>{siswa.no_induk}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default LaporanMapel;
