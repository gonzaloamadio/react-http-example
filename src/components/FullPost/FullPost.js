import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    }

    componentDidUpdate () {
        if (this.props.id){
            // Check if a new post is selected, if not it will be in an infinite loop
            // as the component will update when post fetched, and componentDidUpdate will
            // be executed again, and fill fetch, and enter into a loop.
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(response => {
                    this.setState({loadedPost: response.data})
                })
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
                console.log(response)
            })

    }

    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        // The component will be loaded with a prop, but the post will be ASYNC from the server.
        // So if we only check for props.id to show the post, this.state.loadedPost can be empty
        // untill post is fetch. 
        // So props.id exists inmediately (it is rendered with component) but not the post from state.
        // In consequence, to show the post, we can do something like this.
        if (this.props.id) {
            post = <p style={{textAlign:'center'}}>Loading...</p>
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete"
                            onClick={this.deletePostHandler}
                        >Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;