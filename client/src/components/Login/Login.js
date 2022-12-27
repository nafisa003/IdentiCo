import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import { UserContext } from '../../App';
import { handleGoogleSignIn, intializeLoginFramework } from './firebaseTask';


const Login = () => {
    const [user,setUser]=useContext(UserContext);
    const [open,setOpen]=useState(true);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    intializeLoginFramework();

const googleSignIn=()=>{
    handleGoogleSignIn()
    .then(res=>{
        setUser(res)
        setOpen(false)
        history.replace(from)}
        )
    
    
};

const modalStyle={
    textAlign:"center",
    backgroundColor:"yellow"
}


  

    
    return (
        <div>
            {/* <button onClick={googleSignIn}> Sign in</button> */}
            <Modal
            style={modalStyle}
            open={open}
            size="small">
                <Modal.Header style={{color:"#900020"}}>
                   <h2>Get Started!</h2> 
                    </Modal.Header>
                <Modal.Content>
                    <h3 style={{fontWeight:800}}>Log in with Google</h3>
                    <Button icon="google" content="Log in"
                    onClick={googleSignIn} color="yellow"></Button>
                </Modal.Content>
                {/* <Modal.Content>
                  <h3 style={{fontWeight:800}}>Log in with Email</h3>
                  <Form>
                      <Form.Field>
                          
                          <Input placeholder="Email" icon="mail"
                          size="small"></Input>
                      </Form.Field>
                      <Form.Field>
                         
                          <Input size="small" placeholder="Password" icon="key"></Input>
                      </Form.Field>
                      <Button color="yellow">Log in</Button>
                  </Form>
                </Modal.Content> */}

            </Modal>
        </div>
    );
};

export default Login;