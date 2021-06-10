import { DappService } from './dapp.service';
import { Component, OnInit } from '@angular/core';
import {tokens} from './constants'

@Component({
  selector: 'app-dapp',
  templateUrl: './dapp.component.html',
  styleUrls: ['./dapp.component.css']
})

export class DappComponent implements OnInit {
  
  constructor(private dappService:DappService) { }
  isConnected = false;
  isGettingBalances = false;
  isGettingExchangeRates = false;
  error:string = '';
  exchangeRates: string[] = [];
  balances: string[] = [];
  ngOnInit(): void {
  }
  public async connectToMetamask(): Promise<void>{
    this.error = '';
    try{
      await this.dappService.connect();
      this.isConnected = true;
      this.isGettingBalances = true;
      this.isGettingExchangeRates = true;
      await this.getBalances();
      await this.getExchangeRates();
    } catch(err){
      this.error = err;
    }
  }
  private async getBalances(): Promise<void>{
    try{
      let ethBalance = await this.dappService.getEthBalance();
      let usdcBalance = await this.dappService.getTokenBalance(tokens.usdc);
      let daiBalance = await this.dappService.getTokenBalance(tokens.dai);
      this.balances.push('ETH: ' + ethBalance);
      this.balances.push('USDC: ' + usdcBalance);
      this.balances.push('DAI: '+ daiBalance);
    }catch(err){
      throw new Error('Problem with getting balances.');
    }
    this.isGettingBalances = false;
  }
  private async getExchangeRates(): Promise<void>{
    try{
      let wethToUsdt = await this.dappService.getExchangeRate(tokens.weth, tokens.usdt);
      let usdcToUsdt = await this.dappService.getExchangeRate(tokens.usdc, tokens.usdt);
      let daiToUsdt = await this.dappService.getExchangeRate(tokens.dai, tokens.usdt);
      this.exchangeRates.push('1 WETH = ' + wethToUsdt + ' USDT');
      this.exchangeRates.push('1 USDC = ' + usdcToUsdt + ' USDT');
      this.exchangeRates.push('1 DAI = ' + daiToUsdt + ' USDT');
    
    }catch(err){
      throw new Error('Problem with getting exchange rates.');
    }
    this.isGettingExchangeRates = false;
  }
}
