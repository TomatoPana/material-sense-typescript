import React, { Component, SyntheticEvent, Fragment } from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import * as Numeral from "numeral";
import SimpleLineChart from './SimpleLineChart';
import Months from './common/Months';
import Loading from './common/Loading';
import Topbar from './Topbar';
import BackgroundShape from "../images/shape.svg";

Numeral.defaultFormat('0,000');

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['100'],
        overflow: 'hidden',
        background: `url(${BackgroundShape}) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: '0 400px',
        paddingBottom: 200
    },
    grid: {
        width: 1200,
        margin: `0 ${theme.spacing(2)}px`,
        [theme.breakpoints.down('sm')]: {
          width: 'calc(100% - 20px)'
        }
    },
    loadingState: {
        opacity: 0.05
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    rangeLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(2)
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    outlinedButton: {
        textTransform: 'uppercase',
        margin: theme.spacing(1)
    },
    actionButtom: {
        textTransform: 'uppercase',
        margin: theme.spacing(1),
        width: 152,
        height: 36
    },
    blockCenter: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    block: {
        padding: theme.spacing(2),
    },
    loanAvatar: {
        display: 'inline-block',
        verticalAlign: 'center',
        width: 16,
        height: 16,
        marginRight: 10,
        marginBottom: -2,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main
    },
    interestAvatar: {
        display: 'inline-block',
        verticalAlign: 'center',
        width: 16,
        height: 16,
        marginRight: 10,
        marginBottom: -2,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light
    },
    inlining: {
        display: 'inline-block',
        marginRight: 10
    },
    buttonBar: {
        display: 'flex'
    },
    noBorder: {
        borderBottomStyle: 'hidden'
    },
    mainBadge: {
        textAlign: 'center',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
});

interface DashboardProps extends RouteComponentProps {
    classes?: any;
}

interface DashboardState {
    loading: boolean;
    amount: number;
    period: number;
    start: number;
    monthlyInterest: number;
    totalInterest: number;
    monthlyPayment: number;
    totalPayment: number;
    data: {
        name: string,
        'Type': string,
        'OtherType': string,
    }[];
}

class Dashboard extends Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            loading: true,
            amount: 15000,
            period: 3,
            start: 0,
            monthlyInterest: 0,
            totalInterest: 0,
            monthlyPayment: 0,
            totalPayment: 0,
            data: [],
        }
    }

    updateValues() : void {
        const { amount, period, start } = this.state;
        const monthlyInterest = (amount)*(Math.pow(0.01*(1.01), period))/(Math.pow(0.01, period - 1))
        const totalInterest = monthlyInterest * (period + start);
        const totalPayment = amount + totalInterest;
        const monthlyPayment = period > start ? totalPayment/(period - start) : totalPayment/(period);

        const data = Array.from({length: period + start}, (value, i) => {
            const delayed = i < start;
            return {
                name: Months[i],
                'Type': delayed ? '0' : Math.ceil(monthlyPayment).toFixed(0),
                'OtherType': Math.ceil(monthlyInterest).toFixed(0),
            }
        });

        this.setState({monthlyInterest,totalInterest, totalPayment, monthlyPayment, data});

    }

    componentDidMount() : void {
        this.updateValues();
    }

    handleChangeAmount = (event: SyntheticEvent, value: number) : void => {
        event.preventDefault();
        this.setState({
            amount: value, 
            loading: false
        });
    }

    handleChangePeriod = (event: SyntheticEvent, value: number) : void => {
        event.preventDefault();
        this.setState({
            period: value,
            loading: false,
        });
    }

    handleChangeStart = (event: SyntheticEvent, value: number) : void => {
        this.setState({
            start: value,
            loading: false,
        });
    }

    render(): JSX.Element {
        const { classes } = this.props;
        const { amount, period, start, monthlyPayment, monthlyInterest, data, loading } = this.state;
        const currentPath = this.props.location.pathname;

        return (
            <Fragment>
                <CssBaseline />
                <Topbar currentPath = { currentPath } />
                <div className = { classes.root }>
                    <Grid container justify="center">
                        <Grid spacing = { 3 } alignItems = "center" justify = "center" container className = { classes.grid} >
                            <Grid item xs = { 12 }>
                                <div className = { classes.topBar } >
                                    <div className = { classes.block }>
                                        <Typography variant="h6" gutterBottom>Dashboard</Typography>
                                        <Typography variant="body1">
                                            Adjust and play with our sliders.
                                        </Typography>
                                    </div>
                                    <div>
                                        <Button variant="outlined" className = { classes.outlinedButton }>
                                            Get help
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs = {12} md = {4}>
                                <Paper></Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }

}

export default withRouter(withStyles(styles)(Dashboard));