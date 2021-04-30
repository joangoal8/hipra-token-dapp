import React, { Component } from 'react'
import Web3 from 'web3'
import DappSampleExtractionToken from '../abis/DappSampleExtractionToken.json'
import DappSampleTransportToken from '../abis/DappSampleTransportToken.json'
import DappSampleUnboxingToken from '../abis/DappSampleUnboxingToken.json'
import DappAnalysisSampleToken from '../abis/DappAnalysisSampleToken.json'
import DappSampleReadyToken from '../abis/DappSampleReadyToken.json'
import SampleTokenFarm from '../abis/SampleTokenFarm.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

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

    // Load DappSampleExtractionToken
    const sampleExtractionTokenData = DappSampleExtractionToken.networks[networkId];
    if(sampleExtractionTokenData) {
      const sampleExtToken = new web3.eth.Contract(DappSampleExtractionToken.abi, sampleExtractionTokenData.address);
      this.setState({ sampleExtToken });
      let sampleExtTokenBalance = await sampleExtToken.methods.balanceOf(this.state.account).call();
      this.setState({ daiTokenBalance: sampleExtTokenBalance.toString() })
    } else {
      window.alert('DappSampleExtractionToken contract not deployed to detected network.')
    }

    // Load DappSampleTransportToken
    const sampleTransportTokenData = DappSampleTransportToken.networks[networkId];
    if(sampleTransportTokenData) {
      const sampleTransportToken = new web3.eth.Contract(DappSampleTransportToken.abi, sampleTransportTokenData.address);
      this.setState({ sampleTransportToken });
      let sampleTransportTokenBalance = await sampleTransportToken.methods.balanceOf(this.state.account).call();
      this.setState({ sampleTransportTokenBalance: sampleTransportTokenBalance.toString() })
    } else {
      window.alert('DappSampleTransportToken contract not deployed to detected network.')
    }

    // Load DappSampleUnboxingToken
    const sampleUnboxingTokenData = DappSampleUnboxingToken.networks[networkId];
    if(sampleUnboxingTokenData) {
      const sampleUnboxingToken = new web3.eth.Contract(DappSampleUnboxingToken.abi, sampleUnboxingTokenData.address);
      this.setState({ sampleUnboxingToken });
      let sampleUnboxingTokenBalance = await sampleUnboxingToken.methods.balanceOf(this.state.account).call();
      this.setState({ sampleUnboxingTokenBalance: sampleUnboxingTokenBalance.toString() })
    } else {
      window.alert('DappSampleUnboxingToken contract not deployed to detected network.')
    }

    // Load DappAnalysisSampleToken
    const sampleAnalysisTokenData = DappAnalysisSampleToken.networks[networkId];
    if(sampleAnalysisTokenData) {
      const sampleAnalysisToken = new web3.eth.Contract(DappAnalysisSampleToken.abi, sampleAnalysisTokenData.address);
      this.setState({ sampleAnalysisToken });
      let sampleAnalysisTokenBalance = await sampleAnalysisToken.methods.balanceOf(this.state.account).call();
      this.setState({ sampleAnalysisTokenBalance: sampleAnalysisTokenBalance.toString() })
    } else {
      window.alert('DappAnalysisSampleToken contract not deployed to detected network.')
    }

    // Load DappAnalysisSampleToken
    const sampleReadyTokenData = DappSampleReadyToken.networks[networkId];
    if(sampleReadyTokenData) {
      const sampleReadyToken = new web3.eth.Contract(DappSampleReadyToken.abi, sampleReadyTokenData.address);
      this.setState({ sampleReadyToken });
      let sampleReadyTokenBalance = await sampleReadyToken.methods.balanceOf(this.state.account).call();
      this.setState({ sampleReadyTokenBalance: sampleReadyTokenBalance.toString() })
    } else {
      window.alert('DappSampleReadyToken contract not deployed to detected network.')
    }

    // Load SampleTokenFarm
    const sampleTokenFarmData = SampleTokenFarm.networks[networkId];
    if(sampleTokenFarmData) {
      const tokenFarm = new web3.eth.Contract(SampleTokenFarm.abi, sampleTokenFarmData.address);
      this.setState({ tokenFarm });
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call();
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
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

  stakeTokens = (step) => {
    this.setState({ loading: true });
    let amount = window.web3.utils.toWei('1', 'Ether');
    switch (step) {
      case '0':
        this.state.sampleExtToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.state.tokenFarm.methods.stakeTokens(step).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
        });
        break;
      case '1':
        this.state.sampleTransportToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.state.tokenFarm.methods.stakeTokens(step).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
        });
        break;
      case '2':
        this.state.sampleUnboxingToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.state.tokenFarm.methods.stakeTokens(step).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
        });
        break;
      case '3':
        this.state.sampleAnalysisToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.state.tokenFarm.methods.stakeTokens(step).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
        });
        break;
      case '4':
        this.state.sampleReadyToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.state.tokenFarm.methods.stakeTokens(step).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
        });
        break;
      default:
        window.alert('Step not allowed');
        break;
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      sampleExtToken: {},
      sampleTransportToken: {},
      sampleUnboxingToken: {},
      sampleAnalysisToken: {},
      sampleReadyToken: {},
      tokenFarm: {},
      sampleExtTokenBalance: '0',
      sampleTransportTokenBalance: '0',
      sampleUnboxingTokenBalance: '0',
      sampleAnalysisTokenBalance: '0',
      sampleReadyTokenBalance: '0',
      loading: true
    }
  }

  render() {
    let content;
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        sampleExtTokenBalance={this.state.sampleExtTokenBalance}
        sampleTransportTokenBalance={this.state.sampleTransportTokenBalance}
        sampleUnboxingTokenBalance={this.state.sampleUnboxingTokenBalance}
        sampleAnalysisTokenBalance={this.state.sampleAnalysisTokenBalance}
        sampleReadyTokenBalance={this.state.sampleReadyTokenBalance}
        stakeTokens={this.stakeTokens}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
