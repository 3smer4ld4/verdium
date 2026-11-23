
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function CategoriaPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main style={{ padding: "50px", textAlign: "center" }}>
          <p>Cargando categoría...</p>
        </main>
      }
    >
      <ContenidoCategoria params={params} />
    </Suspense>
  );
}

async function ContenidoCategoria({ params }: Props) {
  const { slug } = await params;

  const supabase = await createClient();

  // Buscar la categoría por su slug
  const { data: categoria, error: errorCategoria } = await supabase
    .from("categorias")
    .select("id, nombre, slug, descripcion")
    .eq("slug", slug)
    .maybeSingle();

  if (errorCategoria) {
    console.error("Error al consultar categoría:", errorCategoria.message);

    return (
      <main style={{ padding: "40px" }}>
        <h1>Error al cargar la categoría</h1>
        <p>No fue posible obtener la información.</p>
        <a href="/">Volver al inicio</a>
      </main>
    );
  }

  if (!categoria) {
    notFound();
  }

  // Buscar las plantas pertenecientes a esa categoría
  const { data: plantas, error: errorPlantas } = await supabase
    .from("plantas")
    .select("id, nombre, descripcion, imagen_url, dificultad")
    .eq("categoria_id", categoria.id)
    .order("id", { ascending: true });

  if (errorPlantas) {
    console.error("Error al consultar plantas:", errorPlantas.message);

    return (
      <main style={{ padding: "40px" }}>
        <h1>Error al cargar las plantas</h1>
        <p>No fue posible obtener el catálogo de esta categoría.</p>
        <a href="/">Volver al inicio</a>
      </main>
    );
  }

  const listaPlantas = plantas ?? [];

  return (
    <main>
      <header className="navbar">
        <a href="/" className="logo">
          <span className="logo-icon">✿</span>
          Verdium
        </a>

        <nav className="nav-links">
          <a href="/">Inicio</a>
          <a href="/#catalogo">Plantas</a>
          <a href="/#cuidados">Guías de cuidado</a>
        </nav>

        <a href="/#catalogo" className="nav-button">
          Explorar catálogo
        </a>
      </header>

      <section
        style={{
          maxWidth: "1100px",
          margin: "60px auto",
          padding: "0 25px",
          minHeight: "400px",
        }}
      >
        <a href="/#catalogo" className="text-link">
          ← Volver al inicio
        </a>

        <div style={{ margin: "35px 0" }}>
          <span className="section-tag">
            EXPLORA POR CATEGORÍA
          </span>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              margin: "15px 0",
            }}
          >
            {categoria.nombre}
          </h1>

          <p style={{ maxWidth: "650px", lineHeight: "1.8" }}>
            {categoria.descripcion ||
              `Descubre nuestra colección de ${categoria.nombre.toLowerCase()}.`}
          </p>

          <p style={{ marginTop: "15px", color: "#71806c" }}>
            {listaPlantas.length} plantas encontradas
          </p>
        </div>

        {listaPlantas.length === 0 ? (
          <p>
            Todavía no hay plantas registradas en esta categoría.
          </p>
        ) : (
          <div className="plant-grid">
            {listaPlantas.map((planta) => (
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
                    {planta.dificultad}
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
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <a href="/" className="logo">
          <span className="logo-icon">✿</span>
          Verdium
        </a>

        <p>Un pequeño espacio para aprender de la naturaleza.</p>

        <span>© 2026 Verdium. Todos los derechos para mi gato.</span>
      </footer>
    </main>
  );
}
