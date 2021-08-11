import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { getFirestore, storage } from '../../firebase/conexionFbase';
import { NavLink } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import ListarClientes from '../ListarClientes';
import ListarComentarios from './ListarComentarios';

function AdminContainer(props) {
    const [error, setError] = useState();
    const[clientes,setClientes]=useState([]);
    const[newUsers,setNewUsers]=useState();
    const[filterId,setfilterId]=useState("");
    const[filterAbogado,setFilterAbogado]=useState("");
    const [loading, setLoading] = useState();
    const [items, setItems] = useState([]);
    const [Comentarios, setComentarios] = useState([]);
    // CREA USUARIO EN FIREBASE
    function setUser(params) {
        const Usuario = document.getElementById("user").value;
        const passWord = document.getElementById("password").value
        const db = getFirestore();
        const cliente = db.collection("Usuarios");
        const newUser = {
            Usuario: Usuario,
            passWord: passWord
        }
        cliente.add(newUser).then((id) => {
            
        }).catch(e => {
            console.log("error");
            console.log(e);
            setError(e);
        }).finally(() => {
            setNewUsers(newUser);
            setLoading(false);
        })

    }
    // TRAE USUARIOS
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
                setItems(querySnapshot.docs.map((doc) => doc.data()));
            })
            .catch((error) => {
                console.log("Error search items", error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [newUsers]);
    // TRAE COMENTARIOS
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
                setComentarios(querySnapshot.docs.map((doc) => doc.data()));
            })
            .catch((error) => {
                console.log("Error search items", error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);
    // TRAE CLIENTES
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
                setClientes(querySnapshot.docs.map((doc) => doc.data()));
                console.log("Cambio");
            })
            .catch((error) => {
                console.log("Error search items", error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);
    function hadleFilterAbogados(params) {
        const cliente= document.getElementById("cliente").value;
        const abogado= document.getElementById("abogado").value;
        if (cliente=="cliente") {
            setfilterId("");
        } else{
            setfilterId(cliente); 
        }
        if(abogado!="abogado"){
            setFilterAbogado(abogado); 
        }else{
            setFilterAbogado(""); 
        }
        
        console.log(abogado);
        console.log(cliente);
    }
    
    return (
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-2 m-2 p-2">
                    <h6 className="text-center">Usuarios</h6>
                    {items.length > 0 ? (
                        items.map((data, index) => {
                            console.log(data.fecha);
                            return (

                                <NavLink to="/" className="btn btn-success w-100 my-1">{data.Usuario}</NavLink>

                            );
                        })
                    ) : (
                        <ul classNameName="col-12 text-center mt-5">
                            <p>Esperando Usuarios</p>
                            <Spinner animation="border" variant="info" />
                        </ul>
                    )}
                </div>
                <div className="col-5 border rounded m-2 p-2">
                    <h6>Buscar Clientes</h6>
                </div>
                <div className="col-3 border rounded m-2 p-2">
                    <h6>Registro de Usuarios</h6>
                    <div class="mb-3">
                        <label for="user" class="form-label">Usuario</label>
                        <input type="email" class="form-control" id="user" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password" />
                    </div>

                    <button type="submit" onClick={() => { setUser() }} class="btn btn-primary">Registrar Usuario</button>
                </div>

            </div>
            <div className="row">
                            {/* Filter Abogado */}
                <div className="col">
                    <select onChange={hadleFilterAbogados} id="abogado" class="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option value="abogado" selected>Abogado</option>
                        {items.length > 0 ? (
                            items.map((data, index)=> {
                                console.log(data.fecha);
                            
                                return (

                                    <option  value={data.Usuario}>{data.Usuario}</option>

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
                            {/* Filter Cliente */}
                <div className="col">
                    <select id="cliente" onChange={hadleFilterAbogados} class="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option value="cliente" selected>Cliente</option>
                        {clientes.length > 0 ? (
                            clientes.map((data, index) => {
                                console.log(data.fecha);
                                return (

                                    <option value={data.dni}>{data.name}</option>

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
                            {/* Filter Fecha */}
                <div className="col">
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>Fecha</option>
                        {Comentarios.length > 0 ? (
                            Comentarios.map((data, index) => {
                                let date = data.fecha;
                                let secDate = date.seconds;
                                console.log(secDate);
                                let newDate = new Date(date);
                                return (

                                    <option tipe="date" value={data.fecha}>{newDate.toLocaleDateString()}</option>

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
                <div className="col">
                    <button className="btn btn-success">Filtrar</button>
                </div>

            </div>
            <div className="row">
            <div className="container">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Cliente</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Comentario</th>
                            <th scope="col">Fecha Actualizacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Comentarios.length > 0 ? (
                            Comentarios.filter((data)=>{
                                if (filterId == "") {
                                    console.log("if");
                                    return data
                                } else if(data.id ==filterId) {
                                    console.log("else");
                                    console.log(data);
                                   return data;
                                }
                            }).filter((data)=>{
                                if (filterAbogado == "") {
                                    console.log("if");
                                    return data
                                }else if (data.abogado==filterAbogado) {
                                    return data
                                }

                            }).map((data, index) => {
                                console.log(data.fecha);

                                
                                return (
                                    
                                    <ListarComentarios key={index} id={data.id} abogado={data.abogado}descripcion={data.descripcion} fecha={data.fecha}/>
                                
                                );
                            })
                        ) : (
                            <ul classNameName="col-12 text-center mt-5">

                                <Spinner animation="border" variant="info" />
                            </ul>
                        )}
                        </tbody>
                    
                </table>



            </div>
        
            </div>
        </div>
    );
}

export default AdminContainer;