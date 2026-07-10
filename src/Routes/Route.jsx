import { createBrowserRouter } from "react-router";
import App from "../App";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../Layouts/PublicLayout";
import Inbox from "../Components/Inbox";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout></PublicLayout>,
        children: [
            {
                index: true,
                path: '/',
                element: <App></App>
            },
            {
                path: '/inbox/:id',
                element: <Inbox></Inbox>
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayout></AuthLayout>,
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