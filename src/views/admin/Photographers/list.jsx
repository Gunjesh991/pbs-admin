import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useAdminPhotographers } from "../../../hooks/useAdminPhotographers";
import { Link, useLocation, useNavigate } from "react-router-dom";

const _columns = (onEdit = () => {}) => [
  {
    name: "Name",
    selector: (row) => row.fullName,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Mobile",
    selector: (row) => row.phone,
  },
  {
    name: "",
    center: true,
    cell: (row) => (
      <Link to={`/admin/portfolio/${row.id}`}>
        <button>Portfolio</button>
      </Link>
    ),
  },
  {
    name: "",
    right: true,
    cell: (row) => (
      <div>
        <button onClick={() => onEdit(row.id)}>Edit</button>
      </div>
    ),
  },
];

const PhotographerList = () => {
  const { photographers, loading, getPhotographerList } =
    useAdminPhotographers();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getPhotographerList();
  }, []);

  const gotoRegister = () => {
    navigate(location.pathname + "/register");
  };

  const onEdit = (id) => {
    navigate(`/admin/photographers/edit/${id}`);
  };

  return (
    <div>
      <div
        className="list__header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Photographers</h2>
        <button onClick={gotoRegister}>New Photographer</button>
      </div>
      <DataTable
        highlightOnHover
        progressPending={loading}
        data={photographers}
        columns={_columns(onEdit)}
        noDataComponent={
          <div style={{ textAlign: "center" }}>
            <p>There are no photographers registered yet.</p>
            <button onClick={gotoRegister}>Register Now</button>
          </div>
        }
      />
    </div>
  );
};

export default PhotographerList;
