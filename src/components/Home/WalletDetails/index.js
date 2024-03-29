import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const WalletDetails = ({ walletDetails, link, linkName }) => (
  <Navbar bg="primary" variant="dark" className="mb-5">
    <Nav className="mr-auto">
      <Nav.Link href={link}>{linkName}</Nav.Link>
      <Nav.Link className="mr-auto"> {walletDetails?.name}</Nav.Link>
      <Nav.Link className="mr-auto"> ₹ {walletDetails?.balance}</Nav.Link>
    </Nav>
  </Navbar>
);

export default WalletDetails;
