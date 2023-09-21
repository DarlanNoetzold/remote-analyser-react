import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from "./componentes/telas/Home";
import Menu from "./componentes/telas/Menu";
import BadLanguage from "./componentes/telas/badLanguage/BadLanguage";
import Alert from "./componentes/telas/alert/Alert";
import MaliciousWebsite from "./componentes/telas/maliciousWebsite/MaliciousWebsite";
import MaliciousProcess from "./componentes/telas/maliciousProcess/MaliciousProcess";
import MaliciousPort from "./componentes/telas/maliciousPort/MaliciousPort";

const router = createBrowserRouter([
  {
    path : "/",
    element : <Menu/>,
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
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
