import React, { useEffect, useState } from 'react';
import { getFirestore, storage } from '../../firebase/conexionFbase';
import { useParams } from 'react-router-dom';
import ListarClientes from '../ListarClientes';
import ListarComentarios from './ListarComenarios';
import { Spinner } from 'react-bootstrap';
import GetComentario from './getComentarios';
function CargarComentario(props) {

    const { UserCategory } = useParams();
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
            })
            .catch((error) => {
                console.log("Error search items", error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return (

        <div>
            <div className="container">
                {item.length > 0 ? (
                    item.map((data, index) => {
                        
                        if (data.dni == UserCategory) {
                            return (
                                <ListarComentarios 
                                key={index}
                                name={data.name}
                                abogado={data.abogado}
                                descripcion={data.descripcion}
                                telefono={data.phone}
                                dni={data.dni}></ListarComentarios>
                                
                            );
                        }else{
                            <h3>Sin COmentarios</h3>
                        }

                    })
                ) : (
                    <ul classNameName="col-12 text-center mt-5">
                        <h3>NO hay Comentario para mostrar por favor ingrese uno.</h3>
                        <Spinner animation="border" variant="info" />
                    </ul>
                )}

            </div>
            
        </div>


    );
}

export default CargarComentario;