import { ethers } from "hardhat";

async function main() {

  const totalSupply = ethers.parseUnits('10000000', 18)
  console.log('totalSupply:', totalSupply);
  
  const WCToken = await ethers.getContractFactory('WorldCupToken');

  const wct = await WCToken.deploy("World Cup Token", "WCT", totalSupply);
  await wct.waitForDeployment();

  console.log(`new World Cup Token deployed to ${wct.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
