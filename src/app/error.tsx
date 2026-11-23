"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "45px" }}>🍃</span>

      <h1>Algo salió mal</h1>

      <p>
        No pudimos completar la solicitud.
        Intenta nuevamente.
      </p>

      <button
        onClick={() => reset()}
        style={{
          padding: "12px 24px",
          marginTop: "20px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#536f50",
          color: "white",
          cursor: "pointer",
        }}
      >
        Intentar nuevamente
      </button>
    </main>
  );
}