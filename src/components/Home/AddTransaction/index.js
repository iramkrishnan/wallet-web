import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Radio,
  Label,
} from 'semantic-ui-react';

const AddTransaction = () => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="blue" textAlign="center">
        Add a Transaction
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="rupee"
            iconPosition="left"
            placeholder="Amount"
          />
          <Form.Input
            fluid
            icon="comment"
            iconPosition="left"
            placeholder="Description"
          />
          <Label color="green" horizontal>
            Credit
          </Label>
          <Radio toggle />
          <Label color="red" horizontal>
            Debit
          </Label>

          <Button color="blue" fluid size="large">
            Add Transaction
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default AddTransaction;
