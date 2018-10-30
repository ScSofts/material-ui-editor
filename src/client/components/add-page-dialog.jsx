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

@inject('rootStore', 'projectsStore')
@observer
class AddPageDialog extends React.Component {
    render() {
        const { rootStore, projectsStore } = this.props;
        const { tempPageName } = projectsStore;

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
        this.props.projectsStore.setTempPageName(event.target.value);
    }

    handleClose = () => {
        const { rootStore, projectsStore } = this.props;

        rootStore.setAddPageDialogOpen(false);
        projectsStore.setTempPageName(false);
    }

    handleAddPage = () => {
        const { projectsStore } = this.props;
        const pageName = projectsStore.tempPageName.toPascalCase();
        const pageContent = pageTemplate.format(pageName);

        projectsStore.addPage(projectsStore.projectName, pageName, pageContent);
        this.handleClose();
    }
}

AddPageDialog.propTypes = {
    rootStore: PropTypes.object,
    projectsStore: PropTypes.object
}

export default AddPageDialog;
