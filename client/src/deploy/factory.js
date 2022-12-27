import web3 from "../web3/web3";

import CompanyFactory from '../build/CompanyFactory.json';

const factoryInstance=new web3.eth.Contract(
    JSON.parse(CompanyFactory.interface),
    '0x5b7e466aabfD7812F416166bF73C4F14268DCe57'
);

export default factoryInstance;