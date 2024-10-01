import { Menu, Typography } from "antd";
import { HomeOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import AddCart from "../../page/shoppingcart";
function Header() {
  const navigate = useNavigate()
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  }
  return (
    <div className="header">
      <Menu
        onClick={onMenuClick}
        mode="horizontal"
        className="header__menu"
        items={[
          {
            label: <HomeOutlined />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "men-shirts",
              },
              {
                label: "Men's Shoes",
                key: "men-shoes",
              },
              {
                label: "Men's Watches",
                key: "men-watches",
              },
            ]
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Shirts",
                key: "women-shirts",
              },
              {
                label: "Women's Shoes",
                key: "women-shoes",
              },
              {
                label: "Women's Watches",
                key: "women-watches",
              },
              {
                label: "Women's Bags",
                key: "women-bags",
              },
              {
                label: "Women's Jewellery",
                key: "women-jewellery",
              },
            ]
          },
          {
            label: "Fragrences",
            key: "fragrences",
          },
        ]}
      />
        <Typography.Title>Amari Store</Typography.Title>
        <AddCart/>
    </div>
  )
}

export default Header