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
import { adminGetCourses, adminUpdateCourse } from '../../../../services/admin';
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

const Courses = () => {
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
      title: 'Ảnh nhỏ',
      field: 'img',
      render: rowData => <img src={rowData.img} style={{ width: 85, height: 100 }} />,
      editable: 'never'
    },
    {
      title: 'Ảnh lớn',
      field: 'img_large',
      render: rowData => <img src={rowData.img_large} style={{ width: 85, height: 100 }} />,
      editable: 'never'
    },
    { title: 'Tiêu đề', field: 'title', editable: 'never' },
    { title: 'Tên khóa học', field: 'name', editable: 'never' },
    { title: 'Giáo viên', field: 'teacher', editable: 'never' },
    { title: 'Số lượng học viên', field: 'qty_student_registed', editable: 'never' },
    { title: 'Giá', field: 'price' },
    { title: 'Giá khuyến mãi', field: 'price_promo' },
    {
      title: 'Trạng thái',
      field: 'status',
      lookup: { 'completed': 'Hoàn thành', 'pending': 'Chưa hoàn thành' }
    },
    {
      title: 'Hoạt động',
      field: 'active',
      lookup: { 0: 'Không', 1: 'Có' }
    }
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await adminGetCourses();
      if (res.state) {
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
    fetchCourses();
  }, [])

  return (
    <MaterialTable
      icons={tableIcons}
      columns={columns}
      data={data}
      title="DANH SÁCH KHÓA HỌC"
      editable={{
        onRowUpdate: async (newData, oldData) => {
          let form = {
            active: Boolean(+newData.active),
            price: +newData.price,
            price_promo: +newData.price_promo,
            status: newData.status
          };
          const res = await adminUpdateCourse(form, newData.id);
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

export default Courses;