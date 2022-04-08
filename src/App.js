import './App.css';
import React , {useState} from 'react';
import { ethers } from 'ethers';
import HelloWorld_abi from './hello_abi.json';

function App() {

  const contractAdress = '0x76C3353c48e333c329B2A2c7632669352ADcae9A';

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState('Connect Wallet');
  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [singner, setSingner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum)
    {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result=>{
        accountChangeHandler(result[0]);
        setConnectButtonText('Wallet Connected');
      })
    }
    else
    {
      setErrorMessage('Need to install Metamask');
    }
  }

  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  }
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSingner(tempSigner);

    let temContract = new ethers.Contract(contractAdress, HelloWorld_abi, tempSigner);
    setContract(temContract);
  }
  const setHandler = (e) => {
    e.preventDefault();
    contract.set(e.target.setText.value);
  }
  const getCurrentVal = async () => {
    let val = await contract.get();
    setCurrentContractVal(val);
  }
  return (
    <div className="container-body">
      <div className="container-card">
        <div className="card"> 
            <h3 className="text-title"> Get/set Interaction with contract ! "</h3>
              <button className="awesome-button" onClick={connectWalletHandler}>
                {connectButtonText}
              </button>
              <h3 className="text-title">Adress: {defaultAccount}</h3>
              <form onSubmit={setHandler}>
                <div className="flex-div">
                  <input className="input-text" id="setText" type="text" />
                  <button  className="awesome-button" type={"submit"}>Update Contract</button>
                </div>
              </form>
              <button onClick={getCurrentVal}> Get Current Value </button>
              <h3 className="text-title">
              {currentContractVal}
              {errorMessage}
              </h3>
            </div>
      </div> 
    </div>
  );
}

export default App;