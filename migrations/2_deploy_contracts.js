const DappSampleExtractionToken = artifacts.require('DappSampleExtractionToken');
const DappSampleTransportToken = artifacts.require('DappSampleTransportToken');
const DappSampleUnboxingToken = artifacts.require('DappSampleUnboxingToken');
const DappAnalysisSampleToken = artifacts.require('DappAnalysisSampleToken');
const DappSampleReadyToken = artifacts.require('DappSampleReadyToken');
const SampleTokenFarm = artifacts.require('SampleTokenFarm');

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DApp Extraction Token
  await deployer.deploy(DappSampleExtractionToken);
  const dappSampleExtractionToken = await DappSampleExtractionToken.deployed();

  // Deploy DappTransport Token
  await deployer.deploy(DappSampleTransportToken);
  const dappSampleTransportToken = await DappSampleTransportToken.deployed();

  // Deploy DappSampleUnboxingToken Token
  await deployer.deploy(DappSampleUnboxingToken);
  const dappSampleUnboxingToken = await DappSampleUnboxingToken.deployed();

  // Deploy DappAnalysisSampleToken Token
  await deployer.deploy(DappAnalysisSampleToken);
  const dappAnalysisSampleToken = await DappAnalysisSampleToken.deployed();

  // Deploy DappSampleReadyToken Token
  await deployer.deploy(DappSampleReadyToken);
  const dappSampleReadyToken = await DappSampleReadyToken.deployed();

  // Deploy SampleTokenFarm
  await deployer.deploy(SampleTokenFarm, dappSampleExtractionToken.address, dappSampleTransportToken.address,
      dappSampleUnboxingToken.address, dappAnalysisSampleToken.address, dappSampleReadyToken.address);
  const tokenFarm = await SampleTokenFarm.deployed();

  // Transfer 100 Mock Sample tokens to Hypra
  await dappSampleExtractionToken.transfer(accounts[1], '100000000000000000000');
  await dappSampleTransportToken.transfer(accounts[1], '100000000000000000000');
  await dappSampleUnboxingToken.transfer(accounts[1], '100000000000000000000');
  await dappAnalysisSampleToken.transfer(accounts[1], '100000000000000000000');
  await dappSampleReadyToken.transfer(accounts[1], '100000000000000000000');
};
