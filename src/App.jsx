import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from "./componentes/telas/Home";
import BadLanguage from "./componentes/telas/badLanguage/BadLanguage";
import Alert from "./componentes/telas/alert/Alert";
import MaliciousWebsite from "./componentes/telas/maliciousWebsite/MaliciousWebsite";
import MaliciousProcess from "./componentes/telas/maliciousProcess/MaliciousProcess";
import MaliciousPort from "./componentes/telas/maliciousPort/MaliciousPort";
import MenuPublico from "./componentes/telas/MenuPublico";
import MenuPrivado from "./componentes/telas/MenuPrivado";
import Login from "./componentes/telas/login/Login";
import AlertUser from "./componentes/telas/alertUser/AlertUser";
import MenuUser from "./componentes/telas/MenuUser";

const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "login",
        element :  <Login/>
      }              
    ]
  },
  {
    path : "/privado",
    element : <MenuPrivado/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "alerts",
        element :  <Alert/>
      },
      {
        path : "alertsUser",
        element :  <AlertUser/>
      },
      {
        path : "maliciousWebsites",
        element :  <MaliciousWebsite/>
      } ,
      {
        path : "maliciousProcesses",
        element :  <MaliciousProcess/>
      } ,
      {
        path : "maliciousPorts",
        element :  <MaliciousPort/>
      } ,
      {
        path : "badLanguages",
        element :  <BadLanguage/>
      }    
    ]
  },
  {
    path : "/user",
    element : <MenuUser/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "alertsUser",
        element :  <AlertUser/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
