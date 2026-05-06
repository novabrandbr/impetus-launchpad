import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/presentation.html");
  }, []);
  return (
    <div style={{minHeight:"100vh",background:"#02030A",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"system-ui"}}>
      Loading presentation…
    </div>
  );
}
