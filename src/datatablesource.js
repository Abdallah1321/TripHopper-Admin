export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
];


export const tripColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "destName",
    headerName: "Destination",
    width: 150,
  },

  {
    field: "location",
    headerName: "Location",
    width: 100,
  },
  {
    field: "nationality",
    headerName: "Nationality",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 100,
  },
];
