import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProductsProvider } from "./contexts/ProductsContext";
import { UsersProvider } from "./contexts/UsersContexts";
import "bootstrap/dist/css/bootstrap.css";
import { TransactionsProvider } from "./contexts/TransactionContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ProductsProvider>
          <UsersProvider>
            <TransactionsProvider>
              <App />
            </TransactionsProvider>
          </UsersProvider>{" "}
        </ProductsProvider>{" "}
      </QueryClientProvider>{" "}
    </BrowserRouter>{" "}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
