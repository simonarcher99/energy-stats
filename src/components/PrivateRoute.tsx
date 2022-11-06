import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";

const PrivateRoute = ({ children }: { children: any }) => {
  const { userToken } = useSelector((state: RootState) => state.user);
  return userToken ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
