import React from 'react';

function Item(props) {

    return (
        <>

            <li class="list-group-item d-flex">
                <p className="px-3">{props.title}</p>
                <p className="px-3">{props.description}</p>
                <p className="px-3">{props.causa}</p>
                <button className="btn btn-success">Detalle</button>
            </li>

        </>
    );
}

export default Item;