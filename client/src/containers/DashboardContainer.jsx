import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Dashboard } from "../components/pages/Dashboard";
import { Navigate } from "react-router-dom";
import '../components/pages/Dashboard.css'


export const DashboardContainer = () => {

    const {isAuthenticated, token} = useAuth();
    const [inventoryData, setInventoryData] = useState([]);

        useEffect(() => {
          if(isAuthenticated && token){
            //hacemos el fetch : etchInventoryData(token).then(setInventoryData); // Pasa el token a la API
          }
        
          return () => {
            
          }
        }, [isAuthenticated, token]);

        if(!isAuthenticated) return <Navigate to="/"/>;


        

  return (
    //aqui pasariamos el inventoryData como prop
    <Dashboard/>
  )
}

