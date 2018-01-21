import Client from 'bitcoin-core';

export default class BTCService {  

  constructor() {
    
    this.client = new Client({ 
      network: 'testnet',
      host: 'localhost'
      port: 18332
      ssl: false,
      username: 'admin',
      password: 'password'
    });
  }

  getBalance = async (address) => {
    const balance = await new Client().getBalance(address, 0);
    return balance;
  }
}