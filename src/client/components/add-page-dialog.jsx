import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

import { pageTemplate } from '../constants/pageTemplate';

@inject('rootStore', 'projectStore')
@observer
class AddPageDialog extends React.Component {
    render() {
        const { rootStore, projectStore } = this.props;
        const { tempPageName } = projectStore;

        return (
            <Dialog
                fullWidth={true}
                open={rootStore.isAddPageDialogOpen}
                onClose={this.handleClose}>
                <DialogTitle>
                    Enter page name
                </DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="pageName"
                    label="Page Name"
                    type="text"
                    fullWidth
                    value={tempPageName || ''}
                    onChange={this.handlePageNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={this.handleAddPage} 
                        color="primary"
                        disabled={!tempPageName}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    handlePageNameChange = (event) => {
        this.props.projectStore.setTempPageName(event.target.value);
    }

    handleClose = () => {
        const { rootStore, projectStore } = this.props;

        rootStore.setAddPageDialogOpen(false);
        projectStore.setTempPageName(false);
    }

    handleAddPage = () => {
        const { projectStore } = this.props;
        const pageName = projectStore.tempPageName.toPascalCase();
        const pageContent = pageTemplate.format(pageName);

        projectStore.addPage(projectStore.projectName, pageName, pageContent);
        this.handleClose();
    }
}

AddPageDialog.propTypes = {
    rootStore: PropTypes.object,
    projectStore: PropTypes.object
}

export default AddPageDialog;
