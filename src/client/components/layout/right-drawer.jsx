import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import ComponentList from '../component-list';

const styles = theme => ({
    rightDrawer: {
        overflowY: 'auto',
    },
    drawerPaper: {
        position: 'relative',
        width: '70px',
        marginTop: '64px',
        overflowY: 'unset',
        [theme.breakpoints.down('xs')]: {
            marginTop: '56px'
        }
    }
});

class RightDrawer extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Drawer
                variant="permanent"
                anchor="right"
                className={classes.rightDrawer}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <ComponentList />
            </Drawer>
        );
    }
}

RightDrawer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RightDrawer);
