import { Button, Box} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const ETH_PRICE_QUERY = gql`
  query bundles {
    bundles(where: { id: "1" }) {
      ethPrice
    }
  }
`

const ALL_TOKENS = gql`
  query Tokens {
     tokens {
        symbol
        name
        id
        derivedETH
        decimals
     }
  }
`
const PAIR = gql`
  query Pairs {
      pairs (where :{token0 : "0x0f7f961648ae6db43c75663ac7e5414eb79b5704", token1 :"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}) {
          id
          createdAtTimestamp
          volumeUSD
      }
  }
`
export default function Test() {
  const { account } = useEthers();
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: daiLoading, data: daiData } = useQuery(DAI_QUERY, {
    variables: {
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
  })

  const { loading: tokenLoading, data: tokenData } = useQuery(ALL_TOKENS)
  const { loading: pairsLoading, data: pairData } = useQuery(PAIR)

  const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
  const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice

  console.log(tokenData);
  console.log(pairData);
  return (
    <Box mt="0.5rem">
      <div>
        <div>
          Dai price:{' '}
          {ethLoading || daiLoading
            ? 'Loading token data...'
            : '$' +
            // parse responses as floats and fix to 2 decimals
            (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
        </div>
        <div>
          Dai total liquidity:{' '}
          {daiLoading
            ? 'Loading token data...'
            : // display the total amount of DAI spread across all pools
            parseFloat(daiTotalLiquidity).toFixed(0)}
        </div>
      </div>
    </Box>
  );
}
