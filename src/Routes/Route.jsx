import { createBrowserRouter } from "react-router";
import App from "../App";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../Layouts/PublicLayout";
import Inbox from "../Components/Inbox";
import PublicRoute from "./PublicRoute";
import Setting from "../Components/Setting";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><PublicLayout></PublicLayout></PrivateRoute>,
        children: [
            {
                index: true,
                path: '/',
                element: <App></App>
            },
            {
                path: '/setting',
                element: <Setting></Setting>
            }
        ]
    },
    {
        path: '/inbox/:id',
        element: <Inbox></Inbox>
    },
    {
        path: '/',
        element: <PublicRoute><AuthLayout></AuthLayout></PublicRoute>,
        children: [
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    }
])