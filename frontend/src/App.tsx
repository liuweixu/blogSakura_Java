import { RouterBackend } from "@/ui-backend/router";
import { RouterFrontend } from "./ui-frontend/router";
import { useLocation } from "react-router-dom";
import 'react-quill-new/dist/quill.snow.css';

function App() {
  const location = useLocation();

  if (location.pathname.startsWith("/backend")) {
    return <RouterBackend />;
  }

  return (
    <>
      <RouterFrontend />
    </>
  );
}

export default App;
