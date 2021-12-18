import React from "react"
import Libras from '../../assets/images/Libras.svg'
import Ifc from '../../assets/images/Logo_IFC.png'
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="sm">
      <div className="navICon">
        <img className="iconLibras" src={Libras} alt="libras"/>
      </div>
      <Navbar.Brand as={Link} to="/">
        Elibras Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Perfil
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
