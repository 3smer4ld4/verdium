import Categorias from "@/components/Categorias";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

export default function Home() {
  return (
    <main>
      <header className="navbar">
        <a href="/" className="logo">
          <span className="logo-icon">✿</span>
          Verdium
        </a>

        <nav className="nav-links">
          <a href="/">Inicio</a>
          <a href="#catalogo">Plantas</a>
          <a href="#cuidados">Guías de cuidado</a>
          <a href="#nosotros">Nosotros</a>
        </nav>

        <a href="#catalogo" className="nav-button">
          Explorar catálogo
        </a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            ✦ UN ESPACIO PARA LOS AMANTES DE LAS PLANTAS
          </span>

          <h1>
            Cultiva tu pasión.
            <br />
            <span>Conecta con la naturaleza.</span>
          </h1>

          <p>
            Descubre nuevas especies, aprende sobre sus cuidados
            y encuentra la planta perfecta para llenar tu espacio de vida.
          </p>

          <div className="hero-buttons">
            <a href="#catalogo" className="primary-button">
              Explorar plantas →
            </a>

            <a href="#cuidados" className="secondary-button">
              Aprender a cuidar
            </a>
          </div>

          <div className="hero-note">
            <span>🌱</span>
            Aprende. Descubre. Cultiva.
          </div>
        </div>

        <div className="hero-image">
          <div className="image-label">
            <span>01 / NATURALEZA</span>
            <strong>Un mundo por descubrir</strong>
          </div>
        </div>
      </section>

      <section className="intro" id="nosotros">
        <span className="section-tag">BIENVENIDO A VERDIUM</span>
        <h2>
          Cada planta tiene
          <br />
          una historia que contar.
        </h2>
        <p>
          Creemos que conocer las plantas es el primer paso para aprender
          a cuidarlas. Por eso reunimos información, características
          y consejos para ayudarte a crear tu propio espacio verde.
        </p>
      </section>

      <section className="categories-section">
  <div className="section-heading">
    <div>
      <span className="section-tag">ENCUENTRA TU ESTILO VERDE</span>
      <h2>Explora por categorías</h2>
    </div>
  </div>

  <Categorias />
</section>

      <section className="catalog" id="catalogo">
        <div className="section-heading">
          <div>
            <span className="section-tag">DESCUBRE EL MUNDO VERDE</span>
            <h2>Plantas destacadas</h2>
          </div>

          <a href="#catalogo" className="text-link">
            Explorar todas →
          </a>
        </div>

        <Suspense
          fallback={
            <div className="plant-grid">
              <p>Cargando catálogo de plantas...</p>
            </div>
          }
        >
          <CatalogoPlantas />
        </Suspense>
      </section>

      <section className="care-section" id="cuidados">
        <div>
          <span className="section-tag">APRENDE A CULTIVAR</span>
          <h2>
            Cuidar una planta
            <br />
            también es aprender.
          </h2>
          <p>
            Descubre cómo proporcionar la luz, el agua y los cuidados
            adecuados para que tus plantas crezcan saludables.
          </p>
          <a href="#catalogo" className="primary-button">
            Descubrir guías →
          </a>
        </div>

        <div className="care-decoration">🌿</div>
      </section>

      <footer className="footer">
        <a href="/" className="logo">
          <span className="logo-icon">✿</span>
          Verdium
        </a>

        <p>Un pequeño espacio para aprender de la naturaleza.</p>

        <span>© 2026 Verdium. Todos los derechos reservados.</span>
      </footer>
    </main>
  );
}

async function CatalogoPlantas() {
  const supabase = await createClient();

  const { data: plantas, error } = await supabase
    .from("plantas")
    .select(`
      id,
      nombre,
      descripcion,
      imagen_url,
      dificultad,
      categorias(nombre)
    `)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error al cargar el catálogo:", error.message);

    return (
      <p style={{ padding: "20px", color: "#a33" }}>
        No fue posible cargar las plantas. Intenta nuevamente más tarde.
      </p>
    );
  }

  const listaPlantas = plantas ?? [];

  if (listaPlantas.length === 0) {
    return (
      <p style={{ padding: "20px" }}>
        Todavía no hay plantas registradas en el catálogo.
      </p>
    );
  }

  return (
    <div className="plant-grid">
      {listaPlantas.map((planta) => {
        const categoria = Array.isArray(planta.categorias)
          ? planta.categorias[0]
          : planta.categorias;

        return (
          <article className="plant-card" key={planta.id}>
            <div
              className="plant-image"
              style={{
                backgroundImage: planta.imagen_url
                  ? `url("${planta.imagen_url}")`
                  : "none",
              }}
            >
              <span className="plant-type">
                {categoria?.nombre ?? "Sin categoría"}
              </span>
            </div>

            <div className="plant-info">
              <span className="plant-number">
                PLANTA {String(planta.id).padStart(2, "0")}
              </span>

              <h3>{planta.nombre}</h3>

              <p>{planta.descripcion}</p>

              <a href={`/plantas/${planta.id}`}>
                Conocer planta →
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

