// import React, { useState, useEffect } from 'react';
// import detectEthereumProvider from '@metamask/detect-provider';
// import Web3 from 'web3';

// const CryptoDonations = () => {
//   const [provider, setProvider] = useState(null);
//   const [account, setAccount] = useState('');
//   const [amount, setAmount] = useState('');
//   const [connected, setConnected] = useState(false);

//   useEffect(() => {
//     const init = async () => {
//       const ethereumProvider = await detectEthereumProvider();
//       if (ethereumProvider) {
//         setProvider(ethereumProvider);
//       }
//     };
//     init();
//   }, []);  

//   const connectWallet = async () => {
//     if (provider && window.ethereum) {
//       try {
//         const accounts = await window.ethereum.request({
//           method: 'eth_requestAccounts',
//         });
//         setAccount(accounts[0]);
//         setConnected(true);
//       } catch (err) {
//         console.error(err);
//         alert('Failed to connect to wallet.');
//       }
//     } else {
//       alert('Please install MetaMask or another compatible Ethereum wallet!');
//     }
//   };

//   const sendDonation = async (amount) => {
//     if (provider && account) {
//       const web3 = new Web3(provider);
//       const donationAddress = '0x21b68c364aCe7292f871F0a5a50956C3D1E16bd8';
//       const amountInWei = web3.utils.toWei(amount, 'ether');

//       try {
//         await web3.eth.sendTransaction({
//           from: account,
//           to: donationAddress,
//           value: amountInWei,
//         });
//         alert('Donation sent!');
//       } catch (err) {
//         console.error(err);
//         alert('Failed to send donation.');
//       }
//     } else {
//       alert('Please connect to an Ethereum wallet.');
//     }
//   };

//   return (
//     <div>
//       {!connected ? (
//         <button onClick={connectWallet} style={{ fontSize: '0.8rem', color: '#555', border: 'none', fontWeight: 'bold' }}>
//           Connect ETH Wallet to Donate
//         </button>
//       ) : (
//         <>
//           <input
//             type="number"
//             step="0.01"
//             placeholder="ETH"
//             onChange={(e) => setAmount(e.target.value)}
//             style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#555', background: 'transparent', border: 'none', borderBottom: '1px solid #555', width: '4rem', marginRight: '0.5rem' }}
//           />
//           <button onClick={() => sendDonation(amount)} style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#555', background: 'transparent', border: 'none' }}>
//             Donate
//           </button>
//         </>
//       )}
//       <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#555', marginTop: '0.5rem', textAlign: 'center' }}>
//         Your support helps us build a better future. Thank you!
//       </p>
//     </div>
//   );
    
// };

// export default CryptoDonations;

import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { useTheme } from '@mui/material/styles';
import { Button, Typography, TextField } from '@mui/material';

const CryptoDonations = () => {
  const theme = useTheme();
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const init = async () => {
      const ethereumProvider = await detectEthereumProvider();
      if (ethereumProvider) {
        setProvider(ethereumProvider);
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
        <Button
          onClick={connectWallet}
          variant="contained"
          size="small"
          sx={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: theme.palette.text.primary,
          }}
        >
          Connect ETH Wallet to Donate
        </Button>
      ) : (
        <>
          <TextField
            type="number"
            step="0.01"
            placeholder="ETH"
            onChange={(e) => setAmount(e.target.value)}
            sx={{
              fontSize: '0.8rem',
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${theme.palette.text.primary}`,
              width: '4rem',
              marginRight: '0.5rem',
            }}
          />
          <Button
            onClick={() => sendDonation(amount)}
            variant="contained"
            size="small"
            sx={{
              fontSize: '0.8rem',
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              background: 'transparent',
              border: 'none',
            }}
          >
            Donate
          </Button>
        </>
      )}
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: '1rem',
          fontStyle: 'italic',
          color: theme.palette.text.primary,
          marginTop: '0.5rem',
          textAlign: 'center',
        }}
      >
        Your support helps us build a better future. Thank you!
      </Typography>
    </div>
  );
};

export default CryptoDonations;