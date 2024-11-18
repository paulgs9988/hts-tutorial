const { 
    Client,
    TokenInfoQuery,
    AccountId,
    PrivateKey 
} = require("@hashgraph/sdk");

async function getTokenInfo() {
    const client = Client.forTestnet();
    client.setOperator(
        AccountId.fromString("Account_ID"),
        PrivateKey.fromStringECDSA("key here")
    );

    const query = new TokenInfoQuery()
        .setTokenId("Token ID");

    const tokenInfo = await query.execute(client);
    console.log("Token Info:", tokenInfo);
}

getTokenInfo();