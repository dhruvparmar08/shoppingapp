import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsFillBagCheckFill } from 'react-icons/bs';

const ProductCard = ({product, Addcart}) => {
    return (
        <>
            <Card className='custom_card'>
                <Card.Img variant="top" src={require(`../static/products/${product.sku}-1-product.webp`)}
                    onMouseOver={e => e.currentTarget.src = require(`../static/products/${product.sku}-2-product.webp`)}
                    onMouseOut={e => e.currentTarget.src = require(`../static/products/${product.sku}-1-product.webp`)} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                            &#x20B9;
                        <b>{product.price}</b>
                    </Card.Text>
                    {
                        product.iscartadded === false ? <Button variant="primary" onClick={() => Addcart(product)}>Add to Cart</Button> : <Button variant="warning" disabled><BsFillBagCheckFill /> Added to Cart</Button>
                    }
                </Card.Body>
            </Card>
        </>  
    );
}

export default ProductCard;