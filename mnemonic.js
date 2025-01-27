const bip39 = require("bip39");
const { HDNode } = require("@ethersproject/hdnode");

async function generateAccounts() {
  // Step 1: Generate a mnemonic phrase
  const mnemonic = bip39.generateMnemonic(); // Default is 12 words
  console.log("Mnemonic Phrase:", mnemonic);

  // Step 2: Generate seed from the mnemonic
  const seed = await bip39.mnemonicToSeed(mnemonic);

  // Step 3: Create an HDNode (Hierarchical Deterministic Wallet)
  const rootNode = HDNode.fromSeed(seed);

  // Step 4: Derive multiple accounts
  const numberOfAccounts = 5; // Change to generate more accounts
  const accounts = [];

  for (let i = 0; i < numberOfAccounts; i++) {
    // Use the Ethereum BIP44 derivation path: m/44'/60'/0'/0/<index>
    const accountNode = rootNode.derivePath(`m/44'/60'/0'/0/${i}`);
    accounts.push({
      index: i,
      address: accountNode.address,
      privateKey: accountNode.privateKey,
    });
  }

  return accounts;
}

generateAccounts()
  .then((accounts) => {
    console.log("Generated Accounts:");
    accounts.forEach((account, i) => {
      console.log(`Account ${i + 1}:`);
      console.log(`  Address: ${account.address}`);
      console.log(`  Private Key: ${account.privateKey}`);
    });
  })
  .catch((err) => console.error("Error:", err));
