import web3 from "../web3/web3";
import Company from '../build/Company.json';

const companyInstance= (address)=>{
    return new web3.eth.Contract(
        JSON.parse(Company.interface),
        address
    );
};
export default companyInstance;
