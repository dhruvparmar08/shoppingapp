import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCard = ({product, Addcart}) => {
    
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={require(`../static/products/${product.sku}-1-product.webp`)}
                    onMouseOver={e => e.currentTarget.src = require(`../static/products/${product.sku}-2-product.webp`)}
                    onMouseOut={e => e.currentTarget.src = require(`../static/products/${product.sku}-1-product.webp`)} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                            &#x20B9;
                        <b>{product.price}</b>
                    </Card.Text>
                    <Button variant="primary" onClick={() => Addcart(product)}>Add to Cart</Button>
                </Card.Body>
            </Card>
        </>  
    );
}

export default ProductCard;