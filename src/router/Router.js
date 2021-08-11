import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import CargaClienteContainer from '../componenetes/CargaClienteContainer';
import ClienteDetail from '../componenetes/ClienteDetail';
import ClientesContainer from '../componenetes/ClientesContainer';
import Menu from '../componenetes/Menu';
import AdminContainer from '../componenetes/paneladmin/AdminContainer';


function AppRouter() {
    return (
        <BrowserRouter>
            
                <Menu />
                <Switch>
                    <Route exact  path="/" component={CargaClienteContainer} />
                    <Route exact path="/clientes" component={ClientesContainer} />
                    <Route exact path="/cliente/detail/:UserCategory" component={ClienteDetail}></Route>
                    <Route exact path="/adminpanel" component={AdminContainer}></Route>
                </Switch>
                
            
        </BrowserRouter>
    );
}

export default AppRouter;