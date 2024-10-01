import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/home";
import Layout from "./layout";
import Category from "./page/category";
import Checkout from "./page/checkout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:categoryId",
          element: <Category />,
        }
      ],
    
    },
    {
      path: "/checkout",
      element: <Checkout/>,
    }
   
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App