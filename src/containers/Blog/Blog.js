import React, { Component } from 'react';
import axios from 'axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts : [],
        selectedPostId : null,
        apiError : false
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                // Fake Pagination, or can do it like this, if we knoe there wont be too much
                // So we do not keep sending requests
                const posts = response.data.slice(0,6)
                // We can transform our data, it is still JS!
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author : 'Gonzalo'
                    }
                })
                this.setState({posts: updatedPosts})
            })
            .catch(error => {
                this.setState({apiError:true})
            })
    }

    postSelectedHandler = id => {
        this.setState({selectedPostId : id})

    }

    render () {
        let posts = <p style={{textAlign:'center'}}>Something went wrong</p>
        if (!this.state.apiError) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title}
                    author={post.author}
                    // Arrow function to pass id selected
                    clicked={() => this.postSelectedHandler(post.id)}
                    />
            })    
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    {/* Added selected post to state, so we can pass it down to FullPost Component */}
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;