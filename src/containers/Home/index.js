import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AddTransaction from '../../components/Home/AddTransaction';
import CreateWallet from '../../components/Home/CreateWallet';
import WalletDetails from '../../components/Home/WalletDetails';
import { API_URL } from '../../constants';

const Home = () => {
  const walletId = localStorage.getItem('walletId');

  const [walletIdExists, setWalletIdExists] = useState(walletId ? true : false);
  const [walletDetails, setWalletDetails] = useState();

  const getWalletDetails = () => {
    axios
      .get(`${API_URL}/wallet/${walletId}`)
      .then((rs) => setWalletDetails(rs.data.response));
  };

  useEffect(() => {
    if (walletId) {
      getWalletDetails();
    }
  }, []);

  return !walletIdExists ? (
    <CreateWallet setWalletIdExists={setWalletIdExists} />
  ) : (
    <>
      <WalletDetails walletDetails={walletDetails} />
      <AddTransaction />
    </>
  );
};

export default Home;
