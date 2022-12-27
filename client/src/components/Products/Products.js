import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import companyInstance from '../../deploy/company';
import ProductRow from './ProductRow';

const Products = () => {
    const {address}=useParams();
    // console.log(address)
   const company=companyInstance(address);
   const [productCount,setProductCount]=useState('');
   const [products,setProducts]=useState([]);
   const [show,setShow]=useState(false);
    useEffect(()=>{

        (async ()=>{
          let count=await company.methods.getProductCount().call();
          
          setProductCount(count);
          count=parseInt(count);
          const data=await Promise.all(
              Array(count).fill().map((el,index)=>{
                  return company.methods.products(index).call();
              })
          )
        //    console.log(data)
         
        setProducts([data]);
        setShow(true)
       
        })();
    },[])
//    console.log(products)
    const {Header,Row,HeaderCell,Body}=Table;
    return (
        <div>
             <h3 style={{textAlign:"center",fontWeight:700,fontSize:30}}>Products List</h3>
            <Link to={`/companies/${address}/products/new`}>
            <Button floated="right" style={{marginBottom:10}} color="black">Add Product</Button>
            </Link>
           
            
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Product Name</HeaderCell>
                        <HeaderCell>Price (wei)</HeaderCell>
                        <HeaderCell>Stock</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                        <HeaderCell>Buy now!</HeaderCell>
                        <HeaderCell>Ship Product</HeaderCell>
                        <HeaderCell>Verify Purchase</HeaderCell>
                        <HeaderCell></HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {  show && (
                        products[0].map((element,index)=>{
                        return <ProductRow key={index} id={index} product={element}></ProductRow> })
                    )}
                </Body>
            </Table>
            <div>Found {productCount} products!</div>
        </div>
    );
};

export default Products;