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
import Typography from '@material-ui/core/Typography';

const styles = {
    fileName: {
        display: 'inline-block',
        paddingLeft: '10px'
    }
};

@inject('rootStore', 'projectsStore')
@observer
class ImportProjectDialog extends React.Component {
    constructor(props) {
        super(props);

        this.fileInputRef = null;
    }

    render() {
        const { classes, rootStore, projectsStore } = this.props;
        const open = rootStore.isImportProjectDialogOpen;

        return (
            <Dialog
                fullWidth={true}
                open={open}
                onClose={this.handleClose}
                >
                <DialogTitle>
                    Import Project
                    <DialogContentText>
                        Select project to import.
                    </DialogContentText>
                </DialogTitle>
                <DialogContent>
                <input
                    hidden
                    accept=".zip"
                    id="flat-button-file"
                    type="file"
                    name="project"
                    ref={this.setFileInputRef}
                    onChange={this.handleUpload}
                />
                <label htmlFor="flat-button-file">
                    <Button component="span" color="primary" variant="contained">Choose file</Button>
                </label>
                <Typography variant="body2" className={classes.fileName}>
                    {projectsStore.importProjectFile && projectsStore.importProjectFile.name}
                </Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={this.handleClose} 
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={this.handleImport} 
                        color="primary"
                    >
                        Import
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    handleClose = () => {
        const { rootStore, projectsStore } = this.props;

        rootStore.setImportProjectDialogOpen(false);
        projectsStore.setImportProjectFile(null);
    }

    handleUpload = () => {
        const fileInputRef = this.fileInputRef;

        if(fileInputRef && fileInputRef.files.length > 0) {
            this.props.projectsStore.setImportProjectFile(fileInputRef.files[0]);
        }
    }

    handleImport = () => {
        const { projectsStore } = this.props;

        projectsStore.importProject(projectsStore.importProjectFile);
        this.handleClose();
    }

    setFileInputRef = element => {
        this.fileInputRef = element;
    }
}

ImportProjectDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object,
    projectsStore: PropTypes.object
}

export default withStyles(styles)(ImportProjectDialog);
