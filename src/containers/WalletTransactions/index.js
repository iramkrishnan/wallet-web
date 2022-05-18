import { useEffect, useState } from 'react';
import { Table, Pagination, Button, Segment } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';
import csvDownload from 'json-to-csv-export';

import WalletDetails from '../../components/Home/WalletDetails';
import { API_URL } from '../../constants';
import './index.css';

const WalletTransactions = () => {
  const LIMIT = 10;
  const walletId = localStorage.getItem('walletId');

  const [walletDetails, setWalletDetails] = useState();
  const [transactionData, setTransactionData] = useState();
  const [activePage, setActivePage] = useState(1);
  const [sortColumn, setSortColumn] = useState('date');
  const [sortDirection, setSortDirection] = useState('descending');

  const getWalletTransactions = () => {
    const sortDirectionNumber = sortDirection === 'ascending' ? 1 : -1;
    axios
      .get(
        `${API_URL}/transactions?walletId=${walletId}&skip=${
          (activePage - 1) * LIMIT
        }&limit=${LIMIT}&sortBy=${sortColumn}&sortDirection=${sortDirectionNumber}`
      )
      .then((rs) => setTransactionData(rs.data.response));
  };

  const getWalletDetails = () => {
    axios
      .get(`${API_URL}/wallet/${walletId}`)
      .then((rs) => setWalletDetails(rs.data.response));
  };
  useEffect(() => {
    if (walletId) {
      getWalletTransactions();
      getWalletDetails();
    }
  }, [activePage, sortColumn, sortDirection]);

  const getAmountClassType = (type) =>
    type === 'CREDIT' ? 'green-amount' : 'red-amount';

  const getAmountText = (type, amount) =>
    type === 'CREDIT' ? `+${amount}` : `-${amount}`;

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const downloadCsv = () => {
    axios
      .get(`${API_URL}/transactions?walletId=${walletId}`)
      .then((rs) =>
        csvDownload(rs.data.response.transactions, 'transactions.csv')
      );
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    setSortDirection(
      sortDirection === 'descending' ? 'ascending' : 'descending'
    );
  };

  return (
    <div>
      <WalletDetails walletDetails={walletDetails} link="/" linkName="Home" />
      <Segment floated="right">
        Download CSV{' '}
        <Button onClick={downloadCsv} size="large" icon="cloud download" />
      </Segment>
      <Table fixed striped sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={sortColumn === 'date' ? sortDirection : null}
              onClick={() => handleSort('date')}
            >
              Date
            </Table.HeaderCell>
            <Table.HeaderCell>Transaction ID</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === 'amount' ? sortDirection : null}
              onClick={() => handleSort('amount')}
            >
              Amount
            </Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {transactionData?.transactions.map((t) => (
          <Table.Body>
            <Table.Row>
              <Table.Cell>{moment(t.date).format('lll')}</Table.Cell>
              <Table.Cell>{t.id}</Table.Cell>
              <Table.Cell className={getAmountClassType(t.type)}>
                {t.type}
              </Table.Cell>
              <Table.Cell className={getAmountClassType(t.type)}>
                {getAmountText(t.type, t.amount)}
              </Table.Cell>
              <Table.Cell>{t.description || 'NA'}</Table.Cell>
              <Table.Cell>{t.balance}</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
        {transactionData && transactionData.totalCount > LIMIT ? (
          <div className="ops-dashboard-pagination">
            <Pagination
              boundaryRange={0}
              activePage={activePage}
              ellipsisItem={null}
              firstItem={1}
              onPageChange={handlePaginationChange}
              lastItem={
                transactionData &&
                transactionData.totalCount &&
                Math.ceil(transactionData.totalCount / LIMIT)
              }
              siblingRange={1}
              totalPages={
                transactionData &&
                transactionData.totalCount &&
                Math.ceil(transactionData.totalCount / LIMIT)
              }
            />
          </div>
        ) : null}
      </Table>
      )
    </div>
  );
};

export default WalletTransactions;
