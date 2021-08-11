import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom"; 



function ListarComentarios(props) {
    let date = props.fecha;
    let secDate = date;
    console.log(secDate + "render");
    let newDate = new Date(date);
    console.log(newDate.toLocaleDateString());





    return (

        <tr>
            <th scope="row">{props.abogado}</th>
            <td>{newDate.toLocaleDateString()}</td>
            <td>{props.descripcion}</td>
            <td>
                <Link to={`/cliente/detail/${props.dni}`}>
                    <Button id={props.dni} className="mt-1 btn-left  w-100" variant="primary">Ver</Button>
                </Link>
            </td>
        </tr>

    );
}

export default ListarComentarios;