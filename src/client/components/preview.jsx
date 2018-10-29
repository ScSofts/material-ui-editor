import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    preview: {
        width: '100%',
        border: 0,
        borderRight: '1px solid rgba(0, 0, 0, 0.12)'
    }
};

@inject('rootStore')
@observer
class Preview extends React.Component {
    render() {
        const { classes, rootStore } = this.props;

        return (
            <iframe className={classes.preview} src={rootStore.currentProjectUrl}></iframe>
        );
    }
}

Preview.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object
}

export default withStyles(styles)(Preview);
