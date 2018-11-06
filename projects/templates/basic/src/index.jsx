import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import * as pages from './components/pages/index';

class Root extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        {
                            Object.values(pages).map((page, index) => <Route key={index} path={'*/' + page.name} component={page} />)
                        }
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
render(<Root />, document.getElementById('root'));
