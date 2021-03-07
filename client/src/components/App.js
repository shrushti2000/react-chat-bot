import React from 'react';
import {Route,BrowserRouter,Switch} from 'react-router-dom'
import Chatbot from './chatbot/Chatbot';
import About from './pages/About';
import Landing from './pages/Landing';
import Header from './shop/Header';
import Shop from './shop/Shop';
const App=()=> {
    return(
        <div>
       
        <BrowserRouter>
        <div className="container">

        
        <Header/>
           
        <Switch>

       
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/shop" component={Shop}></Route>
            </Switch>
            </div>
            <Chatbot/>
        </BrowserRouter>
        </div>
    )
   
    }

export default App;