import React, {Component} from 'react';
import {Container} from 'semantic-ui-react'
import {BrowserRouter, Route} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import MainMenu from './MainMenu'
import MainSite from './MainSite'
import OfferList from "./OfferList";
import Contact from "./Contact";
import './App.css';
import CreateOrder from "./CreateOrder";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Container>
                    <Container>
                        <MainMenu/>
                    </Container>
                    <Container>
                        <Route exact path="/" component={MainSite}/>
                        <Route path="/offerlist" component={OfferList}/>
                        <Route path="/createorder/:id" component={CreateOrder}/>
                        <Route path="/contact" component={Contact}/>
                    </Container>
                </Container>
            </BrowserRouter>
        );
    }
}
export default App;
