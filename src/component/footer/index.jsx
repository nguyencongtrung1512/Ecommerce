import "./index.scss"
import { Footer } from "antd/es/layout/layout";

function Footerend() {
  return (
    <div className="footer">
      <Footer style={{ textAlign: "center", backgroundColor: "#E3F2EE" }}>
        Happy Shopping ©{new Date().getFullYear()} Created by Anh Trung  Đẹp Trai Vô Cùng Tận
      </Footer>
    </div>
  )
}

export default Footerend