const GoodwillChainMain = artifacts.require('GoodwillChainMain');
const GCToken = artifacts.require('GCToken');

module.exports = async function (deployer) {
    deployer.deploy(GoodwillChainMain);
    deployer.deploy(GCToken);
    const GCMain = await GoodwillChainMain.deployed();
    const GCT = await GCToken.deployed();

    const MINTER_ROLE = web3.utils.soliditySha3("MINTER_ROLE");
    await GCT.grantRole(MINTER_ROLE, GCMain.address);

    await GCMain.setOrgAddress("0x29398D6764Ec9a94653cF04845ABc0c2D758BC2d");
}