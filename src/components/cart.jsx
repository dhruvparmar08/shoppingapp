import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import UpDown from "./updown";

const CartPage = ({cartitems, updatequality, summary}) => {
    const updatequalities = (id, quality) => {
        updatequality(id, quality);
    }

    return (
        <>
            <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Cart - {cartitems.length} items</h5>
                            </div>
                            <div className="card-body">
                                {
                                    cartitems.map((cart, i) => {
                                        return (
                                            <div key={cart.sku}>
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                        <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                            <img src={require(`../static/products/${cart.sku}-1-cart.webp`)}
                                                                className="w-100" alt="Blue Jeans Jacket" />
                                                            <a href="#!">
                                                                <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                        <p><strong>{cart.title}</strong></p>
                                                    </div>

                                                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                        <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                                                            <UpDown id={cart.sku} qualities={cart.quality} updatequalities={updatequalities} />
                                                        </div>

                                                        <p className="text-start text-md-center">
                                                            <strong>&#x20B9; {cart.totalprice}</strong>
                                                        </p>
                                                    </div>
                                                </div>

                                                {(cartitems.length != i) ? <hr /> : ''}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Summary</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Products
                                        <span>&#x20B9; {summary.totalprice}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        Shipping
                                        <span>Gratis</span>
                                    </li>
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <strong>
                                                <p className="mb-0">(including VAT)</p>
                                            </strong>
                                        </div>
                                        <span><strong>&#x20B9; {summary.totalprice}</strong></span>
                                    </li>
                                </ul>

                                <Button variant="primary">Go to checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage;