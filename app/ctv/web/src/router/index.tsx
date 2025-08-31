import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from '@src/screen/Signin';
import Home from '@src/screen/Home';
import NotFoundPage from '@src/screen/NotFoundPage';
import Live from '@src/screen/Live';

const router = createBrowserRouter(
    [
        { path: '/signin', element: <Signin /> },
        { path: '/', element: <Home /> },
        { path: '/live', element: <Live /> },
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
