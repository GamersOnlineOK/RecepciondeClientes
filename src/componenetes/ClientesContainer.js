import React, { useEffect, useState } from 'react';
import ListarClientes from './ListarClientes';
import { getFirestore, storage } from '../firebase/conexionFbase';
import { Spinner } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { NavLink } from 'react-router-dom';
function ClientesContainer() {
    const [item, setItems] = useState([]);
    const [loading, setLoading] = useState();
    const [clientes, setClientes] = useState();
    const db = getFirestore().collection("cliente").get();

    useEffect(() => {
        setLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection("cliente");
        itemCollection
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    console.log("sin resultados");
                }
                setItems(querySnapshot.docs.map((doc) => doc.data()));
                console.log("Cambio");
            })
            .catch((error) => {
                console.log("Error search items", error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);
    return (
        
            <div className="container">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Cliente</th>
                            <th scope="col">Dni</th>
                            <th scope="col">Abogado</th>
                            <th scope="col">Fecha Actualizacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.length > 0 ? (
                            item.map((data, index) => {
                                console.log(data.fecha);
                                return (
                                
                                    <ListarClientes key={index} id={data.id} name={data.name} dni={data.dni} fecha={data.fecha} abogado={data.abogado} descripcion={data.descripcion} />
                                
                                );
                            })
                        ) : (
                            <ul classNameName="col-12 text-center mt-5">
                                <h3>No hay Clientes para mostrar por favor ingrese un Cliente.</h3>
                                <NavLink className="btn btn-primary px-5 mx-5" to='/'>Cargar Cliente</NavLink>
                                <Spinner animation="border" variant="info" />
                            </ul>
                        )}
                        </tbody>
                    
                </table>



            </div>
        

    );
}

export default ClientesContainer;