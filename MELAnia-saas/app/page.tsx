// Asegúrate de que ProyectosIa esté en tu página principal o donde lo necesites.
// Si ProyectosIa está en la página principal, puedes añadirle un id para el enlace de "Volver".
// Ejemplo:
import ProyectosIa from "../components/proyectos-ia"

export default function Page() {
  return (
    <main>
      {/* Otros componentes de tu página */}
      <div id="proyectos-ia">
        {" "}
        {/* Añade este id si ProyectosIa está aquí */}
        <ProyectosIa />
      </div>
      {/* Otros componentes de tu página */}
    </main>
  )
}
