import { GeneralService } from "../services/general.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataView from "../components/DataView/DataView";
import Menu from "../components/Menu/Menu";
import Nav from "../components/Nav/Nav";
import ErrorPage from "./ErrorPage";

export default function Categories() {
  const valoresAceptados = ["MLA1648", "MLA1000", "MLA1039"]; // Aplicamos un filtro para las rutas que solo se permiten

  const { id } = useParams(); // Obtenemos el ID que nos envian por params
  if (!valoresAceptados.includes(id)) { // Validamos si los valores son correctos
    return <ErrorPage/>; // Se mostrará un error y lo renderizamos con el componente ErrorPaje.jsx
  }

  const [products_categories, setProductos_categories] = useState([]); // Estado para obtener las productos de la categoria solictada

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GeneralService.getCategoryById({ id }); // Método search del servicio GeneralService
        setProductos_categories(response.data.results); // Actualizamos el estado con los datos de la respuesta
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); // fetchData dentro de useEffect para obtener los datos cuando el componente se monte
  }, [id]); // El efecto se ejecutara cada vez que el valor id cambie

  return (
    <div>
      <Nav />
      <div className="flex">
        <div className="w-2/12">
          <Menu></Menu>
        </div>
        <div>
          <DataView productos={products_categories}></DataView>
        </div>
      </div>
    </div>
  );
}
