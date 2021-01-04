import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ContextProvider } from './controllers';
import { Header, Footer } from './components';
import { Changelog, SearchSubsets, SubsetPage, SubsetForm, Step6Publish, NoMatch } from './pages';
import './pages/SubsetDraft/container.css';

export default function App() {
    return (
        <ContextProvider>
            {/** TODO: find a better solution?
             * enabled 'forceRefresh' just to make
             * application redirect through the backend
             * for protected routes (like '/editor').
            */}
            <BrowserRouter forceRefresh={true}>
                <Header/>
                <Switch>
                    <Redirect push from='/' exact to='/search' />
                    <Route path='/search' exact component={ SearchSubsets }/>
                    {/*<Redirect push from='/edit' to='/auth/editor' />*/}
                    <Route path='/auth/save' component={ Step6Publish }/>
                    <Route path='/editor' component={ SubsetForm }/>
                    <Route path='/changelog' exact component={ Changelog }/>
                    <Route path='/subsets/:id' exact component={ SubsetPage }/>
                    <Route path='/subsets/:id/versions' exact component={ SubsetPage }/>
                    <Route path='/subsets/:id/versions/:versionId' exact component={ SubsetPage }/>
                    <Route component={ NoMatch }/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        </ContextProvider>
    );
}
