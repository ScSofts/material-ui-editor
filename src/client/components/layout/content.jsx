import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CodeEditor from '../code-editor';
import Preview from '../preview';

const styles = theme => ({
    content: {
        display: 'flex',
        flexGrow: 1,
        marginTop: '64px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '56px'
        }
    }
});

@observer
class Content extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                <Grid container direction="row">
                    <Grid container item xs={6}><Preview /></Grid>
                    <Grid container item xs={6}><CodeEditor /></Grid>
                </Grid>
            </div>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Content);
