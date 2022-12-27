import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import companyInstance from '../../deploy/company';
import web3 from '../../web3/web3';

const SellerForm = ({address}) => {
    const [fee,setFee]=useState('');
    const [errorMsg,setErrorMsg]=useState('');
    const [spinner,setSpinner]=useState(false);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const company=companyInstance(address);
        setErrorMsg('');
        setSpinner(true);
        try{
           const accounts=await web3.eth.getAccounts();
           await company.methods.bookProduct().send({
               from:accounts[0],
               value:fee,
               type:'0x2'
           })

            

        }catch(err){
            setErrorMsg(err.message);
        }
        setSpinner(false);
        setFee('');
    }
    return (
        <div>
            <h3>Become a Registered Seller!</h3>
            <Form onSubmit={handleSubmit} error={!!errorMsg}>
                <Form.Field>
                    <label>Amount to register</label>
                    <Input label="wei" 
                    labelPosition="right" value={fee}
                    onChange={(e)=>setFee(e.target.value)}
                    ></Input>
                </Form.Field>
                <Message error header="Oops!" content={errorMsg}></Message>
                <Button loading={spinner}  color="teal">Register!</Button>
            </Form>
        </div>
    );
};

export default SellerForm;