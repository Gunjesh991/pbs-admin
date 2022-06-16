import { Outlet } from "react-router";

const RequestsView = () => {
  return (
    <div className="safe">
      <Outlet />
    </div>
  );
};

export default RequestsView;
