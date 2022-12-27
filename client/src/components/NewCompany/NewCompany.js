import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import { CompanyContext } from '../../App';
import factoryInstance from '../../deploy/factory';
import web3 from '../../web3/web3';

const NewCompany = () => {
    const [name,setName]=useState('');
    const [sellerFee,setSellerFee]=useState('');
    const [companyName,setCompanyName]=useContext(CompanyContext);
    const [errorMsg,setErrorMsg]=useState('');
    const [spinner,setSpinner]=useState(false);
    let history=useHistory();

    const handleSubmit=async (e)=>{
        e.preventDefault();
         
        setErrorMsg('');
        setSpinner(true);
       try{
        //get list of accounts
        const accounts=await web3.eth.getAccounts();
        await factoryInstance.methods.createCompany(name,sellerFee).send({
            from:accounts[0],
            type:'0x2'
        })
        setCompanyName([...companyName,name]);
        history.push("/companies");
    }catch(err){
        setErrorMsg(err.message);
    }
    setSpinner(false);
    }
    // console.log(companyName)
    return (
        <div>
            <h3 style={{textAlign:"center",fontWeight:700,fontSize:30}}>New Company!</h3>
            <div style={{width:"80%",margin:"0 auto"}}>
        <Form onSubmit={handleSubmit} error={!!errorMsg}>
            <Form.Field>
                <label>Company Name</label>
               <Input
               value={name}
               onChange={(e)=>setName(e.target.value)}
               ></Input>
            </Form.Field>
            
            <Form.Field>
                <label>Seller Registration Fee</label>
                <Input label="wei" labelPosition="right"
                value={sellerFee}
                onChange={(e)=>setSellerFee(e.target.value)}
                ></Input>
            </Form.Field>
            <Message error header="Oops!" content={errorMsg}></Message>
            <Button content="Create!" color="teal" loading={spinner}></Button>
        </Form>
        </div>
        </div>
    );
};

export default NewCompany;