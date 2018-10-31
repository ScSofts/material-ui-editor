import React from 'react';
import ReactDOM from 'react-dom';
import { observer, Provider } from "mobx-react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppMain from "./components/app-main";
import SessionStore from "./stores/session.store";

export const stores = new SessionStore();

@observer
class Root extends React.Component {
    render() {
        const appMain = props => {
            return <AppMain {...props} />;
        };
        return (
            <Provider {...stores}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={appMain} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

// Switch to typography v2
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

ReactDOM.render(<Root />, document.getElementById('root'));
