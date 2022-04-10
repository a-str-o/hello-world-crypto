import './App.css';
import React , {useState} from 'react';
import { ethers } from 'ethers';
import HelloWorld_abi from './hello_abi.json';
import './components/button.css';

function App() {

  const contractAdress = '0xD86cea4e650347057397af28EB5Fbe961ABe20C2';

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState("0x0000000000000000000000000000000000000000");
  const [connectButtonText, setConnectButtonText] = useState('Connect Wallet');
  const [currentContractVal, setCurrentContractVal] = useState("you'r message will display here");

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
    setTimeout(() => {  alert("contract was updated");; }, 5000);
    
  }

  const getCurrentVal = async () => {
    let val = await contract.get();
    setCurrentContractVal(val);
  } 
 
  var animateButton = function(e) {
     e.preventDefault();
     e.target.classList.remove('animate');
     e.target.classList.add('animate');
     setTimeout(function(){e.target.classList.remove('animate');},1000);
   };
    var bubblyButtons = document.getElementsByClassName("bubbly-button");
    for (var i = 0; i < bubblyButtons.length; i++)
    {
      bubblyButtons[i].addEventListener('click', animateButton, false);
    }
  return (
    <div className="container-body">
      <div className="container-card">
        <div className="card"> 
            <h3 className="text-title">Get/set Interaction with contract ! "</h3>
            <div className="flex-div">
              <h3 className="text-title">Adress: {defaultAccount}</h3>
              <button className="bubbly-button" onClick={connectWalletHandler}>       
                {connectButtonText}
              </button>
            </div>
            <form onSubmit={setHandler}>
              <input  id="setText" type="text" />
              <button className="butt" type={"submit"}>Update Contract</button>
            </form>
              <div className="flex-div">
                <h3 className="text-title">{currentContractVal}</h3>
                <button className="bubbly-button" onClick={getCurrentVal}> 
                    Get Current Value 
                </button>
              </div>
              {errorMessage}
            </div>
      </div> 
    </div>
  );
}

export default App;