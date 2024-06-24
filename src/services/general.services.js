import { endpoints } from "../constants/endpoints";
import axios from "axios";

const SELLER_ID = "179571326"; // ID de la tienda del cliente

export const GeneralService = {

  // Obtener informacion de cliente
  search: () => 
    axios.get(`${endpoints.base}/search?seller_id=${SELLER_ID}`),

  //Obtener todas las categorias
  getCategoryAll: () =>
    axios.get(`${endpoints.base}/search?seller_id=${SELLER_ID}&category`),

  //Obtener las categorias del cliente por ID
  getCategoryById: ({ id = ["MLA1648", "MLA1000", "MLA1039"] }) =>
    axios.get(`${endpoints.base}/search?seller_id=${SELLER_ID}&category=${id}`),
};
