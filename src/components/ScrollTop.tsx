import { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ScrollToTopProps extends RouteComponentProps {
    location: object | any;
}

class ScrollToTop extends Component<ScrollToTopProps> {
    componentDidUpdate(prevProps: ScrollToTopProps) {
        if(this.props.location.pathname !== prevProps.location.pathname){
            window.scrollTo(0,0);
        }
    }

    render() : React.ReactNode {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);