import React, { Component } from 'react';
// import axios from 'axios'
import axios from '../../../axios'

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    }

    // componentDidUpdate ()  it is not more this method, because with routing we are 
    // mounting or umounting the component from the DOM
    componentDidMount () {
        this.loadData()
    }

    // Manage changes in the route, because if not, the router will not re render the component,
    // As we will be changing a url, so the component does not suffer changes => not re-render.
    // But as the component is receiving new props, will enter this method.
    componentDidUpdate(){
        this.loadData()
    }

    loadData () {
        if (this.props.match.params.id){
            // Check if a new post is selected, if not it will be in an infinite loop
            // as the component will update when post fetched, and componentDidUpdate will
            // be executed again, and fill fetch, and enter into a loop.
            // + before match.params.id is to convert string to number.
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)){
                axios.get('/posts/' + this.props.match.params.id)
                .then(response => {
                    this.setState({loadedPost: response.data})
                })
            }
        }
    }
    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
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
        if (this.props.match.params.id) {
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