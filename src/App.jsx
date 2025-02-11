import { Route } from 'react-router-dom'
import './App.css'
import DataForm from './components/DataForm.jsx'
import DataScreen from "./components/DataScreen.jsx";
import {RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx/RootLayout.jsx";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<DataForm/>}/>
        <Route path='data' element={<DataScreen/>}/>
      </Route>
    )
  )
  return (
    
      <RouterProvider router={router}/>

  )
}

export default App
