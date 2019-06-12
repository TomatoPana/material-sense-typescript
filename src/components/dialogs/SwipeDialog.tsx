import React, { Component, forwardRef } from 'react';
import { Link as RouterLink, withRouter, RouteComponentProps, LinkProps as RouterLinkProps } from "react-router-dom";
import { createStyles, withStyles } from '@material-ui/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BaseDialog from "./BaseDialog";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@material-ui/core/MobileStepper";
import { autoPlay } from "react-swipeable-views-utils";
import TutorialSteps from "../common/TutorialSteps";
import { Theme } from '@material-ui/core';
import Logo from '../../images/logo.svg';
import Omit from "../../types/Omit";
import OmitProps from "../../types/OmitProps";

const CollisionLink = forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, OmitProps>>(
    (props, ref) => (
        <RouterLink innerRef = { ref as any } to = "/dashboard" { ...props } />
    )
);

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = (theme: Theme) => createStyles({
    container: {
        maxWidth: 600,
        flexGrow: 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    stepsContainer: {
        marginLeft: 72,
        textAlign: 'left',
        marginTop: 20,
        height: 65,
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    }
});

interface SwipeDialogProps extends RouteComponentProps {
    classes?: any;
    open: boolean;
    onClose?: (event: React.SyntheticEvent<Element, Event>) => void;
}

interface SwipeDialogState {
    activeStep: number;
}
class SwipeDialog extends Component<SwipeDialogProps, SwipeDialogState> {
    constructor(props: SwipeDialogProps){
        super(props);
        this.state = {
            activeStep: 0,
        }
    }

    handleNext = () => {
        this.setState((prevState: Readonly<SwipeDialogState>) => ({
            activeStep: prevState.activeStep + 1,
        }));
    }
    handleBack = () => {
        this.setState((prevState: Readonly<SwipeDialogState>) => ({
            activeStep: prevState.activeStep - 1,
        }));
    }

    handleStepChange = (activeStep: number) => {
        this.setState({
            activeStep: activeStep
        });
    }

    render() : JSX.Element {
        const { classes } = this.props;
        const maxSteps = TutorialSteps.length;
        const { activeStep } = this.state;
        return (
            <BaseDialog { ...this.props } >
                <div className = { classes.container } >
                    <div className = { classes.gutterBottom } >
                        <img src = { Logo } alt = "Logo" width = { 100 } />
                    </div>
                        <div>
                        <AutoPlaySwipeableViews
                            axis = 'x'
                            index = { activeStep }
                            onChangeIndex = { this.handleStepChange }
                            enableMouseEvents
                        >
                            {TutorialSteps.map((step, index) => (
                                <div key = { step.label } >
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <img 
                                            className = { classes.img } 
                                            src = {step.imgPath} 
                                            alt = {step.label} 
                                        />
                                    ) : null }
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                        <MobileStepper
                            steps = { maxSteps }
                            position = 'static'
                            activeStep = { activeStep }
                            className = { classes.mobileStepper }
                            nextButton = {
                                <Button size = 'small' onClick = { this.handleNext } disabled = { activeStep === maxSteps - 1 }>
                                    Next
                                </Button>
                            }
                            backButton = {
                                <Button size = "small" onClick = { this.handleBack } disabled = { activeStep === 0 } >
                                    Back
                                </Button>
                            }
                        />
                    </div>
                    <div className = { classes.stepsContainer } >
                        <Typography style = { { textTransform: 'uppercase' } } color = 'secondary' gutterBottom>
                            { TutorialSteps[activeStep].label }
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            { TutorialSteps[activeStep].description }
                        </Typography>
                    </div>
                    <div>
                        <Button component = { CollisionLink } variant = 'contained' color = 'primary' >
                            Getting started
                        </Button>
                    </div>
                </div>
            </BaseDialog>
        );
    }
}

export default withRouter(withStyles(styles)(SwipeDialog));