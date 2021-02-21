import React, { forwardRef, useEffect, useState, useContext } from 'react';
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import AppContext from '../../../../AppContext';
import { adminGetTeachers, adminUpdateTeacher, } from '../../../../services/admin';
import { LOGOUT } from '../../../../AppTypes';
import { alertMessage } from '../../../../utils/common';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Teachers = () => {
  const { dispatch } = useContext(AppContext);

  const [columns, setColumns] = useState([
    {
      editComponent: props => (
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Ảnh đại diện',
      field: 'img_url',
      render: rowData => <img src={rowData.img_url} style={{ width: 85, height: 100 }} />,
      editable: 'never'
    },
    { title: 'Họ tên', field: 'full_name', editable: 'never' },
    { title: 'Tài khoản', field: 'username' },
    { title: 'Điện thoại', field: 'phone' },
    { title: 'Email', field: 'email' },
    { title: 'Địa chỉ', field: 'address', editable: 'never' },
    {
      title: 'Quyền truy cập',
      field: 'active',
      lookup: { 0: 'Không', 1: 'Có' }
    }
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await adminGetTeachers();
      if (res.state) {
        console.log(res);
        setData(res.data);
      } else {
        if (res.auth !== undefined && res.auth.authenticated === false) {
          dispatch({
            type: LOGOUT,
            payload: {
              isLogged: false
            }
          })
        }
      }
    }
    fetchTeachers()
  }, [])

  return (
    <MaterialTable
      icons={tableIcons}
      columns={columns}
      data={data}
      title="Giáo viên"
      editable={{
        onRowUpdate: async (newData, oldData) => {
          let form = {
            active: Boolean(+newData.active),
            username: newData.username,
            phone: newData.phone,
            email: newData.email
          }
          const res = await adminUpdateTeacher(form, newData.id);
          if (res.state) {
            const dataUpdate = [...data];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setData([...dataUpdate]);
            alertMessage({ type: 'success', message: 'Cập nhật thành công' });
          } else {
            alertMessage({ type: 'error', message: 'Cập nhật thất bại' });
            if (res.auth !== undefined && res.auth.authenticated === false) {
              dispatch({
                type: LOGOUT,
                payload: {
                  isLogged: false
                }
              })
            }
          }
        },
      }}
    />
  );
}

export default Teachers;