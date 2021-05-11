const HipraToken = artifacts.require('HipraTokenFactory');

module.exports = async function(deployer) {
  // Deploy HipraToken
  await deployer.deploy(HipraToken);
};
