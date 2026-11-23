
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function DetallePlanta({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main style={{ padding: "50px", textAlign: "center" }}>
          <p>Cargando información de la planta...</p>
        </main>
      }
    >
      <ContenidoPlanta params={params} />
    </Suspense>
  );
}

async function ContenidoPlanta({ params }: Props) {
  const { id } = await params;
  const idNumerico = Number(id);

  if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
    notFound();
  }

  const supabase = await createClient();

  const { data: planta, error } = await supabase
    .from("plantas")
    .select(`
      id,
      nombre,
      nombre_cientifico,
      descripcion,
      cuidados,
      luz,
      riego,
      humedad,
      dificultad,
      toxicidad,
      imagen_url,
      categorias(nombre, slug)
    `)
    .eq("id", idNumerico)
    .maybeSingle();

  if (error) {
    console.error("Error al consultar la planta:", error.message);

    return (
      <main style={{ padding: "40px" }}>
        <h1>Error al cargar la planta</h1>
        <p>No fue posible obtener su información.</p>
        <a href="/">Volver al inicio</a>
      </main>
    );
  }

  if (!planta) {
    notFound();
  }

  const categoria = Array.isArray(planta.categorias)
    ? planta.categorias[0]
    : planta.categorias;

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

      <section style={{
        maxWidth: "1100px",
        margin: "60px auto",
        padding: "0 25px"
      }}>
        <a href="/#catalogo" className="text-link">
          ← Volver al catálogo
        </a>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "45px",
          alignItems: "start",
          marginTop: "35px"
        }}>
          <div
            role="img"
            aria-label={`Imagen de ${planta.nombre}`}
            style={{
              minHeight: "400px",
              borderRadius: "18px",
              backgroundColor: "#e8eee5",
              backgroundImage: planta.imagen_url
                ? `url("${planta.imagen_url}")`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />

          <div>
            <span className="section-tag">
              {categoria?.nombre ?? "Planta"}
            </span>

            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              margin: "15px 0"
            }}>
              {planta.nombre}
            </h1>

            <p style={{
              fontStyle: "italic",
              color: "#71806c",
              marginBottom: "25px"
            }}>
              {planta.nombre_cientifico}
            </p>

            <p>{planta.descripcion}</p>

            <hr style={{ margin: "25px 0" }} />

            <h2>Información general</h2>

            <p>
              <strong>Dificultad:</strong> {planta.dificultad}
            </p>

            <p>
              <strong>Toxicidad:</strong> {planta.toxicidad}
            </p>

            <p>
              <strong>Iluminación:</strong> {planta.luz}
            </p>

            <p>
              <strong>Riego:</strong> {planta.riego}
            </p>

            <p>
              <strong>Humedad:</strong> {planta.humedad ?? "No especificada"}
            </p>
          </div>
        </div>

        <section style={{
          marginTop: "55px",
          padding: "30px",
          borderRadius: "18px",
          backgroundColor: "#f1f4ed"
        }}>
          <span className="section-tag">GUÍA DE CUIDADO</span>
          <h2 style={{ margin: "12px 0 20px" }}>
            ¿Cómo cuidar esta planta?
          </h2>
          <p style={{ lineHeight: "1.8", whiteSpace: "pre-line" }}>
            {planta.cuidados}
          </p>
        </section>
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
