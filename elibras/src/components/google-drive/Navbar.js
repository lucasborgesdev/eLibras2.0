import React from "react"
import Libras from '../../assets/images/Libras.svg'
import { ImFolderUpload } from 'react-icons/fa';
import IFC_horizontal from "../../assets/images/Logo_IFC_horizontal_Camboriu.png";
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="sm">
     
      <Navbar.Brand as={Link} to="/">
        Elibras Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Perfil
        </Nav.Link>
        <Nav.Link as={Link} to="/videos">
          Videos
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
