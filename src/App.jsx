import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from "./componentes/telas/Home";
import Menu from "./componentes/telas/Menu";
import Categoria from "./componentes/telas/categoria/Categoria";
import Produto from "./componentes/telas/produto/Produto";

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
