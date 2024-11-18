# Creating a Token on Hedera Hashgraph

This tutorial demonstrates how to create a fungible token on Hedera using the Hedera Token Service (HTS). HTS provides a native token service that enables quick token creation without writing smart contracts.

## Prerequisites
- Node.js installed
- Hedera testnet account
- Account ID and private key from Hedera Portal

## Setup

1. Create a new project directory and initialize:
```bash
mkdir hedera-token
cd hedera-token
npm init -y
npm install @hashgraph/sdk
```

2. Create `token.js`:
```javascript
const { 
    Client, 
    TokenCreateTransaction,
    TokenType,
    AccountId,
    PrivateKey
} = require("@hashgraph/sdk");

async function createToken() {
    const client = Client.forTestnet();
    client.setOperator(
        AccountId.fromString("YOUR-ACCOUNT-ID"),
        PrivateKey.fromStringECDSA("YOUR-PRIVATE-KEY")
    );

    const transaction = new TokenCreateTransaction()
        .setTokenName("My Token")
        .setTokenSymbol("MTK")
        .setDecimals(6)
        .setInitialSupply(1000000)
        .setTokenType(TokenType.FungibleCommon)
        .setTreasuryAccountId(AccountId.fromString("YOUR-ACCOUNT-ID"));

    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);
    
    console.log(`Token ID: ${receipt.tokenId}`);
}

createToken();
```

## Usage

1. Replace `YOUR-ACCOUNT-ID` and `YOUR-PRIVATE-KEY` with your testnet credentials
2. Run the script:
```bash
node token.js
```

3. View your token on [HashScan](https://hashscan.io/testnet)

## Token Info Query

Check token details using:
```javascript
const query = new TokenInfoQuery()
    .setTokenId("YOUR-TOKEN-ID");
const tokenInfo = await query.execute(client);
```

## Features
- Native token creation without smart contracts
- Transaction fees in HBAR
- Automatic token management and minting
- Built-in token properties and configuration

## Resources
- [Hedera Token Service Documentation](https://docs.hedera.com/hedera/sdks-and-apis/tokens)
- [Hedera Portal](https://portal.hedera.com)
- [HashScan Explorer](https://hashscan.io)