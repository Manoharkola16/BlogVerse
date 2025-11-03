   
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import Preview from '../Components/Preview/Preview';
import { createBrowserRouter } from 'react-router-dom';

let Routes= createBrowserRouter([
    {
        path :"/",
        element: <Login/>
    },
    {
        path :"/register",
        element: <Register/>
    },
    {
        path :"/preview",
        element: <Preview/>
    }

])

export default Routes;