import { Component, OnInit } from '@angular/core';
import { SystemService } from '../_services/system.service';
import { Contract, ContractOptions } from 'web3-eth-contract';
import {AbiItem} from 'web3-utils';
import Web3 from 'web3';
const erc20abi = require('../../../erc20.abi.json');
const loStakeArtifact = require('../../../contracts/artifacts/contracts/LoStake.sol/LoStake.json');
const web3 = new Web3(Web3.givenProvider);
declare const window: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  

  constructor(private system: SystemService) {}
  
  
  async ngOnInit() {
    
  }

  toggleTheme(ev: any) {
    // console.log(ev);
    this.system.theme = this.system.theme == 'light' ? 'dark' : 'light';
  }
  // Gets appropriate ion-icon string based on dark / light mode
  get icon(): string {
    return this.system.theme == 'light' ? 'moon-outline' : 'sunny-outline';
  }

  
}
