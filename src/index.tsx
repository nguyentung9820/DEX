import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DAppProvider } from "@usedapp/core";
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  }),
  cache: new InMemoryCache(),
})

ReactDOM.render(
    <React.StrictMode>
      <DAppProvider config={{}}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </DAppProvider>
    </React.StrictMode>,
  document.getElementById("root")
);
