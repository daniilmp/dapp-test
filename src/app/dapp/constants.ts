export interface Token{
    address: string,
    decimals: any
}
export interface Tokens {
    [key: string] : Token
}
export const tokens: Tokens = {
    'dai' : {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 'ether'
    },
    'weth' : {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      decimals: 'ether'
    },
    'usdc' : {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 'mwei'
    },
    'usdt' : {
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      decimals: 'mwei'
    },
};
export const uniswapRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';