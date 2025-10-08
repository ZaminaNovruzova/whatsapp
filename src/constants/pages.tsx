import NotFound from "../Modules/Additionals/View/NotFound";
// import Login from "../Modules/Auth/View/Login";
import Chat from "../Modules/Chat/View/Chat";

export const pagesList = [
  {
    id: "chat",
    name: "chat",
    path: "/chat",
    element: <Chat />,
    is_visible: true,
    is_navigation: false,
  },
  {
    id: "not-found",
    name: "Not Found",
    path: "*",
    element: <NotFound />,
    is_visible: true,
    is_navigation: false,
  },
//   {
//     id: "login",
//     name: "Login",
//     path: "/",
//     element: <Login onLogin={console.log("sakan")
//     } />,
//     is_visible: true,
//     is_navigation: false,
//   },
];
