import './App.css';
import React , {useState} from 'react';
import { ethers } from 'ethers';
import HelloWorld_abi from './hello_abi.json';
import './components/button.css';

function App() {

  const contractAdress = '0x8BdC4b1Dc049880A29f624361Cd6B39A255E55e6';

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
    console.log(e.target.setText.value);
  }
  const getCurrentVal = async () => {
    let val = await contract.get();
    setCurrentContractVal(val);
  }
  var animateButton = function(e) {
    e.preventDefault();
     //reset animation
     e.target.classList.remove('animate');
     e.target.classList.add('animate');
     setTimeout(function(){
       e.target.classList.remove('animate');
     },700);
   };
   
   var bubblyButtons = document.getElementsByClassName("bubbly-button");
   var i = 0
   while (i < bubblyButtons.length)
   {
    bubblyButtons[i].addEventListener('click', animateButton, false);
    i++;
   }
  return (
    <div className="container-body">
      <div className="container-card">
        <div className="card"> 
            <h3 className="text-title"> Get/set Interaction with contract ! "</h3>
            <div className="flex-div">
              <button className="bubbly-button" onClick={connectWalletHandler}>       
                {connectButtonText}
              </button>
              <h3 className="text-title">Adress: {defaultAccount}</h3>
            </div>
              <form onSubmit={setHandler}>
                <div className="flex-div">
                  <button  className="bubbly-button" type={"submit"}>Update Contract</button>
                  <input  className="input-text"  placeholder="set your message to contract here"/>
                </div>
              </form>
              <div className="flex-div">
                <button className="bubbly-button" onClick={getCurrentVal}> Get Current Value </button>
                <h3 className="text-title">{currentContractVal}</h3>
              </div>
              {errorMessage}
            </div>
      </div> 
    </div>
  );
}

export default App;