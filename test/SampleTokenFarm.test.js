const DappSampleExtractionToken = artifacts.require('DappSampleExtractionToken');
const DappSampleTransportToken = artifacts.require('DappSampleTransportToken');
const DappSampleUnboxingToken = artifacts.require('DappSampleUnboxingToken');
const DappAnalysisSampleToken = artifacts.require('DappAnalysisSampleToken');
const DappSampleReadyToken = artifacts.require('DappSampleReadyToken');
const SampleTokenFarm = artifacts.require('SampleTokenFarm');

require('chai')
  .use(require('chai-as-promised'))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('SampleTokenFarm', ([owner]) => {
  let sampleExtToken, sampleTransportToken, sampleUnboxingToken,
      analysisSampleToken, sampleReadyToken, sampleTokenFarm;

  before(async () => {
    // Load Contracts
    sampleExtToken = await DappSampleExtractionToken.new();
    sampleTransportToken = await DappSampleTransportToken.new();
    sampleUnboxingToken = await DappSampleUnboxingToken.new();
    analysisSampleToken = await DappAnalysisSampleToken.new();
    sampleReadyToken = await DappSampleReadyToken.new();
    sampleTokenFarm = await SampleTokenFarm.new(sampleExtToken.address, sampleTransportToken.address,
        sampleUnboxingToken.address, analysisSampleToken.address, sampleReadyToken.address);
  });

  describe('Mock DappSampleExtractionToken deployment', async () => {
    it('has a name', async () => {
      const name = await sampleExtToken.name();
      const symbol = await sampleExtToken.symbol();
      assert.equal(name, "DApp Sample Extraction Token");
      assert.equal(symbol, "DAPPSET");
    })
  });

  describe('Dapp DappSampleTransportToken deployment', async () => {
    it('has a name', async () => {
      const name = await sampleTransportToken.name();
      const symbol = await sampleTransportToken.symbol();
      assert.equal(name, "DApp Sample Transport Token");
      assert.equal(symbol, "DAPPSTT");
    })
  });

  describe('Mock DappSampleUnboxingToken deployment', async () => {
    it('has a name', async () => {
      const name = await sampleUnboxingToken.name();
      const symbol = await sampleUnboxingToken.symbol();
      assert.equal(name, 'DApp Sample Unboxing Token');
      assert.equal(symbol, "DAPPSUBT");
    })
  });

  describe('Dapp DappAnalysisSampleToken deployment', async () => {
    it('has a name', async () => {
      const name = await analysisSampleToken.name();
      const symbol = await analysisSampleToken.symbol();
      assert.equal(name, 'DApp Sample Analysis Token');
      assert.equal(symbol, "DAPPSANT");
    })
  });

  describe('Dapp DappSampleReadyToken deployment', async () => {
    it('has a name', async () => {
      const name = await sampleReadyToken.name();
      const symbol = await sampleReadyToken.symbol();
      assert.equal(name, 'DApp Sample Ready Token');
      assert.equal(symbol, "DAPPSOK");
    })
  });

  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await sampleTokenFarm.name();
      assert.equal(name, 'Dapp Sample Token Farm')
    });
  });

  describe('Farming tokens', async () => {

    it('rewards investors for staking Sample tokens', async () => {
      let result;

      // Stake Mock DAI Tokens
      await sampleExtToken.approve(sampleTokenFarm.address, tokens('1'), { from: owner });
      await sampleTokenFarm.stakeTokens(0, { from: owner });

      await sampleTransportToken.approve(sampleTokenFarm.address, tokens('1'), { from: owner });
      await sampleTokenFarm.stakeTokens(1, { from: owner });

      await sampleUnboxingToken.approve(sampleTokenFarm.address, tokens('1'), { from: owner });
      await sampleTokenFarm.stakeTokens(2, { from: owner });

      await analysisSampleToken.approve(sampleTokenFarm.address, tokens('1'), { from: owner });
      await sampleTokenFarm.stakeTokens(3, { from: owner });

      await sampleReadyToken.approve(sampleTokenFarm.address, tokens('1'), { from: owner });
      await sampleTokenFarm.stakeTokens(4, { from: owner });

      // Check staking result
      result = await sampleExtToken.balanceOf(sampleTokenFarm.address);
      assert.equal(result.toString(), tokens('1'), 'Token Farm Mock DAI balance correct after staking');

      result = await sampleTransportToken.balanceOf(sampleTokenFarm.address);
      assert.equal(result.toString(), tokens('1'), 'Token Farm Mock DAI balance correct after staking');

      result = await sampleUnboxingToken.balanceOf(sampleTokenFarm.address);
      assert.equal(result.toString(), tokens('1'), 'Token Farm Mock DAI balance correct after staking');

      result = await analysisSampleToken.balanceOf(sampleTokenFarm.address);
      assert.equal(result.toString(), tokens('1'), 'Token Farm Mock DAI balance correct after staking');

      result = await sampleReadyToken.balanceOf(sampleTokenFarm.address);
      assert.equal(result.toString(), tokens('1'), 'Token Farm Mock DAI balance correct after staking');
    })
  })

});
