import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL } from '../../../constants';

const CreateWallet = ({ setWalletIdExists }) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const registerWallet = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    axios
      .post(`${API_URL}/setup`, {
        name,
        balance,
      })
      .then((res) => {
        localStorage.setItem('walletId', res.data.response.id);
        setWalletIdExists(true);
        setLoading(false);
      })
      .catch((err) => {
        const error = err.response.data.response;
        setLoading(false);
        setError(Object.values(error)[0]);
      });
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          Create a new wallet
        </Header>
        <Form size="large" onSubmit={registerWallet}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="money"
              iconPosition="left"
              placeholder="Name"
              value={name}
              required
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Input
              fluid
              icon="rupee"
              iconPosition="left"
              placeholder="Initial Balance"
              value={balance}
              onChange={(e, { value }) => setBalance(value)}
            />
            {error}

            <Button color="blue" fluid size="large" loading={loading}>
              Create Wallet
            </Button>
            {`loading ==> ${loading}`}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default CreateWallet;
