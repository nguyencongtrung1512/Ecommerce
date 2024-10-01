import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, InputNumber, Table } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";
import { getCart } from "../../config";
import { useNavigate } from "react-router-dom";

// Shopping Cart Icon Component
function AddCart() {
  const [cartOpen, setCartOpen] = useState(false);
  //đóng mở tab Shopping Cart
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
 //cartItems để trống còn setCartItems để cập nhập thay đổi giá trị, muốn thay đổi thì phải set
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

  // Columns for Table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => <span>${value.toFixed(2)}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (value, record) => (
        //value là giá trị quantity, record là giá trị như id, item 
        <InputNumber
          defaultValue={value}
          min={1}
          onChange={(newQuantity) => // đây là hàm được gọi mỗi khi thây đổi số lượng newQuantity 
            setCartItems((prevItems) => //setCartIems cập nhập state vào giỏ hàng, prev là giá trị hiện có trong giỏ hàng 
              prevItems.map((item) => // map để lấy sản phẩm mỗi item là đại diện cho sản phẩm trong từng giỏi hàng
                item.id === record.id //đây là sản phẩm đang được thay đổi số lượng 
                  ? {
                      ...item,// giữ nguyên tất cả các thuộc tính khác 
                      quantity: newQuantity,//cập nhập số lượng với giá trị mới 
                      total: item.price * newQuantity,//tính tiền sản phẩm dựa trên số lượng mới
                    }
                  : item
              )
            )
          }
        />
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (value) => <span>${value.toFixed(2)}</span>,
    },
  ];

  // Cart total, taking into account the price and quantity of each item
  //reduce() là một phương thức của mảng trong JavaScript, được dùng để "rút gọn" (tính toán, kết hợp) các phần tử trong mảng thành một giá trị duy nhất (ở đây là tổng tiền).
  const cartTotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // Total item count for badge
  

  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <div>
      <Badge
        count={cartItems.length} // Updated to reflect the actual number of items in the cart
        onClick={() => setCartOpen(true)}
        className="shoppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        title="Shopping Cart"
        contentWrapperStyle={{ width: 500 }}
        placement="right"
        onClose={() => setCartOpen(false)}
        open={cartOpen}
      >
        <Table
          pagination={false}
          columns={columns}
          dataSource={cartItems}
          rowKey={(record) => record.id} // Using id as a unique key
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3}>Total:</Table.Summary.Cell>
              <Table.Summary.Cell>${cartTotal.toFixed(2)}</Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
        <Button onClick={handleCheckout}>Checkout Your Cart</Button>
      </Drawer>
    </div>
  );
}

export default AddCart;
