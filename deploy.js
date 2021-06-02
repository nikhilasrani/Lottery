const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const dotenv = require("dotenv").config();

const seed_phase = process.env.SEED_PHASE;
const network_url = process.env.NETWORK_URL;

const provider = new HDWalletProvider(seed_phase, network_url);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: 1000000, from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();
