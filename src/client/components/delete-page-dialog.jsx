import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

@inject('rootStore', 'projectStore')
@observer
class DeletePageDialog extends React.Component {
    render() {
        const { rootStore } = this.props;

        return (
            <Dialog
                open={rootStore.isDeletePageDialogOpen}
                onClose={this.handleClose}>
                <DialogTitle>
                    Delete page?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={this.handleDeletePage} 
                        color="primary"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    handleClose = () => {
        this.props.rootStore.setDeletePageDialogOpen(false);
    }

    handleDeletePage = () => {
        const { projectStore } = this.props;
        projectStore.deletePage(projectStore.projectName, projectStore.selectedPage);
    }
}

DeletePageDialog.propTypes = {
    rootStore: PropTypes.object,
    projectStore: PropTypes.object
}

export default DeletePageDialog;
