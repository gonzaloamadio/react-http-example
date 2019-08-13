import React, { Component } from 'react';
import axios from 'axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts : []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
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
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title}/>
        })

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;