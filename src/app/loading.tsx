export default function Loading() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <span style={{ fontSize: "40px" }}>🌿</span>
      <h2>Preparando tu espacio verde...</h2>
      <p>Estamos cargando la información de Verdium.</p>
    </main>
  );
}