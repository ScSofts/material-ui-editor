import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

@inject('rootStore', 'projectStore')
@observer
class DeleteProjectDialog extends React.Component {
    render() {
        const { rootStore } = this.props;

        return (
            <Dialog
                open={rootStore.isDeleteProjectDialogOpen}
                onClose={this.handleClose}>
                <DialogTitle>
                    Delete project?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={this.handleDeleteProject} 
                        color="primary"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    handleClose = () => {
        this.props.rootStore.setDeleteProjectDialogOpen(false);
    }

    handleDeleteProject = () => {
        const { projectStore } = this.props;

        projectStore.deleteProject(projectStore.projectName);
        this.handleClose();
    }
}

DeleteProjectDialog.propTypes = {
    rootStore: PropTypes.object,
    projectStore: PropTypes.object
}

export default DeleteProjectDialog;
