import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = deployer.address;
  console.log("获取部署合约账户地址：", address);

  const TWO_WEEKS_IN_SECS = 14 * 24 * 60 * 60;
  const timestamp = Math.floor(Date.now() / 1000)
  const deadline = timestamp + TWO_WEEKS_IN_SECS;
  console.log('deadline:', deadline)

  const contractFactory = await ethers.getContractFactory("WorldCup");
  const deployContract = await contractFactory.deploy(deadline);
  await deployContract.waitForDeployment();

  const contractAddress = await deployContract.getAddress();
  console.log("合约部署地址：", contractAddress);

  // 获取部署合约信息保存到本地文件，供前端合约交互使用
  const contractInfos = {
    contractAddress,
  };

  // 将合约地址和部署账户信息生成json文件传给前端
  saveFrontendFiles("WorldCup", contractInfos);
}

function saveFrontendFiles(
  name: string,
  _contractInfos: {  contractAddress: string; }
) {
  const contractsAddressDir = "/../contractInfo";

  if (!fs.existsSync(contractsAddressDir)) {
    fs.mkdirSync(contractsAddressDir);
  }

  const path = contractsAddressDir + "/" + name + ".json";

  fs.writeFileSync(path, JSON.stringify(_contractInfos, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
