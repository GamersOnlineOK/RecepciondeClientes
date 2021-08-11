import React, {useState } from 'react';
import ListarClientes from './ListarClientes';
import { getFirestore, storage } from '../firebase/conexionFbase';
import { Spinner } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useParams } from 'react-router-dom';
import CargarComentario from './comentarios/CargarComentarios';
import GetComentario from './comentarios/getComentarios';
function ClienteDetail() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const { UserCategory } = useParams();

    function setComentario(params) {
        
        const descripcion = document.getElementById("descripcion").value;
        
        let fecha = Date.now();
        const db = getFirestore();
        const cliente = db.collection("comentarios");
        console.log(cliente);
        const newCliente ={
            
            id: UserCategory,
            fecha: fecha,
            descripcion:descripcion
        }
        cliente.add(newCliente).then(( id ) => {
            
        }).catch(e => {
            console.log("error");
            console.log(e);
            setError(e);
        }).finally(() => {
            setLoading(false);
        })
    }
    

    


    return (

        <div>
            <div className="container">

                <div className="row mt-5">
                    <CargarComentario />
                </div>
                <div className="row border rounded m-2">
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Descripcion Breve de la causa</label>
                        <textarea class="form-control" id="descripcion" rows="3"></textarea>
                    </div>
                    <div>
                        <button type="submit" onClick={() => { setComentario() }} class="btn btn-primary m-2">Cargar Comentario</button>
                    </div>
                    
                </div>
                <div>
                    <h6 className="border-bottom border-success border-3 p-2">Listado de Comentarios:</h6>
                    <GetComentario></GetComentario>
                </div>

            </div>
        </div>


    );
}

export default ClienteDetail;