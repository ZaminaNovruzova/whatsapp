import { Route, Routes } from "react-router-dom";
import { pagesList } from "../constants/pages";

const MyRoutes = () => {
  return (
    <Routes>
      {pagesList
        .filter((item) => item.is_navigation)
        .map((item) => (
          <Route path={item.path} element={item.element} />
        ))}
    </Routes>
  );
};

export default MyRoutes;
