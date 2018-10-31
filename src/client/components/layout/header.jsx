import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import HeaderMenu from './header-menu';
import Logo from '../../../../static/images/material-ui-logo.svg';

const styles = theme => ({
    appBar: {
        position: 'fixed',
        zIndex: theme.zIndex.drawer + 1
    },
    appBarLogo: {
        verticalAlign: 'middle',
        display: 'inline-block',
        color: 'white'
    },
    appToolbar: {
        backgroundColor: theme.palette.primary.main
    },
    appToolbarContent: {
        color: 'white',
        paddingRight: '5px',
        paddingLeft: '18px'
    },
    appTitle: {
        flex: '1',
        marginLeft: '10px',
        color: 'white'
    }
});

@inject('projectStore')
@observer
class Header extends React.Component {
    render() {
        const { classes, projectStore } = this.props;
        return (
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.appToolbar}>
                    <img src={Logo} className={classes.appBarLogo} alt="material ui logo" width="48px" height="48px" />
                    <Typography variant="h6" className={classes.appTitle}>
                        Material UI Desinger
                    </Typography>
                    <Typography variant="subtitle1" className={classes.appToolbarContent}>
                        {projectStore.projectName}
                    </Typography>
                    <HeaderMenu />
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    projectStore: PropTypes.object
}

export default withStyles(styles)(Header);
