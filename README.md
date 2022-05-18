# Wallet Web

- **The project is hosted at [https://wallet.ramkrishnan.xyz](https://wallet.ramkrishnan.xyz) (Frontend)**
- **API URL** - `https://api.wallet.ramkrishnan.xyz` **(Backend)**
- **Wallet is developed using the MERN stack - MongoDB, Express, React, Node.js**
- **This document covers the web part of the application**

---

## Pre-requisites

To run the project locally, you need to have the following: 

- npm  - [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

## Get the project

- **Clone the project**
    
    `git clone https://github.com/iramkrishnan/wallet-web.git`
    
- **Change directory**
    
    `cd wallet-web`
    

## Install necessary packages

`npm install`

## Initial Configuration

- Open `src/constants/index.js` file and change the `API_URL` as per your configuration of the backend which is required for this app

## Run the application (development server)

- `npm start`

---

## Routes

- Home - `/`
- Wallet Transactions - `/transactions` (Private - only accessible if `walletId` is present in local storage)
- Component responsible for handling Private Routes is at `src/PrivateRoute.js`

---

## Styling

- This project uses **react-bootstrap** and **semantic-ui-react** package

---

## Components

### Home

- Renders the home page
- If user is visiting for the first time, i.e `walletId` is not present in local storage
    - Shows create wallet form (`src/components/Home/CreateWallet`)
    - Simple form which asks user - wallet name (required) and initial balance (optional) to setup a wallet
    - `POST /setup` API is called and `walletId` received in response is stored in local storage
    - When user clicks on submit, we show Add transaction component (`src/components/Home/AddTransaction`)
- If user is visiting again, i.e `walletId` is present in local storage
    - We show Add transaction component (`src/components/Home/AddTransaction`)
    - `GET /wallet/:id` API is called to store wallet name and balance in Wallet details component (`src/components/Home/WalletDetails`)
    - Simple form which asks user - amount (required), type (credit/debit) and description (optional) to add the transaction
    - After adding transaction, wallet balance is automatically updated in Wallet Details component

### Wallet Transactions

- Renders the wallet transactions page
- `GET /transactions?walletId=12332` API is called
- Shows list of all transactions made in the wallet
- The table is paginated, by default, limit is set to `10`
- There is an option to sort data in table by amount or date
- User can download the CSV of all the transactions made in the wallet

### Not Found

- Shows a simple 404 page not found

---
