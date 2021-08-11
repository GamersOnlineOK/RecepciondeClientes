import React, { useEffect, useState } from 'react';
import { getFirestore, storage } from '../../firebase/conexionFbase';
import { useParams } from 'react-router-dom';
import ListarClientes from '../ListarClientes';
import ListarComentarios from './ListarComenarios';
import { Spinner } from 'react-bootstrap';
function GetComentario(props) {

    const { UserCategory } = useParams();
    const [item, setItems] = useState([]);
    const [loading, setLoading] = useState();
    const [clientes, setClientes] = useState();

    const db = getFirestore().collection("cliente").get();

    useEffect(() => {
        setLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection("comentarios");
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
            {item.length > 0 ? (
                item.map((data, index) => {

                    if (data.id == UserCategory) {
                        let date = data.fecha;
                        let secDate = date.seconds;
                        console.log(secDate);
                        let newDate = new Date(date);
                        return (
                            <div className="border-bottom border-3 p-2">
                                <p>{data.descripcion}</p> <span>{newDate.toLocaleDateString()}</span>
                            </div>

                        );
                    } else {
                        <h3>Sin COmentarios</h3>
                    }

                })
            ) : (
                <ul classNameName="col-12 text-center mt-5">

                    <Spinner animation="border" variant="info" />
                </ul>
            )}
        </div>




    );
}

export default GetComentario;
