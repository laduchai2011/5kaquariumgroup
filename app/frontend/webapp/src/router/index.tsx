import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from '@src/screen/Signup';
import Signin from '@src/screen/Signin';
import Home from '@src/screen/Home';
import NotFoundPage from '@src/screen/NotFoundPage';
import Product from '@src/screen/Product';
import List from '@src/screen/List';
import MyOrder from '@src/screen/MyOrder';
import Profile from '@src/screen/Profile';
import About5k from '@src/screen/About5k';

const router = createBrowserRouter(
    [
        { path: '/signup', element: <Signup /> },
        { path: '/signin', element: <Signin /> },
        { path: '/', element: <Home /> },
        { path: '/product/:id', element: <Product /> },
        { path: '/list', element: <List /> },
        { path: '/myOrder', element: <MyOrder /> },
        { path: '/profile', element: <Profile /> },
        { path: '/about5k', element: <About5k /> },
        { path: '*', element: <NotFoundPage /> }, // Trang 404
    ],
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        future: { v7_startTransition: true } as any,
    }
);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
