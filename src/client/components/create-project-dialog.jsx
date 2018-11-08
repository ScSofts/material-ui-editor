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
import TextField from '@material-ui/core/TextField';

import { CreateProjectStep } from '../enums';

const styles = {
    templateList: {
        maxHeight: '100px'
    },
    hidden: {
        display: 'none'
    }
};

@inject('rootStore', 'projectStore')
@observer
class CreateProjectDialog extends React.Component {
    componentDidMount() {
        this.props.projectStore.getTemplateList();
    }

    render() {
        const { classes, rootStore, projectStore } = this.props;
        const { templateList, createProjectStep, tempTemplateName, tempProjectName } = projectStore;

        return (
            <Dialog
                fullWidth={true}
                open={rootStore.isCreateProjectDialogOpen}
                onClose={this.handleClose}
                >
                <DialogTitle>
                    Create Project
                    <DialogContentText>
                        <span hidden={createProjectStep !== CreateProjectStep.SelectTemplate}>Select the template to be used as the base.</span>
                        <span hidden={createProjectStep !== CreateProjectStep.EnterProjectName}>Enter project name.</span>
                    </DialogContentText>
                </DialogTitle>
                <DialogContent>
                    <div hidden={createProjectStep !== CreateProjectStep.SelectTemplate}>
                        <List className={classes.templateList}>
                            {
                                templateList.map((template, index) => 
                                <ListItem 
                                    key={index} 
                                    button
                                    selected={tempTemplateName === template}
                                    onClick={this.handleListItemClick(template)}
                                >
                                    <ListItemText primary={template} />
                                </ListItem>)
                            }
                        </List>
                    </div>
                    <div hidden={createProjectStep !== CreateProjectStep.EnterProjectName}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="projcetName"
                            label="Project Name"
                            type="text"
                            fullWidth
                            value={tempProjectName || ''}
                            onChange={this.handleProjectNameChange}
                            />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={this.handleClose} 
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <span hidden={createProjectStep !== CreateProjectStep.SelectTemplate}>
                        <Button 
                            onClick={this.handleNextClick} 
                            color="primary"
                            disabled={!tempTemplateName}
                        >
                            Next
                        </Button>
                    </span>
                    <span hidden={createProjectStep !== CreateProjectStep.EnterProjectName}>
                        <Button 
                            onClick={this.handleBackClick} 
                            color="primary"
                        >
                            Back
                        </Button>
                        <Button 
                            onClick={this.handleCreateClick} 
                            color="primary"
                            disabled={!tempProjectName}
                        >
                            Create
                        </Button>
                    </span>
                </DialogActions>
            </Dialog>
        );
    }

    handleClose = () => {
        const { rootStore, projectStore } = this.props;

        rootStore.setCreateProjectDialogOpen(false);
        projectStore.setCreateProjectStep(CreateProjectStep.SelectTemplate);
        projectStore.setTempTemplateName(null);
        projectStore.setTempProjectName(null);
    }

    handleListItemClick = (template) => () => {
        this.props.projectStore.setTempTemplateName(template);
    }

    handleNextClick = () => {
        this.props.projectStore.setCreateProjectStep(CreateProjectStep.EnterProjectName);
    }

    handleBackClick = () => {
        this.props.projectStore.setCreateProjectStep(CreateProjectStep.SelectTemplate);
    }

    handleProjectNameChange = (event) => {
        this.props.projectStore.setTempProjectName(event.target.value);
    }

    handleCreateClick = () => {
        const { projectStore } = this.props;
        const projectName = projectStore.tempProjectName.toPascalCase();

        // Create project
        projectStore.createProject(projectStore.tempTemplateName, projectName);
        
        projectStore.setTemplateName(projectStore.tempTemplateName);
        projectStore.setProjectName(projectName);
        this.handleClose();
    }
}

CreateProjectDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object,
    projectStore: PropTypes.object
}

export default withStyles(styles)(CreateProjectDialog);
