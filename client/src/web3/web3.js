import Web3 from 'web3';

const web3=new Web3(window.ethereum);//window is coming from metamask 
//metamask's provider is replaced
export default web3;
