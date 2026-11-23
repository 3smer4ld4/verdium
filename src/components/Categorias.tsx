
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

export default function Categorias() {
  return (
    <Suspense
      fallback={
        <p style={{ padding: "30px" }}>
          Cargando categorías...
        </p>
      }
    >
      <ListaCategorias />
    </Suspense>
  );
}

async function ListaCategorias() {
  const supabase = await createClient();

  const { data: categorias, error } = await supabase
    .from("categorias")
    .select("id, nombre, slug, descripcion")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error al cargar categorías:", error.message);

    return <p>No fue posible cargar las categorías.</p>;
  }

  const listaCategorias = categorias ?? [];

  return (
    <div className="category-grid">
      {listaCategorias.map((categoria) => (
        <a
          href={`/categorias/${categoria.slug}`}
          className="category-card"
          key={categoria.id}
        >
          <span className="category-icon">✿</span>

          <h3>{categoria.nombre}</h3>

          <p>
            {categoria.descripcion ||
              "Descubre las plantas de esta categoría."}
          </p>

          <span className="category-link">
            Explorar categoría →
          </span>
        </a>
      ))}
    </div>
  );
}
