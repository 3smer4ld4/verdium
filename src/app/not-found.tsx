import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "30px",
      }}
    >
      <span style={{ fontSize: "60px" }}>🌱</span>

      <h1>¡Ups! No encontramos esta planta.</h1>

      <p>
        Parece que esta página no existe o que la planta
        ya no está disponible.
      </p>

      <Link
        href="/"
        style={{
          marginTop: "20px",
          color: "#536f50",
          fontWeight: "bold",
        }}
      >
        Volver a Verdium →
      </Link>
    </main>
  );
}