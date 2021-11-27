const GoodwillChain = artifacts.require('GoodwillChain');
const GoodwillChainToken = artifacts.require('GoodwillChainToken');

module.exports = async function (deployer) {
    deployer.deploy(GoodwillChain);
    deployer.deploy(GoodwillChainToken);

    const GCMain = await GoodwillChain.deployed();
    const GCToken = await GoodwillChainToken.deployed();

    const MINTER_ROLE = web3.utils.soliditySha3("MINTER_ROLE");
    await GCToken.grantRole(MINTER_ROLE, GCMain.address);

    await GCMain.setOrgAddress("");
}