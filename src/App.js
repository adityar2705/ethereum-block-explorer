import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

//https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App (){
  const [blockData, setBlockData] = useState(null); 

  const fetchBlockData = async () => {
    try {
      const blockNumber = await alchemy.core.getBlockNumber();
      const block = await alchemy.core.getBlockWithTransactions(blockNumber);
      setBlockData(block);
    } catch (error) {
      console.error('Error fetching block data:', error);
    }
  };

  useEffect(() => {
    fetchBlockData();
  }, []); 

  return (
    <div className="App">
      {blockData ? (
        <>
          <h2>Block Explorer</h2>
          <p>Block Number: {blockData.number}</p>
          <p>Block Hash: {blockData.hash}</p>
          <p>Timestamp: {blockData.timestamp}</p>
          <p>Nonce: {blockData.nonce}</p>
          <h2>Transactions</h2>
          {blockData.transactions.length > 0 ? (
            <ul>
              {blockData.transactions.map((transaction, index) => (
                <li key={index}>
                  <p>Transaction Index: {index + 1}</p>
                  <p>From: {transaction.from}</p>
                  <p>To: {transaction.to}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions found in this block.</p>
          )}
        </>
      ) : (
        <p>Loading block data...</p>
      )}
    </div>
  );
};
export default App;
