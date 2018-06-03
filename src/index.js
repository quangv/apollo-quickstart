import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
    uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
})

/*
client
    .query({
        query: gql`
{
  rates(currency: "USD") {
    currency
  }
}
`
    })
    .then(result => console.log(result))
*/

const ExchangeRates = () => (
    <Query
      query={gql`{
        rates(currency: "USD") {
          currency
          rate
        }
      }`}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>{`${currency}: ${rate}`}</p>
          </div>
        ))
      }}
    </Query>
)

const ApolloApp = () => (
    <ApolloProvider client={client}>
      <React.Fragment>
        <App />
        <ExchangeRates />
      </React.Fragment>
    </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
registerServiceWorker();
