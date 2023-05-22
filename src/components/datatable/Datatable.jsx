import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, CLIENTID, SECRETKEY } from "../../utils/config";

const Datatable = ({ columns }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      clientId: CLIENTID,
      secret: SECRETKEY,
    },
    withCredentials: true,
  };

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState();

  const { data, loading, error } = useFetch(`${BASE_URL}/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${path}/${id}`, config);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
