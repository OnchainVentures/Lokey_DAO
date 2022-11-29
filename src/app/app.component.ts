import { Component, OnInit } from '@angular/core';
import { Contract, ContractOptions } from 'web3-eth-contract';
import {AbiItem} from 'web3-utils';
import Web3 from 'web3';
import { SystemService } from './_services/system.service';
const erc20abi = require('../../erc20.abi.json');
const loStakeArtifact = require('../../contracts/artifacts/contracts/LoStake.sol/LoStake.json');
const web3 = new Web3(Web3.givenProvider);
declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  staking: boolean = false;
  connected: boolean = false;
  connected_user?: string;
  current_pair_token: 'usdc' | 'eth' = 'usdc';
  current_pair_balance: number = 0;
  token_input_value: number = 0;
  lo_stake_address?: string;
  loCity?: string;
  errMsg: string = '';
  network: number;
  constructor(private system: SystemService) {
  }
  
  async ngOnInit() {
    await this.onChangeWallet();
    this.onNetworkChange();
  }

  async toStake() {
    this.staking = !this.staking;
    if (this.staking) document.querySelector<HTMLDivElement>('#toStake').classList.add('chosen');
    else document.querySelector<HTMLDivElement>('#toStake').classList.remove('chosen');
  }

  async connectWallet() {
    if (this.connected) {
      this.connected_user = undefined;
      this.connected = false;
      document.querySelector('#connect-wallet').innerHTML = 'Connect';
      return;
    }

    if (typeof window.ethereum == 'undefined') {
      console.log('Please install metamask');
      return;
    }
       
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    if (accounts.length) {
      this.connected_user = accounts[0];
      // console.log(accounts);
      this.connected = true;
      document.querySelector('#connect-wallet').innerHTML = this.parseAddress(this.connected_user);
      this.network = await web3.eth.net.getId();
    }
  }

  async onChangeWallet() {
    window.ethereum.on('accountsChanged', async (res: string[]) => {
      if (res.length) {
        console.log('accounts Changed', res);
        this.connected_user = res[0];
        document.querySelector('#connect-wallet').innerHTML = this.parseAddress(this.connected_user);
      } else {
        this.connected = false;
        this.connected_user = undefined;
      }
      this.staking = false;
    });
  }

  async stakeCoin() {
    let contract: Contract;
    let val: number;
    switch (this.current_pair_token) {
      case 'usdc':
        contract = this.makeContract(erc20abi, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
        this.current_pair_balance = await contract.methods.balanceOf(this.connected_user!).call();
        val = 6;
        break;
      case 'eth':
        contract = this.makeContract(erc20abi, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
        this.current_pair_balance = await contract.methods.balanceOf(this.connected_user!).call();
        val = 18;
        break;
    }
    val = this.token_input_value * (10 ** val);
    if (!this.current_pair_balance || val > this.current_pair_balance) {
      this.errMsg = 'Error: no balance, or invalid params';
      return;
    }
    // lostake address will be first param 👇🏾
    await contract.methods.transfer('0x8177BBfcFc10c516c845Ed4b088F9A1a13770ca5', val).send({ from: this.connected_user })
    .then(async (res) => {
      console.log('successfully transferred, res: ', res);
      // todo call stake contract
      if(!this.lo_stake_address) {
        this.errMsg = 'LoStake Contract Address Not Found';
        return;
      }
      let _contract_ = this.makeContract(loStakeArtifact.abi, this.lo_stake_address!);
      let deadline = new Date();
      let args = [
        this.token_input_value * 10 ** 18,
        val, 
        this.token_input_value * 10 * 18 * 0.9, 
        val * 0.9, 
        deadline.getTime() / 1000 + 210, 
        'SRQ'
      ];
      await _contract_.methods.stake(...args).send({from: this.connected_user}).catch((err) => {
        this.errMsg = 'Error staking';
        console.log(this.errMsg, err);
        return;
      });
    })
    .catch((err) => {
      console.log('error transferring: ', err);
    });
  }

  private parseAddress(address: string): string {
    return `${address[0]}${address[1]}${address[2]}...${address[address.length-4]}${address[address.length-3]}${address[address.length-2]}${address[address.length-1]}`;
  }

  private makeContract(abi: AbiItem, address: string): Contract {
    return new web3.eth.Contract(abi, address);
  }


  private onNetworkChange() {
    window.ethereum.on('networkChanged', (networkId) => {
      this.network = networkId;
      console.log(this.network);
    });
  }
}
