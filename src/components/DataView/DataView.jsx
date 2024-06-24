import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function DataView({ productos }) {
  // Definición de botones para el paginador
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const imageBodyTemplate = (rowdata) => {
    return (
      <img
        src={rowdata.thumbnail}
        alt={rowdata.thumbnail}
        className="w-6rem shadow-2 border-round"
        loading="lazy"
      />
    );
  };

  // Definición del encabezado del DataTable
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2"></div>
  );

   // Función para renderizar el enlace "Ver en Mercado Libre"
  const renderEnlace = (rowData) => {
    return (
      <a
        className="text-blue-500"
        href={rowData.permalink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver en Mercado Libre
      </a>
    );
  };

  // Función para renderizar el precio con el símbolo de peso
  const renderPrecio = (rowData) => {
    return (
      <>
        <span>&#36;</span> {/* Símbolo de peso */}
        {rowData.price}
      </>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={productos} // Datos a mostrar en la tabla
        stripedRows // Filas alternadas con colores
        tableStyle={{ minWidth: "60rem" }} // Estilo mínimo de la tabla
        scrollable // Permitir scroll horizontal si es necesario
        scrollHeight="400px" // Altura máxima de scroll vertical
        paginator // Habilitar paginación
        rows={10} // Cantidad de filas por página
        rowsPerPageOptions={[5, 10, 25, 50]} // Opciones de cantidad de filas por página
        paginatorTemplate=" CurrentPageReport PrevPageLink NextPageLink" // Plantilla del paginador
        currentPageReportTemplate="{first} - {last} de {totalRecords}" // Formato del reporte de página actual
        paginatorLeft={paginatorLeft} // Botón izquierdo del paginador
        paginatorRight={paginatorRight} // Botón derecho del paginador
      >
        <Column field="id" header="Producto Id"></Column>
        <Column
          field="title"
          header="Nombre producto"
          style={{ width: "500px" }} // Estilo de la columna de nombre del producto
        ></Column>
        <Column field="price" header="Precio" body={renderPrecio}></Column>
        <Column
          field="permalink"
          header="Mercado Enlace" 
          body={renderEnlace} // Columna de enlace a Mercado Libre usando la función renderEnlace
        ></Column>
        <Column body={imageBodyTemplate} header="Imagen"></Column>
      </DataTable>
    </div>
  );
}
