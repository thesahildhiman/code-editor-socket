import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    { path: "/editor/:roomId", element: <EditorPage /> },
  ]);
  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
