const HipraToken = artifacts.require('HipraTokenFactory');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('HipraTokenFactory', ([owner]) => {
  let hipraToken;

  before(async () => {
    // Load Contracts
    hipraToken = await HipraToken.new();
  });

  describe('hipra token deployment', async () => {
    it('check', async () => {
      console.log(hipraToken);
    })
  });

});
