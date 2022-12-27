import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import companyInstance from '../../deploy/company';
import web3 from '../../web3/web3';

const BuyProductForm = () => {
    const {id}=useParams();
    const {address}=useParams();
    // console.log(address,id);
    // console.log(typeof(id),id)
    const [spinner,setSpinner]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
    const [sellerName,setSellerName]=useState('');
    const [payment,setPayment]=useState('');
    const history=useHistory();
    // console.log(id)
    // let index=parseInt(id);
    // console.log(index,typeof(index))
    const handleSubmit=async (e)=>{
        e.preventDefault();

        const company=companyInstance(address);
        
        let index=parseInt(id);
        setErrorMsg('');
        setSpinner(true);
        try{
            const accounts=await web3.eth.getAccounts();
            await company.methods.buyProduct(index,sellerName).send({
                from:accounts[0],
                value:payment,
                type:'0x2'
            })
            console.log('success')
        }catch(err){
            setErrorMsg(err.message);
        }
        setSpinner(false);
        setPayment('');
        setSellerName('');
        
        
    }
    return (
        <div>
           <h3 style={{textAlign:"center",fontWeight:700,fontSize:30}}>Seal the Deal!</h3>
           <div style={{width:"80%",margin:"0 auto"}}>
           <Form onSubmit={handleSubmit} error={!!errorMsg}>
               <Form.Field>
                   <label>Enter Your Name</label>
                   <Input value={sellerName}
                   onChange={(e)=>setSellerName(e.target.value)}>
                   </Input>
               </Form.Field>
               <Form.Field>
                    <label>Payment</label>
                    <Input
                    label="wei"
                    labelPosition="right"
                    value={payment}
                    onChange={(e)=>setPayment(e.target.value)}></Input>
               </Form.Field>
               <Message error header="Oops!" content={errorMsg} ></Message>
               <Button loading={spinner} color="teal">Buy</Button>
            </Form> 
            </div>     
        </div>
    );
};

export default BuyProductForm;