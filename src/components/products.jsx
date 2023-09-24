import React, { useEffect, useState } from "react";
import ProductCard from "./card";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { FaShoppingCart } from "react-icons/fa";
import CartPage from "./cart";

const response = require("../static/data.json");
const products = response.data.products ?? [];

const Products = () => {
    const [items, setItems] = useState(products);
    const [cart, setCart] = useState([]);
    const [summary, setSummary] = useState({
        totalprice: 0
    })

    const Addcart = (data) => {
        setCart(() => {
            const index = cart.findIndex(ele => ele.sku === data.sku);
            if(index > -1) {
                cart[index]['quality'] = 1;
                cart[index]['totalprice'] = cart[index]['price'];
                return [...cart];
            } else {
                data['quality'] = 1;
                data['totalprice'] = data.price;
                return [...cart, data];
            }
        })
    }

    useEffect(() => {
        const sum = cart.map(ele => ele.totalprice).reduce((total, sum) => total + sum, 0).toFixed(2);

        setSummary({totalprice: sum});
    }, [cart])

    const updatequality = (id, quality) => {
        if(quality === 0) {
            // warn
        } else {
            setCart((cartvalue) => {
                cartvalue.forEach(ele => {
                    if(ele.sku === id) {
                        ele.quality = quality;
                        ele.totalprice = ele.price * ele.quality;
                    }
                })
                return [...cartvalue];
            })
        }
    }

    return (
        <>
            <div>
                <Button variant="primary">
                    <FaShoppingCart />
                </Button>
                {cart.length > 0 ? <Badge bg="secondary" style={{top: '-10px', position:'relative', right:'5px'}}>{cart.length}</Badge> : ''}
            </div>

            <hr />

            <div className="row">
                {
                    items.length > 0 ? 
                        items.map((ele, i) => {
                            return (
                                <div key={ele.sku} className="col-md-4 mt-4">
                                    <ProductCard product={ele} Addcart={Addcart} /> 
                                </div>
                            )
                        })
                        : 
                    <div className="text-center">No Prodcuts found</div>
                }
            </div>

            { cart.length > 0 ? <CartPage cartitems={cart} updatequality={updatequality} summary={summary} /> : '' }
        </>
    )
}

export default Products;