import Web3 from 'web3';
const abi = require('./abi_ducks_0.json');

const contractAddress ='0x8f9a7cf07a3ccff0a954ec92cbc2f61059f7d5ed';
const SUCCESS_STATUS = 'success';
const LOGIN_STATUS = 'login';
const MISS_STATUS = 'miss';
const GOOD_NETWORK_STATUS = 'good_newtwork';
const BAD_NETWORK_STATUS = 'bad_newtwork';

let localWeb3,
  contractInstance,
  userAccount,
  accountInterval,
  status,
  cb;

let stat,
  currRate,
  total,
  tokens,
  betting,
  prices;

export default {
  init: function () {
    return this.getNetwork().then(() => {
     contractInstance = new localWeb3.eth.Contract(abi, contractAddress);
      console.log("Contract methods: ", contractInstance.methods);
      // console.log("Contract events: ", contractInstance.events);

      // accountInterval = setInterval(this.updateAccount.bind(this), 100);
      return this.updateAccount();
    })
  },

  getNetwork() {
    return new Promise((res, rej) => {
      if (typeof web3 !== 'undefined') {
        this.resolveNetwork()
          .then(() => {
            localWeb3 = new Web3(web3.currentProvider);
            status = LOGIN_STATUS;

            res();
          })
          .catch(() => {
            localWeb3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'));
            status = BAD_NETWORK_STATUS;

            res();
          });
      } else {
        localWeb3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'));
        status = MISS_STATUS;

        res();
      }
    });
  },

  resolveNetwork() {
    return new Promise((res, rej) => {
      web3.version.getNetwork((err, netId) => {
        if (netId == 3) {
          status = GOOD_NETWORK_STATUS;
          res();
        } else {
          status = BAD_NETWORK_STATUS;
          rej();
        }
      })
    });
  },

 

  updateAccount: function () {

    if (status == LOGIN_STATUS && web3.eth.defaultAccount !== userAccount) {
  
      userAccount = web3.eth.defaultAccount;
      status = SUCCESS_STATUS;

   //   return this.getData();
    } 
   // else {
    //   return this.getData();
    // }
  },

  hasAccount: function () {
    return !!userAccount;
  },





  getTokens: function () {
    return tokens;
  },

  getUserAccount: function () {
    return userAccount;
  },

  fromWei: function (amount) {
    return localWeb3.utils.fromWei(amount);
  },

  getStatus: function () {
    return status;
  },

  getBlock: function (id) {
    return localWeb3.eth.getBlock(id);
  }

}
