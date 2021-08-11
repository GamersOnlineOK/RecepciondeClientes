import logo from './logo.svg';
import './App.css';
import Menu from './componenetes/Menu';
import CargaClienteContainer from './componenetes/CargaClienteContainer';
import ClientesContainer from './componenetes/ClientesContainer';
import AppRouter from './router/Router';
import { useEffect, useState } from 'react';
import { MainProvider } from './componenetes/Provider/MainProvider';
import { getFirestore, storage } from './firebase/conexionFbase';

function App() {
  const [login, setLogin] = useState(false);
  const db = getFirestore().collection("cliente").get();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState()

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
        setUser(querySnapshot.docs.map((doc) => doc.data()));
        console.log("Cambio");
      })
      .catch((error) => {
        console.log("Error search items", error);
      })
      .finally(() => {

        setLoading(false);
      })
  }, []);

  function verifyLogin() {
    const name = document.getElementById("user").value;
    const pass = document.getElementById("password").value;
    console.log(name, pass);

  }

  if (login) {


    return (
      <MainProvider>
        <AppRouter />
      </MainProvider>


    );
  } else {
    return (

      <div className="container">
        <div className="row justify-content-center align-item-center position-absolute top-50 start-50 translate-middle">
          <div className="col-12 mt-5 ">
            <div className="text-primary text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
            </div>
            <div class="mb-3">
              <label for="user" class="form-label">Usuario</label>
              <input type="text" class="form-control" id="user" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" />
            </div>

            <a  onClick={() => { verifyLogin() }}class="btn btn-primary w-100">Iniciar Sesion</a>
          </div>

        </div>

      </div>

    );
  }

}

export default App;
