import Web3 from 'web3';
const abi = require('./abi.json');

const contractAddress = '0xa2eb3b5a0c63012040137d6ad5dd16b5ed234e2b';
const SUCCESS_STATUS = 'success';
const LOGIN_STATUS = 'login';
const MISS_STATUS = 'miss';
const GOOD_NETWORK_STATUS = 'good_newtwork';
const BAD_NETWORK_STATUS = 'bad_newtwork';

let localWeb3,
  contractInstance,
  userAccount,
  status,
allDucks,
myDuck,
userDucks,
ducks;

export default {
  init: function () {
    return this.getNetwork().then(() => {
      contractInstance = new localWeb3.eth.Contract(abi, contractAddress);
      console.log("Contract methods: ", contractInstance.methods);
      // console.log("Contract events: ", contractInstance.events);

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
            localWeb3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io'));
            status = BAD_NETWORK_STATUS;

            res();
          });
      } else {
        localWeb3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io'));
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

    if (web3.eth.defaultAccount !== userAccount) {

      userAccount = web3.eth.defaultAccount;
      
      return this.getData();
    }
     else {
      allert("Установите мультимаск");
     }
  },
  getData: function () {
    return Promise.all([
      this.getMyDuck(),
        this.getAllDucks()
    ]).then(() => {
      // console.log('ducks', allDucks);
      return Promise.all(
        allDucks.split(',').map(id => this.getDuckByid(id))
      )
    }).then(_ducks => {
      ducks = _ducks;

      return {
        ducks,
        myDuck
      }
    })
      
  },
  getAllDucks: function () {
    return contractInstance.methods.getActiveContracts().call().then(result => {
      console.log('getActiveContracts', result);
      allDucks = result;
      return result;
    })
  },
  getDuckByid: function (id) {
    return contractInstance.methods.getContractById(id).call().then(result => {
      userDucks= result;
      return result;
    })
  },
  buyDucks: function (amount) {
    return new Promise((res, rej) => {
      contractInstance.methods.buyContract()
        .send({
          from: userAccount,
          value: localWeb3.utils.toWei(amount.toString(), 'ether')
        })
        .on("receipt", receipt => res(receipt))
        .on("error", error => rej(error));
    })
  },
 
  getMyDuck:function(){
    return contractInstance.methods.getMyTokens().call().then(result => {
      myDuck = result;
      return result;
    })
  },
  hasAccount: function () {
    return !!userAccount;
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
  },
 
  
}
