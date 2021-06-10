import { uniswapRouterAddress, Token } from './constants';
import { Injectable } from '@angular/core';
import Web3 from "web3";
@Injectable({
  providedIn: 'root'
})
export class DappService {
  web3:Web3;
  accountAddress: string = '';
  constructor() {
    this.web3 = new Web3();
  }
  
  public async connect(): Promise<void>{
    if ((window as any).ethereum && ((window as any).ethereum.isMetaMask == true)) {
      this.web3 = new Web3((window as any).ethereum);
      let accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      let networkType = await this.web3.eth.net.getNetworkType();
      if(networkType != 'main'){
        throw new Error('Please, switch to main network');
      }
      this.web3.eth.defaultAccount = accounts[0];
      this.accountAddress = accounts[0];
    }else{
      throw new Error('Connection error. Please, install metamask!');
    }
  }
  public async getEthBalance(): Promise<string>{
    let weiBalance = await this.web3.eth.getBalance(this.accountAddress);
    return this.web3.utils.fromWei(weiBalance, 'ether');
  }
  public async getTokenBalance(token:Token): Promise<string>{
    let tokenContract = new this.web3.eth.Contract(require('./erc20.json'), token.address);
    let balance =  await tokenContract.methods.balanceOf(this.accountAddress).call();
    return this.web3.utils.fromWei(balance, token.decimals);
  }
  public async getExchangeRate(token1:Token, token2:Token): Promise<string>{
    let uniswapRouter = new this.web3.eth.Contract(require('./IUniswapV2Router02.json'), uniswapRouterAddress);
    let pair = [token1.address, token2.address];
    let exchangeRate = await uniswapRouter.methods.getAmountsOut(this.web3.utils.toWei('1',token1.decimals), pair).call();
    return this.web3.utils.fromWei(exchangeRate[1],token2.decimals);
  }
}
