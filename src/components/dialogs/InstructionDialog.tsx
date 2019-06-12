import React, { Component, forwardRef } from "react";
import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { createStyles, withStyles } from '@material-ui/styles';
import { withRouter, RouteComponentProps, LinkProps as RouterLinkProps, Link as RouterLink } from "react-router-dom";
import BaseDialog from './BaseDialog';
import Omit from "../../types/Omit";
import OmitProps from "../../types/OmitProps";

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

const CollisionLink = forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, OmitProps>>(
    (props, ref) => (
        <RouterLink innerRef = { ref as any } to = "/dashboard" { ...props }/>
    ),
);

interface InstructionDialogProps extends RouteComponentProps {
    classes?: any;
    open: boolean;
    onClose?: (event: React.SyntheticEvent<Element, Event>) => void;
}

class InstructionDialog extends Component<InstructionDialogProps> {
    render(): JSX.Element {
        const { classes } = this.props;
        return (
            <BaseDialog { ...this.props } >
                <div>
                    <Typography variant = "body2" gutterBottom>
                        This is a sample Introduction
                    </Typography>
                </div>
                <Button 
                    component = { CollisionLink } 
                    color = "primary" 
                    className = { classes.bottomMargin } 
                    variant = "contained"
                >
                    Getting started
                </Button>
                <Button 
                    component = { CollisionLink } 
                    color = "primary" 
                    variant = "outlined"
                >
                    Dashboard
                </Button>
            </BaseDialog>
        );
    }
}

export default withRouter(withStyles(styles)(InstructionDialog));