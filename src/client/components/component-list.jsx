import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';

import { components } from '../constants/components';

@inject('projectStore')
@observer
class ComponentList extends React.Component {
    render() {
        const { projectStore } = this.props;
        return (
            <List>
                {
                    components.map((component, index) =>
                        <ListItem button key={index} onClick={this.componentClickHandler(component)} disabled={!projectStore.projectName}>
                            <Tooltip title={component.displayName}>
                                <ListItemIcon>
                                    {component.icon}
                                </ListItemIcon>
                            </Tooltip>
                        </ListItem>
                    )
                }
            </List>
        );
    }

    componentClickHandler = (component) => () => {
        const editor = ace.edit('codeEditor');
        const session = editor.getSession();
        const cursorPosition = editor.getCursorPosition();

        session.insert(cursorPosition, component.snippet);

        component.imports.forEach(importStatement => {
            const location = editor.find(importStatement)

            if(!location) {
                session.insert({row:0, column: 0}, importStatement);
            }
        });
        
        editor.focus();
    }
}

ComponentList.propTypes = {
    projectStore: PropTypes.object
}

export default ComponentList;
