import { useEffect, useState } from "react";
import { getAllProducts } from "../../config";
import { Badge, Card, Image, List, Rate, Select, Typography } from "antd";
import AddToCartButton from "../add";
import "./index.scss";
function Home() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data.products)) // Assuming the products are inside a "products" field in the response
      .catch((err) => console.log(err));
  }, []);

  const getSortedItems = () => {
    const sortedItems = [...products];
    sortedItems.sort((a, b) => {
      if (sortOrder === "az") {
        return a.title > b.title ? 1 : a.title === b.title ? 0 : -1;
      } else if (sortOrder === "za") {
        return a.title < b.title ? 1 : a.title === b.title ? 0 : -1;
      } else if (sortOrder === "lowHigh") {
        return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
      } else if (sortOrder === "highLow") { // Corrected sortOrder value here
        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
      }
    });
    return sortedItems;
  };

  return (
    <div className="productContainer">
      <div>
        <Typography.Text>View Item sort by: </Typography.Text>
        <Select
          onChange={(value) => {
            setSortOrder(value);
          }}
          defaultValue={"az"}
          options={[
            {
              label: "Alphabetically a-z",
              value: "az",
            },
            {
              label: "Alphabetically z-a",
              value: "za",
            },
            {
              label: "Price Low to High",
              value: "lowHigh",
            },
            {
              label: "Price High to Low",
              value: "highLow", // Corrected value here
            },
          ]}
        />
      </div>
      <List
        grid={{ column: 5 }}
        renderItem={(product, index) => {
          const discountedPrice =
            product.price - (product.price * product.discountPercentage) / 100;
          return (
            <Badge.Ribbon text={`${product.discountPercentage}% Off`} color="green" key={index}>
              <Card
                className="product-card"
                title={product.title}
                cover={<Image src={product.thumbnail} />}
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,
                  <AddToCartButton item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <>
                      <Typography.Paragraph delete type="secondary">
                        ${product.price}
                      </Typography.Paragraph>
                      <Typography.Paragraph>
                        Now: ${discountedPrice.toFixed(2)}
                      </Typography.Paragraph>
                    </>
                  }
                />
                <Typography.Text
                  italic
                  ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
                  style={{ display: "block", width: "100%" }}
                >
                  {product.description}
                </Typography.Text>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={getSortedItems()}
      />
    </div>
  );
}

export default Home;
