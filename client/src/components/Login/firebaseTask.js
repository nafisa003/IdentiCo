import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const intializeLoginFramework=()=>{
   if(firebase.apps.length==0)
      firebase.initializeApp(firebaseConfig); 
}

export const handleGoogleSignIn=()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth()
.signInWithPopup(provider)
.then((res) => {
const {displayName,email}=res.user;
const signedInUser={
    isSignedIn:true,
    name:displayName,
    email:email
};
return signedInUser;

}).catch((error) => {

console.log(error.message);
// ...
});
};

export const handleSignOut=()=>{
   return firebase.auth().signOut().then(() => {
       const signedOutUser={
           isSignedIn:false,
           name:'',
           email:''
       };
       return signedOutUser;
      }).catch((error) => {
       console.log(error);
      });
};

