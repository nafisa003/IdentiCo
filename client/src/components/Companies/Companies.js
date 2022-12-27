import React, { useContext, useEffect, useState, } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';
import { CompanyContext } from '../../App';
import factoryInstance from '../../deploy/factory';

const Companies = () => {
 
    const [companies,setCompanies]=useState([]);
    const [companyName,setCompanyName]=useContext(CompanyContext)
    useEffect(()=>{
     let unmounted=false;

     if(unmounted===false){
    (async ()=>{
        const companyData=await factoryInstance.methods.getDeployedCompanies().call();
       setCompanies(companyData);
    })();
    }
    return ()=>{unmounted=true};
    },[]);

    const items=companies.map((address)=>{
        return{           
             header:`Blockchain Address:  ${address}`,
             extra:<Link to={`/companies/${address}`}><Button basic color="blue">View Details</Button></Link>,
             fluid:true
        }
    })
    return (
        <div>
           
            <h3 style={{textAlign:"center",fontWeight:700,fontSize:30}}>COMPANIES</h3>
            <br />
            <Link to="/companies/new">
            <Button color="black" content="Add Company" icon="add" floated="right"></Button>
            </Link>
            <Card.Group items={items}></Card.Group>
            
        </div>
    );
};


export default Companies;