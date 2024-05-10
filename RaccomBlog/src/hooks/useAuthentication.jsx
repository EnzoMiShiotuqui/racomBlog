import {db} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";

import { useState, useEffect } from "react"

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

   // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

   const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)
        try {
          const {user} =  await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
          )
           
          await updateProfile(user, {
            displayName: data.displayName
          })

          setLoading(false)

        } 
        catch (error) {
           console.log(error.message)
           console.log( typeof error.message)

           let systemErrorMessage 

           if(error.message.includes("Password")) {
              systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
           } else if(error.message.includes("email-already")) {
              systemErrorMessage = "E-mail ja cadastrado"
           } else {
              systemErrorMessage = "Ocorreum erro, por favor tente mais tarde "
           }
           setLoading(false)
           setError(systemErrorMessage)
        }

   }


  //logout
   const logout = () =>{
      checkIfIsCancelled()  
    
    signOut(auth)
   }

  // login

   const login = async(data) => {
      
      checkIfIsCancelled()
      
      setLoading(true)
      setError(false)

      try{
         await signInWithEmailAndPassword(auth, data.email, data.password)  
         setLoading(false)

      }catch (error){

        console.log(error.message);
        console.log(typeof error.message);
        console.log(error.message.includes("user-not"));
  
        let systemErrorMessage;
  
        if (error.message.includes("invalid-credential")) {
          systemErrorMessage = "Usuário não encontrado ou senha incorreta, tente novamente com outros dados";
        }  else {
          systemErrorMessage = "Ocorreu um erro, por favor tente novamente  mais tarde.";
        }

          setLoading(false)
          setError(systemErrorMessage)

      }
   }

   useEffect(() =>{
        return () => setCancelled(true)
   }, [])

   return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
   };
}
