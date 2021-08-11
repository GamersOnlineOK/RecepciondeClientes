import React from 'react';
import Item from './Item';

function ItemListContainer(props) {
    const DATO = [{
        title: "leonardo",
        description: "De Los Santos",
        causa: "administrativa"
    },
    {
        title: "Damian",
        description: "Gutierrez",
        causa: "penal"
    }]

    return (
        <>
        <div className="container">
            <ul class="list-group">
                {DATO !== null ? (
                    DATO.map((data, index) => {
                        return <Item key={index} title={data.title} description={data.description} causa={data.causa} />
                    })
                ) : (
                    <h3>Error en la carga</h3>
                )

                }

            </ul>
        </div>
            
        </>
    );
}

export default ItemListContainer;