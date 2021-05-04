/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

//
// Select the network you want to deploy to here:
//
const defaultNetwork = "mainnet";

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
  return "";
}

module.exports = {
  defaultNetwork,
  networks: {
    // hardhat: {
    //   gas: 12000000,
    //   blockGasLimit: 0x1fffffffffffff,
    //   allowUnlimitedContractSize: true,
    //   timeout: 1800000,
    // },
    hardhat: {
      forking: {
        url: `https://mainnet.infura.io/v3/412acf21edf5444a8c9f6bd737cf8ca3`,
        blockNumber: 12069925,
      },
    },
    localhost: {
      url: "http://localhost:8545",
      allowUnlimitedContractSize: true,
      timeout: 1800000,

      /*
		 notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
		 (you can put in a mnemonic here to set the deployer locally)
	   */
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", //<---- YOUR INFURA ID! (or it won't work)
      accounts: [process.env.KEY],
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad",
      accounts: [process.env.KEY],
      gasPrice: 50000000000,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", //<---- YOUR INFURA ID! (or it won't work)
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
      gasPrice: 15000000000,
    },
    goerli: {
      url: "https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", //<---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    matic: {
      url: `https://rpc-mainnet.maticvigil.com/v1/${process.env.MATIC}`,
      // gasPrice: 1000,
      accounts: [],
    },
    xdai: {
      url: "https://dai.poa.network",
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN,
    url: "https://api.etherscan.io/",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 2000000,
  },
};
