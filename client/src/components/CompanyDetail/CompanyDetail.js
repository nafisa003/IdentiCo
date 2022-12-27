import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid } from 'semantic-ui-react';
import companyInstance from '../../deploy/company';
import SellerForm from '../SellerForm/SellerForm';

const CompanyDetail = () => {
    const {address}=useParams();
    // console.log(address)
    const company=companyInstance(address);
    const [summary,setSummary]=useState({});

    useEffect(()=>{
    (async ()=>{
       const summmaryData=await company.methods.getSummary().call();
       setSummary(summmaryData);
    // console.log(summmaryData)
    })();
    },[summary])
     
    
    const itemDetail={
        sellerFee:summary[0],
        companyName:summary[1],
        totalProducts:summary[2],
        manufacturer:summary[3]
    };
     
   
    const {sellerFee,companyName,totalProducts,manufacturer}=itemDetail;

    const items=[
        {
            header:companyName,
          meta:"Name of the manufacturer",
          description:"This is the manufacturer's public name",

        },
        {
            header:manufacturer,
          meta:"Account Address of the manufacturer",
          description:`Manufacturer created this company and can
          add products as well as ship the booked products`,
          style:{overflowWrap:'break-word'}
        },
        {
            header:sellerFee,
          meta:"Seller Registration Fee",
          description:`This is the minimum amount of wei set by manufacturer 
          as a fee to be paid in order to become a seller 
          and book products`
        },
        {
            header:totalProducts,
          meta:"Total number of products",
          description:`This is the total number of 
          products added by this manufacturer`
        },
    ]
    
    return (
        <div>
            <h3 style={{textAlign:"center",fontWeight:700,fontSize:30,marginBottom:10}}>Company Details</h3>
            <br></br>
            <Grid>
                <Grid.Row>
                <Grid.Column width={10}>
                <Card.Group items={items}></Card.Group>
                </Grid.Column>
                <Grid.Column width={6}>
                <SellerForm address={address}></SellerForm>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Link to={`/companies/${address}/products`}>
                        <Button color="black">View Products</Button></Link>
                </Grid.Column>
                </Grid.Row>
            </Grid>
           
        </div>
    );
};

export default CompanyDetail;