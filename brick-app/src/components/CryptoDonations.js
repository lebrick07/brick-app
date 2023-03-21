// import CryptoDonate from "dot-crypto-donate-react"
// import React from "react";

// <CryptoDonate
//   cryptoDomain="lebrick07.eth"
//   infuraApi="7dc42cded56a4d479e707e251e00d321"
//   colors={{
//     primary: "#2096f3",
//     secondary: "#fde199",
//     button: "#1a78c2",
//     buttonSecondary: "#fab601",
//     text: "#ffffff",
//   }}
//   text={{
//     title: "Donate",
//     thanks: "Thank you for donating, see the below link for transaction",
//     copied: "Address copied, please donate via wallet",
//   }}
// />

import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

const CryptoDonations = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const init = async () => {
      const ethereumProvider = await detectEthereumProvider();
      if (ethereumProvider) {
        setProvider(ethereumProvider);
      } else {
        alert('Please install MetaMask or another compatible Ethereum wallet!');
      }
    };
    init();
  }, []);

  const connectWallet = async () => {
    if (provider && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        setConnected(true);
      } catch (err) {
        console.error(err);
        alert('Failed to connect to wallet.');
      }
    } else {
      alert('Please install MetaMask or another compatible Ethereum wallet!');
    }
  };

  const sendDonation = async (amount) => {
    if (provider && account) {
      const web3 = new Web3(provider);
      const donationAddress = '0x21b68c364aCe7292f871F0a5a50956C3D1E16bd8';
      const amountInWei = web3.utils.toWei(amount, 'ether');

      try {
        await web3.eth.sendTransaction({
          from: account,
          to: donationAddress,
          value: amountInWei,
        });
        alert('Donation sent!');
      } catch (err) {
        console.error(err);
        alert('Failed to send donation.');
      }
    } else {
      alert('Please connect to an Ethereum wallet.');
    }
  };

  return (
    <div>
      {!connected ? (
        <button onClick={connectWallet} style={{ fontSize: '0.8rem', color: '#555', border: 'none', fontWeight: 'bold' }}>
          Connect ETH Wallet to Donate
        </button>
      ) : (
        <>
          <input
            type="number"
            step="0.01"
            placeholder="ETH"
            onChange={(e) => setAmount(e.target.value)}
            style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#555', background: 'transparent', border: 'none', borderBottom: '1px solid #555', width: '4rem', marginRight: '0.5rem' }}
          />
          <button onClick={() => sendDonation(amount)} style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#555', background: 'transparent', border: 'none' }}>
            Donate
          </button>
        </>
      )}
      <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#555', marginTop: '0.5rem', textAlign: 'center' }}>
        Your support helps us build a better future. Thank you!
      </p>
    </div>
  );
    
};

export default CryptoDonations;

