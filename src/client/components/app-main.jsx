import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import Header from './layout/header';
import Content from "./layout/content";
import LeftDrawer from "./layout/left-drawer";
import RightDrawer from "./layout/right-drawer";
import LoadingSpinner from "./loading-spinner";
import CreateProjectDialog from './create-project-dialog';
import OpenProjectDialog from './open-project-dialog';
import DeleteProjectDialog from './delete-project-dialog';

const styles = {
    root: {
        flexGrow: 1,
        height: 'calc(100vh - 20px)',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
    }
};

@observer
class AppMain extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Header />
                <LeftDrawer />
                <Content />
                <RightDrawer />
                <LoadingSpinner />
                <CreateProjectDialog />
                <OpenProjectDialog />
                <DeleteProjectDialog />
            </div>
        );
    }
}

AppMain.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppMain);
