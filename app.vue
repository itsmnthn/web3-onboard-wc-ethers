<script setup>
import { Web3Provider } from '@ethersproject/providers'
const chain = {
  blockExplorerUrl: 'https://486.testnet.routescan.io',
  id: '0x1e6',
  label: 'Aylin Testnet',
  rpcUrl:
    'https://aylin-rpc.hubble.exchange/ext/bc/2qR64ZGVHTJjTZTzEnQTDoD1oMVQMYFVaBtN5tDoYaDKfVY5Xz/rpc',
  token: 'USDC',
};

let onboard = null;
let signer = null;

async function connect() {
  if (onboard === null) {
    const Onboard = (await import('@web3-onboard/core')).default
    const WalletConnect = (await import('@web3-onboard/walletconnect')).default
    const injected = (await import('@web3-onboard/injected-wallets')).default

    const wc = WalletConnect({
      projectId: 'bf8dab55eeb031d512614a4022e36dab',
      requiredChains: [Number(chain.id)],
      additionalRequiredMethods: [
        'eth_signTypedData_v4',
        'eth_sendTransaction',
        'eth_signTransaction',
        'wallet_addEthereumChain',
        'wallet_switchEthereumChain',
      ],
      dappUrl: 'https://stackblitz.com',
    });

    onboard = Onboard({
      wallets: [wc, injected()],
      chains: [chain],
      appMetadata: {
        name: 'Test WalletConnect',
        // icon: iconSVG, // svg string icon
        description: 'Test WalletConnect',
        recommendedInjectedWallets: [
          { name: 'MetaMask', url: 'https://metamask.io' },
        ],
        explore: 'https://stackblitz.com',
      },
      disableFontDownload: false,
      connect: { autoConnectLastWallet: true, disableUDResolution: true },
    });
  }

  let walletOptions
  const previouslyConnectedWallets = JSON.parse(window.localStorage.getItem('connectedWallets') || '[]')
  if (previouslyConnectedWallets.length > 0)
    walletOptions = { autoSelect: { label: previouslyConnectedWallets[0], disableModals: true } }

  const wallets = await onboard.connectWallet(walletOptions);
  console.log('wallet', wallets[0]);
  signer = new Web3Provider(wallets[0].provider).getSigner();
  // signer = wallet.provider.getSigner();
  console.log("🚀 ~ file: app.vue:54 ~ onboard.state.select ~ signer:", signer)
}

async function sendFund() {
  console.log("🚀 ~ file: app.vue:69 ~ sendFund ~ signer:", signer)
  if (!signer) return

  await onboard.setChain({ chainId: chain.id })

  const tx = {
    to: await signer.getAddress(),
    value: '1000000000000000000',
  };
  const txHash = await signer.sendTransaction(tx);
  console.log('txHash', txHash);
  const receipt = await txHash.wait()
  console.log('receipt', receipt);
}
</script>

<template>
  <div class="flex items-center justify-center bg-black text-white">
    <button @click="connect()">Connect</button>
    <button @click="sendFund()">Send funds</button>
  </div>
</template>


<style>
html,
body,
__nuxt,
__layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>