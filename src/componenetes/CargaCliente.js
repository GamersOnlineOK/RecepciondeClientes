import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { getFirestore, storage } from '../firebase/conexionFbase';
const Swal = require('sweetalert2')

function CargaCliente(props) {
    const [clientID, setClientid] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [items, setItem] = useState([]);
    // FUNCION CONSRUCTORA
    function setCliente(params) {
        const name = document.getElementById("nombre").value;
        const dni = document.getElementById("dni").value;
        const phone = document.getElementById("telefono").value;
        const abogado = document.getElementById("abogado").value;
        const descripcion = document.getElementById("descripcion").value;
        console.log(name, dni, phone, descripcion);
        let fecha = Date.now();
        console.log(fecha);
        const db = getFirestore();
        const cliente = db.collection("cliente");
        console.log(cliente);
        const newCliente = {
            name: name,
            dni: dni,
            fecha: fecha,
            abogado: abogado,
            phone: phone,
            descripcion: descripcion
        }
        cliente.add(newCliente).then((id) => {
            setClientid(id);
            console.log(id);
        }).catch(e => {
            console.log("error");
            console.log(e);
            setError(e);
        }).finally(() => {
            Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: 'Cliente dado de alta Correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            document.getElementById("nombre").value="";
                document.getElementById("dni").value="";
                document.getElementById("telefono").value="";
                document.getElementById("abogado").value="";
                document.getElementById("descripcion").value="";
        })
    }
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
                setItem(querySnapshot.docs.map((doc) => doc.data()));
            })
            .catch((error) => {
                console.log("Error search items", error);
            })
            .finally(() => {
                setLoading(false);
                
            })
    }, []);



    return (
        <>

            <div className="row">
                <div className="col-6 mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" aria-describedby="emailHelp" />
                </div>
                <div class="col-6 mb-3">
                    <label for="dni" class="form-label">DNI</label>
                    <input type="text" class="form-control" id="dni" aria-describedby="emailHelp" />
                </div>
            </div>
            <div class="mb-3">
                <label for="telefono" class="form-label">Telefono</label>
                <input type="text" class="form-control" id="telefono" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label" >Abogado</label><select id="abogado" class="form-select" aria-label="Default select example">
                    <option selected>Seleccione Abogado</option>
                    {items.length > 0 ? (
                        items.map((data, index) => {
                            console.log(data.fecha);
                            return (

                                <option value={data.Usuario}>{data.Usuario}</option>

                            );
                        })
                    ) : (
                        <ul classNameName="col-12 text-center mt-5">
                            <p>Esperando Usuarios</p>

                            <Spinner animation="border" variant="info" />
                        </ul>
                    )}

                </select>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Descripcion Breve de la causa</label>
                <textarea class="form-control" id="descripcion" rows="3"></textarea>
            </div>
            <button type="submit" onClick={() => { setCliente() }} class="btn btn-primary">Cargar Cliente</button>


        </>
    );
}

export default CargaCliente;