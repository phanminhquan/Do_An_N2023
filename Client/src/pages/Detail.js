import cookie from 'react-cookies';
import { useTheme } from '@mui/material/styles';
import GaugeComponent from 'react-gauge-component';
import { Col, Row, Table } from 'react-bootstrap';
import { Flex } from '@chakra-ui/react';
import React, { Component, useContext, useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { set, toInteger } from 'lodash';
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { setGlobalState, useGlobalState } from '..';
import Expired from './Expired';
import Apis, { endpoints } from '../configs/Apis';
import { MyUserContext } from '../App';



const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const indexPage = {
  backgroundColor: '#F0EEEE',
  padding: '10px',
};
const station = {
  display: 'flex',
  justifyContent: 'space-around',
};
const stationBanner = {
  backgroundColor: '#FFFFFF',
  width: '35%',
  height: '100px',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
};
const stationInfor = {
  backgroundColor: '#CCFFFF',
  width: '30%',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  fontSize: '25px',
  alignItems: 'center',
  boxShadow: '5px 5px 10px 0 rgba(0, 0, 0, 0.1)',
};
const styles = {
  headerCell: {
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  dataCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
};
const indexSensor = {
  width: '100%',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const childSensor = {
  width: '25%',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const disable = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="30"
    color="blue"
    fill="currentColor"
    className="bi bi-toggle-off"
    viewBox="0 0 16 16"
  >
    <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5" />
  </svg>
);
const enable = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    color="blue"
    height="30"
    fill="currentColor"
    className="bi bi-toggle-on"
    viewBox="0 0 16 16"
  >
    <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
  </svg>
);

export default function Detail() {
  const [childValue, setChildValue] = useState(1);
  const [indexValue, setIndexValue] = useState(1);

  // Hàm xử lý sự kiện khi nhấp chuột vào childSensor
  const handleChildClick = () => {
    // Cập nhật giá trị của indexSensor thành giá trị của childSensor
    setIndexValue(childValue);

  };
  const [user, dispatch] = useContext(MyUserContext);
  const [stationInfo, setStationInfo] = useState();

  const [relay, setRelay] = useState();
  const [temp, setTemp] = useState();
  const [humi, setHumi] = useState();
  const [ph, setPH] = useState();
  const [ec, setEC] = useState();
  const [kali, setKali] = useState();
  const [photpho, setPhotpho] = useState();
  const [nito, setNito] = useState()

  const [sensor, setSensor] = useState();
  const path = useParams();
  const [data, setData] = useState();
  const listener = useGlobalState('message')[0];
  const pdata = [
    {
      name: "MongoDb",
      student: 11,
      fees: 120,
    },
    {
      name: "Javascript",
      student: 15,
      fees: 12,
    },
    {
      name: "PHP",
      student: 5,
      fees: 10,
    },
    {
      name: "Java",
      student: 10,
      fees: 5,
    },
    {
      name: "C#",
      student: 9,
      fees: 4,
    },
    {
      name: "C++",
      student: 10,
      fees: 8,
    },
  ];
  useEffect(() => {
    const loadInfoStation = async () => {
      const res = await Apis.get(`${endpoints.stationInfo}/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setStationInfo(res.data)
      console.log(stationInfo)
    }
    const loaddata = async () => {
      const res = await Apis.get(`${endpoints.current_data}/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      const resRelay = await Apis.get(`${endpoints.current_data}/Relay/station/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setRelay(resRelay.data);

      const resTemp = await Apis.get(`${endpoints.current_data}/temp/station/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setTemp(resTemp.data);

      const resHumi = await Apis.get(`${endpoints.current_data}/humi/station/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setHumi(resHumi.data);

      const resPH = await Apis.get(`${endpoints.current_data}/ph/station/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setPH(resPH.data);

      const resEC = await Apis.get(`${endpoints.current_data}/EC/station/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setEC(resEC.data);

      const resKali = await Apis.get(`${endpoints.current_data}/Kali/station/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setKali(resKali.data);

      const resNito = await Apis.get(`${endpoints.current_data}/Nito/station/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setNito(resNito.data);

      const resPhotpho = await Apis.get(`${endpoints.current_data}/Photpho/station/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setPhotpho(resPhotpho.data);
      const resSensor = await Apis.get(`${endpoints.listSensor}/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setSensor(resSensor.data);



      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        setData(res.data);
      }
      console.log(data);
    };
    loaddata();
    loadInfoStation();
  }, [listener]);
  const isAuthorized = useGlobalState('isAuthorized')[0];
  if (isAuthorized === false || user == null) {
    return (
      <>
        <Expired />
      </>
    );
  }
  if (data == null) return <></>;
  return (
    <>
      <div className="indexPage" style={indexPage}>
        <div className="Banner" style={station}>
          <div className="StationInfor" style={(stationBanner, stationInfor)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-houses"
              viewBox="0 0 16 16"
            >
              <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207z" />
            </svg>
            {stationInfo.name}
          </div>
          <div className="StationClock" style={(stationBanner, stationInfor)}>
            <iframe
              scrolling="no"
              frameBorder="no"
              title="clock"
              style={{
                overflow: 'hidden',
                border: '0',
                margin: '0',
                padding: '0',
                width: '120px',
                height: '40px',
              }}
              src="https://www.clocklink.com/html5embed.php?clock=004&timezone=GMT0700&color=blue&size=120&Title=&Message=&Target=&From=2024,1,1,0,0,0&Color=blue"
            />
          </div>
          <div className="StationStage" style={stationBanner}>
            {relay.map((element) => {
              return (
                <div style={{ marginTop: '10px' }}>
                  {`${element.sensor.id.split("_")[0]} ${element.sensor.id.split("_")[1]}`}
                  {element.value === "true" ? enable : disable}
                </div>
              );
            })}
            {/* <div style={{ marginTop: '10px' }}>Relay 0001{enable}</div>
              <div style={{ marginTop: '10px' }}>Relay 0002{disable}</div>
              <div style={{ marginTop: '10px' }}>Relay 0003{disable}</div>
              <div style={{ marginTop: '10px' }}>Relay 0004{disable}</div> */}
          </div>
        </div>
        <div className="SenSorInfor" style={{ backgroundColor: '#ffffff', marginTop: '20px', marginLeft: '8px' }}>
          <div className="indexSensor" style={indexSensor}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="currentColor"
                className="bi bi-thermometer-sun"
                viewBox="0 0 16 16"
              >
                <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5" />
                <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5" />
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h5>nhiệt độ</h5>
              <div>{indexValue}</div>
            </div>
          </div>
          <div className="ortherSensor" style={{ display: 'flex', flexWrap: 'wrap', cursor: 'pointer' }}>
            {temp.map((element) => {
              return (
                <div className="childSensor" style={childSensor} tabIndex={() => { console.log(1) }}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="bi bi-thermometer-sun"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5" />
                      <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h5>nhiệt độ {element.sensor.id.split("_")[1]}</h5>
                    <div>{element.value}</div>
                  </div>
                </div>
              );
            })}
            {humi.map((element) => {
              return (
                <div className="childSensor" style={childSensor}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="bi bi-droplet-half"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"
                      />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h5>Độ ẩm {element.sensor.id.split("_")[1]}</h5>
                    <div>{element.value}</div>
                  </div>
                </div>
              );
            })}
            {ph.map((element) => {
              return (
                <div className="childSensor" style={childSensor}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="bi bi-moisture"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h5>Độ PH {element.sensor.id.split("_")[1]}</h5>
                    <div>{element.value}</div>
                  </div>
                </div>
              );
            })}

            {ec.map((element) => {
              return (
                <div className="childSensor" style={childSensor}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="bi bi-fire"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h5>Độ dẫn nhiệt {element.sensor.id.split("_")[1]}</h5>
                    <div>{element.value}</div>
                  </div>
                </div>
              );
            })}
            {kali.map((element) => {
              return (
                <div className="childSensor" style={childSensor}>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="50" height="50">
                      <path d="M311 86.3c12.3-12.7 12-32.9-.7-45.2s-32.9-12-45.2 .7l-155.2 160L64 249V64c0-17.7-14.3-32-32-32S0 46.3 0 64V328 448c0 17.7 14.3 32 32 32s32-14.3 32-32V341l64.7-66.7 133 192c10.1 14.5 30 18.1 44.5 8.1s18.1-30 8.1-44.5L174.1 227.4 311 86.3z" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h5>Kali {element.sensor.id.split("_")[1]}</h5>
                    <div>{element.value}</div>
                  </div>
                </div>
              );
            })}
            {nito.map((element) => {
              return (
                <div className="childSensor" style={childSensor}>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="50" height="50">
                      <path d="M21.1 33.9c12.7-4.6 26.9-.7 35.5 9.6L320 359.6V64c0-17.7 14.3-32 32-32s32 14.3 32 32V448c0 13.5-8.4 25.5-21.1 30.1s-26.9 .7-35.5-9.6L64 152.4V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 50.5 8.4 38.5 21.1 33.9z" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h5>Nito {element.sensor.id.split("_")[1]}</h5>
                    <div>{element.value}</div>
                  </div>
                </div>
              );
            })}
            {photpho.map((element) => {
              return (
                <div className="childSensor" style={childSensor}>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="50" height="50">
                      <path d="M0 96C0 60.7 28.7 32 64 32h96c88.4 0 160 71.6 160 160s-71.6 160-160 160H64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V320 96zM64 288h96c53 0 96-43 96-96s-43-96-96-96H64V288z" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h5>Photpho {element.sensor.id.split("_")[1]}</h5>
                    <div>{element.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="MinMaxSensor" style={{ marginTop: '20px', marginLeft: '8px' }}>
          <select
            style={{ width: '30%', height: '25px', border: '0.2px', boxShadow: '5px 5px 10px 0 rgba(0, 0, 0, 0.1)' }}
            onChange={(e) => { console.log(e.target.value) }}
          >
            {sensor.map((element) => {
              return (
                <option value={element.id}>{element.id}</option>
              )
            })}

      
          </select>
          <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '5px', backgroundColor: '#ffffff' }}>
            <thead>
              <tr>
                <th style={styles.headerCell}> </th>
                <th style={styles.headerCell}>Trong vòng 1 giờ qua</th>
                <th style={styles.headerCell}>Trong vòng 1 ngày qua</th>
                <th style={styles.headerCell}>Trong vòng 1 tuần qua</th>
                <th style={styles.headerCell}>Trong vòng 1 tháng qua</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.dataCell}>Giá trị lớn nhất</td>
                <td style={styles.dataCell}>asd</td>
                <td style={styles.dataCell}>asd</td>
                <td style={styles.dataCell}>asd</td>
                <td style={styles.dataCell}>asd</td>
              </tr>
              <tr>
                <td style={styles.dataCell}>Giá trị nhỏ nhất</td>
                <td style={styles.dataCell}>asd</td>
                <td style={styles.dataCell}>asd</td>
                <td style={styles.dataCell}>asd</td>
                <td style={styles.dataCell}>asd</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={pdata} margin={{ right: 300 }}>
            <CartesianGrid />
            <XAxis dataKey="name" interval={"preserveStartEnd"} />
            <YAxis />
            <Legend />
            <Tooltip />
            <Line
              dataKey="student"
              stroke="black"
              activeDot={{ r: 8 }}
            />
            <Line dataKey="fees" stroke="red" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
