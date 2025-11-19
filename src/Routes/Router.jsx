   
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import Preview from '../Components/Preview/Preview';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Components/Users/Home/Home';
import AddFriends from '../Components/Users/Home/AddFriends';
import ProfilePage from '../Components/Users/Home/ProfilePage';

// import Home from '../Components/Home/Home';

let Routes= createBrowserRouter([
    {
    path :"/register",
    element: <Register/> 
   },
   {
    path :"/",
    element: <Login/>
   },
   {
   path:"/home",
   element:<Home/>
    },
    {
    path:"/addfriends",
    element:<AddFriends/>
    },
    {
    path:"/Profilepage",
    element:<ProfilePage/>
    }
   
    

])

export default Routes;



