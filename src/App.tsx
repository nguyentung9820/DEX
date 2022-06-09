import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Header from "./components/Header";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/Modal/AccountModal";
import Swap from "./components/Swap";

import "@fontsource/inter";

import "./global.css";

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

function App() {
  const  { isOpen, onOpen, onClose } = useDisclosure();
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: daiLoading, data: daiData } = useQuery(DAI_QUERY, {
    variables: {
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
  })

  const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
  const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice


  return (
    <ChakraProvider theme={theme}>
      <Header>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Header>
      <Swap />
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
    </ChakraProvider>
  );
}

export default App;
