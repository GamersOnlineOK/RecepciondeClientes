import React, { useContext, useEffect, useState,createContext  } from 'react';
import { getFirestore, storage } from '../../firebase/conexionFbase';


const MainContext=createContext();
export function useMainConsume(params) {
    return useContext(MainContext);
    
}
export function MainProvider({children}) {
    const db = getFirestore().collection("cliente").get();
    const[user,setUser]=useState();
    const[loading,setLoading]=useState();
    useEffect(() => {
        setLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection("Usuarios");
        itemCollection
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    console.log("sin resultados");
                }
                setUser(querySnapshot.docs.map((doc) => doc.data()));
                console.log("Cambio");
            })
            .catch((error) => {
                console.log("Error search items", error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    function login(user, password) {


        
    }

    return (
        <MainContext.Provider
            value={{
               user
            }} >
            {children}
        </MainContext.Provider>
    )
}