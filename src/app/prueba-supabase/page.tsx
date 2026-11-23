import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

export default function PruebaSupabase() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Conexión con Verdium 🌿</h1>

      <Suspense fallback={<p>Cargando plantas...</p>}>
        <ListaPlantas />
      </Suspense>
    </main>
  );
}

async function ListaPlantas() {
  const supabase = await createClient();

  const { data: plantas, error } = await supabase
    .from("plantas")
    .select("id, nombre, nombre_cientifico")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error consultando Supabase:", error.message);

    return (
      <p>Error de conexión: {error.message}</p>
    );
  }

  const listaPlantas = plantas ?? [];

  return (
    <>
      <p>Plantas encontradas: {listaPlantas.length}</p>

      <hr style={{ margin: "20px 0" }} />

      {listaPlantas.map((planta) => (
        <article key={planta.id} style={{ marginBottom: "20px" }}>
          <h2>{planta.nombre}</h2>
          <p>Nombre científico: {planta.nombre_cientifico}</p>
          <p>ID: {planta.id}</p>
        </article>
      ))}
    </>
  );
}