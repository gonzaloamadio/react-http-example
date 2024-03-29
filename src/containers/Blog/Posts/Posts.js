import React, { Component } from 'react';
// import axios from 'axios'
import axios from '../../../axios';
import { Link, Route } from 'react-router-dom'

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost'
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        console.log(this.props);
        axios.get( '/posts' )
            .then( response => {
                // Fake Pagination, or can do it like this, if we knoe there wont be too much
                // So we do not keep sending requests
                const posts = response.data.slice(0, 4);
                // We can transform our data, it is still JS!
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log( response );
            } )
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }
    
    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                // Key goes to the outmost element
                return ( 
                <Link to={'/posts/' + post.id}  key={post.id} >
                    <Post 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
                </Link>
                )
            })
        }

        return (
            <div>         
            <section className="Posts">
                {posts}
            </section>
            {/* add match.url at the beggining so we stay in the same route as the father commponent. */}
            <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;