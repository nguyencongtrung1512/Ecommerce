import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../config";
import { Badge, Card, Image, List, Rate, Spin, Typography } from "antd";
import "./index.scss";
import AddToCartButton from "../add";
import { useParams } from "react-router-dom";

function Products() {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    getProductsByCategory(param.categoryId)
      .then(res => {
        setItems(res.products);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Handle potential fetch errors
  }, [param]);

  if (loading) {
    return <Spin spinning size="large" className="loading-spinner" />;
  }

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={items}
        renderItem={(product) => (
          <List.Item key={product.id}>
            <Badge.Ribbon text={"New"} color="green">
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
                    <Typography.Paragraph delete type="secondary">
                      ${product.price.toFixed(2)}
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph>
                      Discounted: ${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}
                    </Typography.Paragraph>
                  }
                />
                <Typography.Text
                  italic
                  ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}
                  style={{ display: 'block', width: '100%' }}
                >
                  {product.description}
                </Typography.Text>
              </Card>
            </Badge.Ribbon>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Products;
