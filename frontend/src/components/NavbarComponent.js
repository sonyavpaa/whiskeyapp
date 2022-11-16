import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarCustom(props) {
  const [userCheck, setUserCheck] = useState(false);

  const checkUser = () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setUserCheck(true);
    } else setUserCheck(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Barley&Bait</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="addwhiskey">Add whiskey</Nav.Link>

            {userCheck ? (
              <a
                onClick={() => localStorage.removeItem("isLoggedIn")}
                className="nav-link"
                style={{ cursor: "pointer" }}
                href="/"
              >
                Logout
              </a>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;
