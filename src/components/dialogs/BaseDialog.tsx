import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/styles";
import { Theme, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    container: {
        maxWidth: 600,
        flexGrow: 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    bottomMargin: {
        marginBottom: theme.spacing(2),
    }
});

interface BaseDialogProps {
    classes?: any;
    open: boolean;
    onClose?: (event: React.SyntheticEvent<Element, Event>) => void;
}

class BaseDialog extends Component<BaseDialogProps> {
    render(): JSX.Element {
        const { classes, open, onClose } = this.props;
        return (
            <Dialog
                open = { open }
                onClose = { onClose }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll='body'
            >
                <DialogTitle id="alert"></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className={classes.container}>
                            { this.props.children }
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(BaseDialog);