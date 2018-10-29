import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import PagesList from '../pages-list';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: '0px',
        marginTop: '64px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '56px'
        }
    },
    drawerPaperOpen: {
        width: '200px'
    }
});

@inject('rootStore')
@observer
class LeftDrawer extends React.Component {
    render() {
        const { classes, rootStore } = this.props;
        const open = rootStore.showPageList;

        return (
            <Drawer
                variant="persistent"
                open={open}
                classes={{
                    paper: classnames(classes.drawerPaper, { [classes.drawerPaperOpen]: open })
                }}
            >
                <PagesList />
            </Drawer>
        );
    }
}

LeftDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object
}

export default withStyles(styles)(LeftDrawer);
