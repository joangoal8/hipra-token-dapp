const HipraToken = artifacts.require('HipraToken');

module.exports = async function(deployer, network, accounts) {
  // Deploy HipraToken
  await deployer.deploy(HipraToken);
  const hipraToken = await HipraToken.deployed();
};
