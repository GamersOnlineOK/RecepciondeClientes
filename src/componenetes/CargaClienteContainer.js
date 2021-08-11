import React from 'react';
import CargaCliente from './CargaCliente';


function CargaClienteContainer(props) {

    return (
        <>
            <div className="container mt-5">
                <h3 className="border-bottom">Formulario de Alta para Clientes</h3>
                <CargaCliente/>
            </div>

        </>
    );
}

export default CargaClienteContainer;