import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Radio,
  Label,
} from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_URL } from '../../../constants';

const AddTransaction = ({ walletId, setWalletDetails, walletDetails }) => {
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState('DEBIT');
  const [loading, setLoading] = useState(false);

  const addTransaction = async (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${API_URL}/transact/${walletId}`, {
        amount: type === 'DEBIT' ? -Math.abs(amount) : Math.abs(amount),
        description,
      })
      .then((res) => {
        setWalletDetails({
          ...walletDetails,
          balance: res.data.response.balance,
        });

        toast.success('Transaction Added Successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      })
      .catch((err) => {
        const error =
          err.response.data.statusCode === 500
            ? err.response.data.statusMessage
            : Object.values(err.response.data.response)[0];
        setLoading(false);
        toast.error(error, {
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
    <Grid textAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          Add a Transaction
        </Header>
        <Form size="large" onSubmit={addTransaction}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="rupee"
              iconPosition="left"
              placeholder="Amount"
              value={amount}
              onChange={(e, { value }) => setAmount(value)}
              required
            />
            <Form.Input
              fluid
              icon="comment"
              iconPosition="left"
              placeholder="Description"
              value={description}
              onChange={(e, { value }) => setDescription(value)}
            />
            <Label color="green" horizontal>
              Credit
            </Label>
            <Radio
              toggle
              value={type === 'DEBIT' ? 'CREDIT' : 'DEBIT'}
              checked={type === 'DEBIT'}
              onChange={(e, { value }) => setType(value)}
            />
            <Label color="red" horizontal>
              Debit
            </Label>

            <ToastContainer />

            <Button color="blue" fluid size="large" loading={loading}>
              Add Transaction
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default AddTransaction;
