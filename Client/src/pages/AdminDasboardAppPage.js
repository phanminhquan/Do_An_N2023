import React, { useContext, useEffect, useState, Component } from 'react';

import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Stack } from '@mui/material';
import CanvasJSReact from '@canvasjs/react-charts';
import { toInteger } from 'lodash';
import { DataGrid } from '@mui/x-data-grid';
import Apis, { endpoints } from '../configs/Apis';
import { setGlobalState, useGlobalState } from '..';
import { AdminContext, MyUserContext } from '../App';


// components
import Iconify from '../components/iconify';
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import Expired from './Expired';




const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
// sections

// ----------------------------------------------------------------------

export default function AdminDashboardAppPage() {
  const [user, dispatch] = useContext(AdminContext);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const theme = useTheme();
  const navigate = useNavigate();
  const choose = (id) => {
    navigate(`/app/${id}`);
  };
  console.log(user)


  const listener = useGlobalState('message')[0];


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 400 },
    {
      field: 'role',
      headerName: 'Role',
      width: 130,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const deleteUser = () => {
          const currentRow = params.row;
          const removeUser = async () => {
            const res = await Apis.delete(`${endpoints.deletUser}?idUSer=${currentRow.id}`, {
              headers: {
                Authorization: `Bearer ${cookie.load('token')}`,
              },
            })
            console.log(res)
            if (res.data === "Success") {
              if (refresh) {
                setRefresh(false)
              }
              else {
                setRefresh(true)
              }
            }
            else{
              alert(res.data)
            }
          }
          removeUser();
        }
        const onClick = (e) => {
          const currentRow = params.row;
          
          return alert(currentRow.id);
        };

        return (
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="warning" size="small" onClick={onClick}>Edit</Button>
            <Button variant="outlined" color="error" size="small" onClick={deleteUser}>Delete</Button>
          </Stack>
        );
      },
    },
  ];


  const isAuthorized = useGlobalState('isAuthorized')[0];
  const formatTitle = (str) => {
    return str
      .slice(0, 1)
      .toUpperCase()
      .concat(str.slice(1, 7).concat(` ${str.substring(7, 9)}`));
  };
  useEffect(() => {
    const loadUser = async () => {
      const res = await Apis.get(endpoints.listUser, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      })
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        const row1 = [];
        res.data.forEach((element) => {
          row1.push({ id: element.id, name: element.name, email: element.email, role: element.role });
        }
        )
        setData(row1);
        console.log(data)
      }
    }
    loadUser();
  }, [refresh])
  //   if (user == null) return <Navigate to="/login" />;
  if (isAuthorized === false) {
    return (
      <>
        <Expired />
      </>
    );
  }
  // data chart


  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </Container>
    </>
  );
}
