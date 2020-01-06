import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import App from "./components/App";
import "./styles/index.css";
import { HashRouter as Router } from "react-router-dom";
import store from "./reducers/store";
import {Provider} from "react-redux";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';


//const link = createUploadLink({ uri: "https://smart-money-server.herokuapp.com/graphql" });
const link = createUploadLink({ uri: "http://localhost:5000/graphql" });
const cache = new InMemoryCache();

const client = new ApolloClient({ cache, link });

ReactDOM.render(
    <Router>
    <ApolloProvider client={client} >
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
  </Router>,

  document.getElementById("root")
);
