import Nav from "../components/Nav/Nav";
import Menu from "../components/Menu/Menu";
import DataView from "../components/DataView/DataView";
import { useEffect, useState } from "react";
import { GeneralService } from "../services/general.services";

export default function Home() {
  const [products, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GeneralService.search(); // Método search del servicio GeneralService
        setProductos(response.data.results); // Actualizando el estado con los datos de la respuesta
        console.log(error);
      }catch (error) {
        console.log(error);
      }
    };
    fetchData(); // función fetchData dentro de useEffect para obtener los datos cuando el componente se monte
  }, []);

  return (
    <div>
      <Nav />
      <div className="flex">
        <div className="w-2/12">
          <Menu />
        </div>
        <div>
          {/* Pasamos por Props(estado) al componente DataView */}
          <DataView productos={products}></DataView>
        </div>
      </div>
    </div>
  );
}
