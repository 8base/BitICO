import Client from 'bitcoin-core';
import bitcoin from 'bitcoinjs-lib';
import config from '../config.js'

// TODO: temporary hack, because of RSK whitelisitng
const BANK_ADDRESS = "mybLjNKLvHdvpqgSVnKFhpiMtfsgTzX9RQ";
const BURN_ADDRESS = "2N3XnkVSuT3Z3sACyyYvSDEkzDN9QTeiuQG";

export default class BTCService {  

  constructor() {
    
    this.client = new Client({ 
      network: 'testnet',
      host: config.btc.host,
      port: config.btc.port,
      ssl: false,
      username: 'admin',
      password: 'password'
    });
  }

  generateKeyPair = () => {
    const testnet = bitcoin.networks.testnet
    const keyPair = bitcoin.ECPair.makeRandom({ network: testnet });
    return keyPair;
  }

  importKeys = ( publicKey, privateKey ) => {
    return this.client.importPrivKey(privateKey, publicKey, false);
  }

  createAccount = () => {   
    const keyPair = this.generateKeyPair();
    const address = keyPair.getAddress();
    const privateKey = keyPair.toWIF();
    this.importKeys(address, privateKey);
    return address;
  }  

  dumpPrivateKey = ( publicKey ) => {
    return this.client.dumpPrivKey(publicKey);
  }

  sendToAddress = ( address, amount ) => {
    return this.client.sendToAddress(address, amount, null, null, true);
  };

  sendFrom = ( from, to, amount ) => {
    return this.client.sendFrom(from, to, amount, 0);
  }

  transferToRSK = async ( fromBTC, toRSK, amount, rskService ) => {
    // TODO: Temporary hack because RSK require whitelisting of addresses currently
    this.sendFrom(fromBTC, BURN_ADDRESS, amount).then(async (res) => {
      // Send from RSK bank
      console.log("acceptBTCTransfer", await rskService.acceptBTCTransfer(toRSK, amount));
    }).catch((err) => {
      console.log("Error:", err);
    });
  }

  buyTokens = ( btcAddress, rskAddress, value, rskService) => {
    return new Promise((resolve, reject) => {
      this.transferToRSK(btcAddress, rskAddress, value, rskService).then(async (res) => {
        const txHash = await rskService.buyTokens(rskAddress, value);
        resolve(txHash);
      });
    });
  }

  getBalance = (account, numconf) => {
    return this.client.getBalance(account, numconf);    
  }

  getAccount = (address) => {
    return this.client.getAccount(address);
  }
}