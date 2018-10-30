import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

import AddPageDialog from './add-page-dialog';
import DeletePageDialog from './delete-page-dialog';

@inject('rootStore', 'projectStore')
@observer
class PagesList extends React.Component {
    render() {
        const { projectStore } = this.props;

        return (
            <div>
                <Toolbar>
                    <span style={{flexGrow: 1}}></span>
                    <Tooltip title="Add page">
                        <div>
                            <IconButton 
                                mini="true"
                                color="primary"
                                onClick={this.addPageHandler} 
                                variant="fab" 
                                disabled={!projectStore.projectName}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Tooltip title="Delete page">
                        <div>
                            <IconButton 
                                mini="true"
                                color="primary"
                                onClick={this.deletePageHandler} 
                                variant="fab"
                                disabled={!(projectStore.projectName && projectStore.selectedPage)}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </Tooltip>
                </Toolbar>
                <List>
                    {projectStore.pageList.map((page, index) => 
                    <ListItem 
                        button 
                        key={index} 
                        onClick={this.pageClickHandler(page)}
                        selected={projectStore.selectedPage === page}
                    >
                        <ListItemText primary={page} />
                    </ListItem>)}
                </List>
                <AddPageDialog/>
                <DeletePageDialog/>
            </div>
        );
    }

    pageClickHandler = (page) => () => {
        const { rootStore, projectStore } = this.props;
        const port = projectStore.currentProjectResult.port;
        const projectUrl = `http://localhost:${port}/${page}`;

        projectStore.setSelectedPage(page);
        projectStore.getPageContent(projectStore.projectName, page);
        rootStore.setCurrentProjectUrl(projectUrl);
    }

    addPageHandler = () => {
        this.props.rootStore.setAddPageDialogOpen(true);
    }

    deletePageHandler = () => {
        this.props.rootStore.setDeletePageDialogOpen(true);
    }
}

PagesList.propTypes = {
    rootStore: PropTypes.object,
    projectStore: PropTypes.object
}

export default PagesList;
