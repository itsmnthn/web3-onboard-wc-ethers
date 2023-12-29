<script setup>
import Onboard from '@web3-onboard/core';
import WalletConnect from '@web3-onboard/walletconnect';
import injected from '@web3-onboard/injected-wallets';

const chain = {
  blockExplorerUrl: 'https://486.testnet.routescan.io',
  id: '0x1e6',
  label: 'Hubble Exchange Testnet',
  rpcUrl:
    'https://aylin-rpc.hubble.exchange/ext/bc/2qR64ZGVHTJjTZTzEnQTDoD1oMVQMYFVaBtN5tDoYaDKfVY5Xz/rpc',
  token: 'USDC',
};

let onboard;

async function connect() {
  const wc = WalletConnect({
    projectId: 'bf8dab55eeb031d512614a4022e36dab',
    requiredChains: [chain.id],
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
    chains,
    appMetadata: {
      name: 'Hubble Exchange',
      icon: iconSVG, // svg string icon
      description: 'Hubble Exchange Decentralized Perpetual Futures Exchange',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
      ],
      explore: useRuntimeConfig().public.appUrl,
    },
    disableFontDownload: false,
    connect: { autoConnectLastWallet: true, disableUDResolution: true },
    accountCenter: { desktop: { enabled: false }, mobile: { enabled: false } },
  });

  await onboard.connectWallet();
  const wallet = onboard.state.select('wallets')[0];
  console.log('connected wallet', wallet);
}
</script>

<template>
  <div style="background: black; color: white">
    <button @click="connect()">Connect</button>
  </div>
</template>
