import { Button, message } from 'antd';
import { addToCart } from '../../config';
import { useState } from 'react';

function AddToCartButton({ item }) {  // Correct destructuring
    const [loading, setLoading] = useState(false);
    const addProductToCart = () => {
        setLoading(true);  // Set loading to true when API call starts
        addToCart(item.id).then(res => {
            message.success(`${item.title} has been added to the cart`);
            setLoading(false);
        });
    };
    return (
        <Button
            type="link"
            onClick={addProductToCart}
            loading={loading}
        >
            Add To Cart
        </Button>
    );
}

export default AddToCartButton;
