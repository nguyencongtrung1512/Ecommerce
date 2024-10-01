import { Outlet } from "react-router-dom"
import Header from "../component/header"
import Footerend from "../component/footer"


function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footerend />
    </>
  )
}

export default Layout