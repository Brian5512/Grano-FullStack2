import Catalogo from "./components/Catalogo.jsx";

function App() {
  return (
    <>
      <header className="encabezado">
        <a className="marca" href="/">grano</a>
        <nav>
          <a href="#productos">Nuestro café</a>
        </nav>
      </header>

      <main>
        <section className="presentacion">
          <p className="etiqueta">CAFÉ DE ESPECIALIDAD</p>
          <h1>Un buen café para cada día.</h1>
          <p>Esta es la primera pantalla de práctica para trabajar los productos con React.</p>
        </section>

        <Catalogo />
      </main>

      <footer className="pie">
        <p>Grano · Café y rituales</p>
      </footer>
    </>
  );
}

export default App;
