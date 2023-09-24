import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Badge } from "react-bootstrap";
import { BsShopWindow, BsArrowLeftSquareFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

const NavbarPage = ({navdata, handlechanbebtn, checkcart}) => {
    const { showcart, totalcart } = navdata;
    const [show, setShow] = useState(showcart);

    useEffect(() => {
        setShow(showcart);
    }, [showcart])

    const updateflag = (flag) => {
        if(totalcart > 0) {
            setShow(flag);
            handlechanbebtn(flag);
        } else {
            checkcart(totalcart)
        }
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand>
                        <BsShopWindow style={{ marginTop: '-5px' }} color="#0d6efd" /> <b>Shopping App</b>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {show === false ?
                            (
                                <>
                                    <Button variant="primary" onClick={() => updateflag(true)}>
                                        <FaShoppingCart /> Show Cart
                                    </Button>
                                    {totalcart > 0 ? <Badge bg="secondary" className="cbadge">{totalcart}</Badge> : ''}
                                </>

                            )
                            : (
                                <Button variant="primary" onClick={() => updateflag(false)}>
                                    <BsArrowLeftSquareFill />
                                </Button>
                            )
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarPage;