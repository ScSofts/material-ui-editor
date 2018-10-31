import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    moreColor: {
        color: 'white'
    }
};

@inject('rootStore', 'projectStore')
@observer
class HeaderMenu extends React.Component {
    state = {
        anchorEl: null
    };

    render() {
        const { classes, projectStore } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : null}
                    aria-haspopup="true"
                    className={classes.moreColor}
                    onClick={this.handleClick}
                >
                    <MenuIcon /> 
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    transformOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={open}
                    onClick={this.handleClose}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.createProjectClickHandler}>Create Project</MenuItem>
                    <MenuItem onClick={this.openProjectClickHandler}>Open Project</MenuItem>
                    <Divider />
                    <MenuItem onClick={this.pageListClickHandler}>Toggle Page List</MenuItem>
                    <Divider />
                    <MenuItem 
                        component="a" 
                        href={`/api/projects/${projectStore.projectName}/export`} 
                        disabled={!projectStore.projectName}
                    >
                        Export Project
                    </MenuItem>
                    <MenuItem onClick={this.importClickHandler}>Import Project</MenuItem>
                    <Divider />
                    <MenuItem onClick={this.helpClickHandler}>Help</MenuItem>
                </Menu>
            </div>
        );
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    createProjectClickHandler = () => {
        this.props.rootStore.setCreateProjectDialogOpen(true);
    };

    openProjectClickHandler = () => {
        this.props.rootStore.setOpenProjectDialogOpen(true);
    };

    pageListClickHandler = () => {
        this.props.rootStore.togglePageList();
    };

    importClickHandler = () => {
    };

    helpClickHandler = () => {
    };
}

HeaderMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object,
    projectStore: PropTypes.object
}

export default withStyles(styles)(HeaderMenu);
