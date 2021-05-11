import React, { Component } from 'react'
import Web3 from 'web3'
import HipraToken from '../abis/HipraTokenFactory.json'
import Navbar from './Navbar'
import Home from '../pages/Home'
import Manager from '../pages/Manager'
import Controller from '../pages/Controller'
import Researcher from '../pages/Researcher'
import Error from "../pages/Error";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import Tokens from "../pages/Tokens";
import Patient from "../pages/Patient";

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();

    // Load HipraToken
    const hipraTokenData = HipraToken.networks[networkId];
    if(hipraTokenData) {
      const hipraToken = new web3.eth.Contract(HipraToken.abi, hipraTokenData.address);
      this.setState({ hipraToken: hipraToken });
      let controlTokens = await this.state.hipraToken.methods.getMyControlTokens(accounts[0]).call();
      this.setState({controlTokens});
      let promises = [];
      controlTokens.forEach(tokenId => {
        promises.push(this.state.hipraToken.methods.getControlTokenInfo(accounts[0], tokenId).call());
      });
      const tokenControlInfos = await Promise.all(promises);
      this.setState({tokenControlInfos});
      let resultToken = await this.state.hipraToken.methods.getMyResultToken(accounts[0]).call();
      this.setState({resultToken});
      const tokenResultInfos = await this.state.hipraToken.methods.getResultTokenInfo(accounts[0], resultToken).call();
      this.setState({tokenResultInfos});
    } else {
      window.alert('DappSampleExtractionToken contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  addNewAdmin = (sender) => {
    this.state.hipraToken.methods.addAdmin(sender).send({ from: this.state.account }).on('transactionHash', (hash) => {
      console.log("Done Add admin to manage app")
    })
  };

  addNewController = (sender) => {
    this.state.hipraToken.methods.addController(sender).send({ from: this.state.account }).on('transactionHash', (hash) => {
      console.log("Done Add controller to track sample")
    })
  };

  addNewResearcher = (sender) => {
    this.state.hipraToken.methods.addResearcher(sender).send({ from: this.state.account }).on('transactionHash', (hash) => {
      console.log("Done Add researcher to provide results")
    })
  };

  linkPatientSample = (sender) => {
    this.state.hipraToken.methods.setSample(sender).send({ from: this.state.account }).on('transactionHash', (hash) => {
      console.log("Done Set Sample")
    })
  };

  addControlCheck = (sender, isValid, description, temperature = 999, humidity = 999, brightness = 999) => {
    this.state.hipraToken.methods.setControlCheck(sender, isValid, description, temperature, humidity, brightness).send({ from: this.state.account }).on('transactionHash', (hash) => {
      console.log("Done Set control check")
    })
  };

  addResult = (sender, description, result) => {
    this.state.hipraToken.methods.setResults(sender, description, result).send({ from: this.state.account }).on('transactionHash', (hash) => {
      console.log("Done Set Result check")
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      hipraToken: {},
      loading: true
    }
  }

  render() {

    return (
        <>
          <Router>
            <Navbar account={this.state.account} />
            <Switch>
              <Route path='/' exact component={() => <Home addControlCheck={this.addControlCheck} addResult={this.addResult}/>} />
              <Route path='/managers' component={() => <Manager addNewAdmin={this.addNewAdmin}/>} />
              <Route path='/controllers' component={() => <Controller addNewController={this.addNewController}/>} />
              <Route path='/researchers' component={() => <Researcher addNewResearcher={this.addNewResearcher}/>} />
              <Route path='/patients' component={() => <Patient linkPatientSample={this.linkPatientSample}/>} />
              <Route path='/tokens' component={() => <Tokens controlTokens={this.state.tokenControlInfos} resultTokens={this.state.tokenResultInfos}/>} />
              <Route path='/*' component={Error} />
            </Switch>
          </Router>
        </>
    );
  }
}

export default App;
