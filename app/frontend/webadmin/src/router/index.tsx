import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from '@src/screen/Signin';
import Home from '@src/screen/Home';
import Order from '@src/screen/Order';
import NotAdmin from '@src/screen/NotAdmin';
import List from '@src/screen/List';
import CreateProduct from '@src/screen/CreateProduct';
import CreateOrder from '@src/screen/CreateOrder';
// import NotFoundPage from '@src/screen/NotFoundPage';

const router = createBrowserRouter(
    [
        { path: '/signin', element: <Signin /> },
        { path: '/', element: <Home /> },
        { path: '/order', element: <Order /> },
        { path: '/notadmin', element: <NotAdmin /> },
        { path: '/list', element: <List /> },
        { path: '/createProduct', element: <CreateProduct /> },
        { path: '/createOrder', element: <CreateOrder /> },
        // { path: '*', element: <NotFoundPage /> }, // Trang 404
    ],
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        future: { v7_startTransition: true } as any,
    }
);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
