const { 
    Client, 
    TokenCreateTransaction,
    TokenType,
    AccountId,
    PrivateKey
} = require("@hashgraph/sdk");

async function createToken() {
    // Configure client with your testnet account credentials
    const client = Client.forTestnet();
    //go to portal.hedera.com/dashboard and set up a testnet account to get:
    client.setOperator(
        AccountId.fromString("account_id_here"), //Account ID
        PrivateKey.fromStringECDSA("key_here") //"Hex Encoded Private Key"
    );

    const transaction = new TokenCreateTransaction()
        .setTokenName("Token Name Here")
        .setTokenSymbol("Symbol Here")
        .setDecimals(6)
        .setInitialSupply(1000000)
        .setTokenType(TokenType.FungibleCommon)
        .setTreasuryAccountId(AccountId.fromString("Same account ID as above"));

    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);
    
    console.log(`Token ID: ${receipt.tokenId}`);
}

createToken();