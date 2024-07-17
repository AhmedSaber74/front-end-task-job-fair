// import logo from "./logo.svg";
import "./App.css";
import Work from "./Work/alfa";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {  RouterProvider, createHashRouter } from "react-router-dom";




function App() {


      let Routes = createHashRouter([
  {
    path: "", element: <Work/>, children: 
    [
      { path: "*", element: <Work/> },
    ],
  },
]);
return <RouterProvider router={Routes} />;

   
      // <Work/>
      

  
}

export default App;
