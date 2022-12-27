import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import companyInstance from '../../deploy/company';
import web3 from '../../web3/web3';

const ProductRow = ({product,id}) => {
   const {address}=useParams();
   const [code,setCode]=useState('');
   const [showqr,setShowQr]=useState(false);
  const [spinner,setSpinner]=useState(false);
  
//    console.log(address)
    const {Row,Cell}=Table;
     const {productName,price,stock,status,manufacturer,currentOwner,ownerName}=product;
    //  console.log(product)

    const handleFinalize=async ()=>{
        let index=parseInt(id)
        const company=companyInstance(address);
        setSpinner(true)
        try{
        const accounts=await web3.eth.getAccounts();

        await company.methods.shipProduct(index).send({
            from:accounts[0],
            type:'0x2'
        })
       
    }catch(err){
        console.log(err.message);
    }
    setSpinner(false);
   
    };

    const handleVerify=()=>{
           const item=`
           Manufacturer:  
           ${manufacturer}
           Current Owner:
           ${currentOwner}
           Owner Name:${ownerName}
           Status:${status}`;
           setCode(item);
           setShowQr(true);

         setTimeout(function(){
            setShowQr(false);
         },15000)
    };
    return (
       
        <Row>
            <Cell>{id}</Cell>
            <Cell>{productName}</Cell>
            <Cell>{price}</Cell>
            <Cell>{stock}</Cell>
            <Cell>{status}</Cell>
            <Cell>
                <Link to={`/companies/${address}/products/${id}`}>
                <Button color="blue" basic>Buy!</Button>
                </Link>
               
            </Cell>
            <Cell>
                <Button loading={spinner} color="red" basic onClick={handleFinalize}>Ship</Button>
            </Cell>
            <Cell>
                
                <Button color="green" basic onClick={handleVerify}>Verify!
                </Button>
               
                
            </Cell>
           
        
          {showqr? <Cell> <QRCode value={code} size={100}></QRCode></Cell>:
          <Cell></Cell>
            }
        </Row>
        
    );
};

export default ProductRow;