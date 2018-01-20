module.exports = {
  networks: {
    development: {
      gas : 2500000,
      gasPrice : 1,
      from : "0xd0b09220f32ec47b455b43d855eb75f1955635ad",
      host: "localhost",
      port: 4444,
      network_id: "*" // Match any network id
    }
  }
};