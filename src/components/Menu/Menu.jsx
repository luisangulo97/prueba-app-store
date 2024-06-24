import { Link } from "react-router-dom";
import { Tree } from "primereact/tree";
import { useEffect, useState } from "react";
import React from "react";

export default function Menu() {
  const [categorias, setCategorias] = useState([]); // Estado para guadar las categorias
  const [expandedKeys, setExpandedKeys] = useState([]); // Estado para almacenar las claves de categorías expandidas

  useEffect(() => { // Se utiliza para realizar efectos secundarios en componentes funcionales
    const storedKeys = localStorage.getItem("expandedKeys");  // Obtenemos las claves expandidas almacenadas en localStorage
    if (storedKeys) {
      setExpandedKeys(JSON.parse(storedKeys)); // Si hay claves almacenadas, las cargamos en el estado
    }

    // Definir los IDs de categoría que deseas consultar
    const categoryIds = ["MLA1648", "MLA1000", "MLA1039"];

    // Array para almacenar las categorías y subcategorías
    const categoriasConSubcategorias = [];

    // Iterar sobre cada ID de categoría haciendo las llamas a las Api 
    Promise.all(
      categoryIds.map((categoryId) =>
        fetch(
          `https://api.mercadolibre.com/sites/MLA/search?seller_id=179571326&category=${categoryId}`
        )
          .then((response) => response.json())
          .then((data) => {
            // Buscar la categoría correspondiente dentro de filters.values
            const categoria = data.filters.find(
              (item) => item.id === "category"
            );

            if (categoria) {
              // Acceder al nombre de la categoría desde filters.values
              const nombreCategoria = categoria.values[0].name; // Suponiendo que values es un array y queremos el primer elemento

              // Obtenemos las subcategorías de la categoría encontrada en available_filters
              const subcategorias =
                data.available_filters.find((item) => item.id === "category")
                  ?.values || [];

              // Construimos el objeto categoría con subcategorías y el nombre de la categoría
              const categoriaConSubcategorias = {
                id: categoryId, // Usamos el ID de categoría actual
                nombre: nombreCategoria,
                subcategorias: subcategorias.map((subcat) => ({
                  id: subcat.id,
                  nombre: subcat.name,
                })),
              };

              // Agregamos la categoría con subcategorías al array
              categoriasConSubcategorias.push(categoriaConSubcategorias);
            } else {
              console.error(
                `No se encontró la categoría con id "category" en filters para el ID ${categoryId}`
              );
            }
          })
          .catch((error) =>
            console.error(
              `Error fetching categoría con ID ${categoryId}:`,
              error
            )
          )
      )
    ).then(() => {
      // Actualizamos el estado con las categorías y subcategorías
      setCategorias(categoriasConSubcategorias);
    });
  }, []);

  // Función para estructurar los datos en un formato para PrimeReact Tree
  const construirArbol = () => {
    const treeData = [];

    // Iterar sobre cada categoría para crear nodos principales
    categorias.forEach((categoria) => {
      const categoriaNode = {
        key: categoria.id,
        label: (
          <Link to={`/${categoria.id}`} style={{ textDecoration: "none" }}>
            {categoria.nombre}
          </Link>
        ),
        children: [],
      };

      // Iterar sobre las subcategorías de la categoría actual
      categoria.subcategorias.forEach((subcat) => {
        categoriaNode.children.push({
          key: subcat.id,
          label: subcat.nombre,
        });
      });

      // Agregar el nodo de categoría al árbol principal
      treeData.push(categoriaNode);
    });

    return treeData;
  };

  // Función para manejar el evento de expansión/cierre de nodos en el árbol
  const onToggle = (event) => {
    setExpandedKeys(event.value); // Actualizar las claves expandidas en el estado
    localStorage.setItem("expandedKeys", JSON.stringify(event.value)); // Guardar las claves expandidas en localStorage  
  };

  return (
    <div>
      <Tree
        value={construirArbol()} // Pasar los datos estructurados como prop 'value' al componente Tree
        expandedKeys={expandedKeys} // Propiedad para manejar qué nodos están expandidos
        onToggle={onToggle} // Propiedad para manejar el evento de expansión/cierre de nodos
      />
    </div>
  );
}
