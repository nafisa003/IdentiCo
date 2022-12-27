import React, { useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import companyInstance from '../../deploy/company';
import web3 from '../../web3/web3';

const AddProduct = () => {
    const {address}=useParams();

    const [errorMsg,setErrorMsg]=useState('');
    const [spinner,setSpinner]=useState(false);
    const [productName,setProductName]=useState('');
    const [price,setPrice]=useState('');
    const [stock,setStock]=useState('');
   
    const handleSubmit=async (e)=>{
        e.preventDefault();

        setErrorMsg('');

       const  productPrice=parseInt(price);
       const productStock=parseInt(stock);
        const company=companyInstance(address);
        setSpinner(true);
        try{
            const accounts=await web3.eth.getAccounts();
            await company.methods.createProduct(productName,productPrice,
                productStock).send({
                    from:accounts[0],
                    type:'0x2'
                })

        }catch(err){
            setErrorMsg(err.message);
        }
        setSpinner(false);
        // setProductName('');
        // setPrice('');
        // setStock('');
       
    }
    // const  productPrice=parseInt(price);
    //    const productStock=parseInt(stock);
    //    console.log(productPrice,typeof(productPrice))
    return (
        <div>
            <Link to={`/companies/${address}/products`}>
                <Button color="teal">Back to Products</Button></Link>
            <h3 style={{textAlign:"center",fontWeight:700,fontSize:30}}>Add a new product!</h3>
            <div style={{width:"80%",margin:"0 auto"}}>
            <Form onSubmit={handleSubmit} error={!!errorMsg} > 
                <Form.Field>
                    <label>Name of Product</label>
                    <Input value={productName}
                    onChange={(e)=>setProductName(e.target.value)}></Input>
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <Input 
                    label="wei"
                    labelPosition="right"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}></Input>
                </Form.Field>
                <Form.Field>
                    <label>Stock</label>
                    <Input 
                    value={stock}
                    onChange={(e)=>setStock(e.target.value)}></Input>
                </Form.Field>
                <Message error header="Oops!" content={errorMsg}></Message>
                <Button loading={spinner} color="black">Add Product</Button>
            </Form>
            </div>
        </div>
    );
};

export default AddProduct;