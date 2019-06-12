import React, { Component, ReactNode } from 'react';

interface LinkListProps {
    children?: ReactNode;
}

interface LinkListState {
    error: boolean;
    isLoaded: boolean;
    items: Array<any>;
    errorMessage?: string;
}

class LinkList extends Component<LinkListProps, LinkListState> {
    constructor(props: LinkListProps){
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }
    
    componentDidMount() {
        fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    error: false,
                    items: result.results
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: true,
                    items: [],
                    errorMessage: error.message
                });
            }
        )
    }

    render(){
        const { error, isLoaded, items, errorMessage } = this.state;
        if (error)
            return <div>Error: { errorMessage }</div>
        else if(!isLoaded) {
            return <div>Loading...</div>
        } else {
            return(
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                            {item.gender} {item.name.title}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default LinkList;