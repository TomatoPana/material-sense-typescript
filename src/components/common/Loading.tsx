import React from 'react';
import Typography from '@material-ui/core/Typography'
import { createStyles, withStyles } from '@material-ui/styles';

const styles = createStyles({
    loadingMessage: {
        position: 'absolute',
        top: '40%',
        left: '40%',
    }
});

interface LoadingProps {
    classes?: any;
    loading: boolean;
}

function Loading(props: LoadingProps): JSX.Element {
    const { classes, loading } = props;
    return (
        <div style = { loading ? { display: 'block' } : { display: 'none' } } className = { classes.loadingMessage }>
            <span role = 'img' aria-label = 'emoji' style = { { fontSize: 58, textAlign: 'center', display: 'inline-block', width: '100%' } }>👋</span>
            <Typography variant="h6">
                Waiting for input
            </Typography>
        </div>
    );
}

export default withStyles(styles)(Loading);