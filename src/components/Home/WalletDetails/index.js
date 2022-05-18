import React from 'react';
import { Card } from 'semantic-ui-react';

const WalletDetails = ({ walletDetails }) => (
  <div style={{ display: 'flex', items: 'center' }}>
    <Card>
      <Card.Content>
        <Card.Header>{walletDetails?.name}</Card.Header>
        <Card.Description>
          Wallet balance: ₹{walletDetails?.balance}
        </Card.Description>
      </Card.Content>
    </Card>
  </div>
);

export default WalletDetails;
