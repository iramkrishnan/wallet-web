import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL } from '../../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateWallet = ({ setWalletIdExists }) => {
  const [name, setName] = useState();
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);

  const registerWallet = async (e) => {
    e.preventDefault();
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
        toast.error(Object.values(error)[0], {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
            <ToastContainer />

            <Button color="blue" fluid size="large" loading={loading}>
              Create Wallet
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default CreateWallet;
