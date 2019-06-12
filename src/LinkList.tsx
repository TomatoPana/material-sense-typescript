import React, { Component, forwardRef } from 'react';
import { MemoryRouter as Router } from "react-router";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Omit from "./types/Omit";
import OmitProps from "./types/OmitProps"

const AdapterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref)=>(
    <RouterLink innerRef = { ref as any } { ...props } />
));

const CollisionLink = forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, OmitProps >>(
    (props, ref) => (
        <RouterLink innerRef = { ref as any } to = "/" { ...props } />
    ),
);

interface LinkListProps {
}

interface LinkListState {
}

class LinkList extends Component<LinkListProps, LinkListState> {
    render() : JSX.Element {
        return (
            <Router>
                <div>
                    <Link component = { RouterLink } to="/" >
                        Simple Case
                    </Link>
                    <br />
                    <Link component = { AdapterLink } to="/" >
                        Ref forwarding
                    </Link>
                    <br />
                    <Link component = { CollisionLink } >
                        Avoids props collition
                    </Link>
                    <br />
                    <Button color="primary" component = { AdapterLink } to = "/" >
                        Simple Case
                    </Button>
                    <Button color="primary" component = { CollisionLink }>
                        Avoids props collition
                    </Button>
                </div>
            </Router>
        );
        
    }
}

export default LinkList;