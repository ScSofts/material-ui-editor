import React from 'react'
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
    projectList: {
        maxHeight: '100px'
    }
};

@inject('rootStore', 'projectStore')
@observer
class OpenProjectDialog extends React.Component {
    componentDidMount() {
        this.props.projectStore.getProjectList();
    }

    render() {
        const { classes, rootStore, projectStore } = this.props;
        const { projectList, tempProjectName } = projectStore;
        const open = rootStore.isOpenProjectDialogOpen;

        return (
            <Dialog
                fullWidth={true}
                open={open}
                onClose={this.handleClose}
                >
                <DialogTitle>
                    Open Project
                    <DialogContentText>
                        Select the project to open.
                    </DialogContentText>
                </DialogTitle>
                <DialogContent>
                    <List className={classes.projectList}>
                        {
                            projectList.map((project, index) => 
                            <ListItem 
                                key={index} 
                                button
                                selected={tempProjectName === project}
                                onClick={this.handleProjectSelect(project)}
                            >
                                <ListItemText primary={project} />
                            </ListItem>)
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={this.handleClose} 
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={this.handleOpen} 
                        color="primary"
                        disabled={!tempProjectName}
                    >
                        Open
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    handleClose = () => {
        const { rootStore, projectStore } = this.props;

        rootStore.setOpenProjectDialogOpen(false);
        projectStore.setTempProjectName(null);
    }

    handleProjectSelect = (project) => () => {
        this.props.projectStore.setTempProjectName(project);
    }

    handleOpen = () => {
        const { projectStore } = this.props;

        // Open project
        projectStore.openProject(projectStore.tempProjectName);
        
        projectStore.setTemplateName(null);
        projectStore.setProjectName(projectStore.tempProjectName);
        this.handleClose();
    }
}

OpenProjectDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object,
    projectStore: PropTypes.object
}

export default withStyles(styles)(OpenProjectDialog);
