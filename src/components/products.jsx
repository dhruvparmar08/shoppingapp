import React, { useEffect, useState } from "react";
import ProductCard from "./card";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { FaShoppingCart } from "react-icons/fa";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import CartPage from "./cart";
import "../scss/product.scss";
import { toast } from "react-toastify";
import NavbarPage from "./navbar";

const response = require("../static/data.json");
const products = response.data.products.map(ele => ({...ele, iscartadded: false}));

const Products = () => {
    const [items, setItems] = useState(products);
    const [showcart, setShowcart] = useState(false);
    const [cart, setCart] = useState([]);
    const [summary, setSummary] = useState({
        totalprice: 0
    })
    const [show, setShow] = useState(false);
    const [showwarn, setShowwarn] = useState(false);
    const [updateId, setUpdateId] = useState(0);
    const [navdata, setNavdata] = useState({
        totalcart: 0,
        showcart: false
    })

    const handleClose = () => setShow(false);

    useEffect(() => {
        const sum = cart.map(ele => ele.totalprice).reduce((total, sum) => total + sum, 0).toFixed(2);

        setSummary({totalprice: sum});

        setNavdata((predata) => ({...predata, totalcart: cart.length}));
    }, [cart])

    const Addcart = (data) => {
        toast.dismiss();

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

        setItems(() => {
            const index = items.findIndex(ele => ele.sku === data.sku);
            if(index > -1) {
                items[index]['iscartadded'] = true;

                return [...items];
            }
        })

        toast(`Product ${data.title} added in cart`, { autoClose: true, closeButton: true, delay: 500, position:'bottom-right' });
    }

    const updatequality = (id, quality) => {
        if(quality === 0) {
            // warn
            console.log("quality -----", quality);
            setUpdateId(id);
            setShow(true);
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

    const updatecart = (status) => {
        const index = cart.findIndex(ele => ele.sku === updateId);
        if(status === "Yes") {
            cart.splice(index, 1);
            setCart(() => [...cart]);
            setItems(() => {
                const index = items.findIndex(ele => ele.sku === updateId);
                if(index > -1) {
                    items[index]['iscartadded'] = false;
    
                    return [...items];
                }
            })

            if(cart.length === 0) {
                setShowwarn(true);
                setNavdata({showcart: false, totalcart: 0});

                setTimeout(() => {
                    setShowcart(false);
                }, 1000);
            }

            handleClose(false);
        } else {
            cart[index]['quality'] = 1;
            cart[index]['totalprice'] = cart[index].price;
            setCart(() => [...cart]);
            handleClose(false);
        }
    }

    const handlechanbebtn = (flag) => {
        setShowcart(flag);

        setNavdata((prevalue) => ({...prevalue, showcart: flag}))
    }

    const checkcart = (carts) => {
        console.log("catrs---", carts);
        if(carts === 0) {
            setShowwarn(true);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete this item from your shopping cart?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => updatecart("No")}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => updatecart("Yes")}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showwarn} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>There are no more items in your shopping cart. Prior to placing your order, kindly choose one product.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowwarn(false)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                <NavbarPage navdata={navdata} handlechanbebtn={handlechanbebtn} checkcart={checkcart} />
            </div>
            {/* <div className="m-lg-3">
                { showcart === false ? 
                    (
                        <>
                            <Button variant="primary" onClick={() => setShowcart(true)}>
                                <FaShoppingCart /> Show Cart
                            </Button>
                            {cart.length > 0 ? <Badge bg="secondary" className="cbadge">{cart.length}</Badge> : ''}
                        </>

                    )
                    : (
                        <Button variant="primary" onClick={() => setShowcart(false)}>
                            <BsArrowLeftSquareFill />
                        </Button>
                    )
                }
            </div> */}

            {/* <hr /> */}

            {showcart === false ? 
                (
                    <div className="row w-100 mb-3">
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
                ) : 
                cart.length > 0 ? <CartPage cartitems={cart} updatequality={updatequality} summary={summary} /> : '' }
        </>
    )
}

export default Products;