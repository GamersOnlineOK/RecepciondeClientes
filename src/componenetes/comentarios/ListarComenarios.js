import React, { useEffect, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useParams } from 'react-router-dom';

function ListarComentarios(props) {

    const { UserCategory } = useParams();


    return (

        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 border-bottom">
                        <h6>Nombre: {props.name}</h6>
                        <h6>Telefono: {props.telefono}</h6>
                        <h6>Dni: {props.dni}</h6>
                    </div>
                    <div className="col-12 col-md-6 border-bottom">
                        <h6 className="mt-2">Comentario al dar Alta</h6>
                        <p>{props.descripcion}</p>
                        
                    </div>
                </div>



            </div>
        </div>


    );
}

export default ListarComentarios;