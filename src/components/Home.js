import React, { Component } from 'react';
import Hero from './subcomponents/Hero';
import BlogThumb from './subcomponents/BlogThumb';

import axios from 'axios';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            featured: '',
            index: 0,
            posts: [{title: "Loading...",image: 'https://unsplash.it/900/400/?random'}]
        }
    }

    componentWillMount() {
        axios.get('/api/featured').then(results => {
            this.setState({
                featured: results.data,
                index: (~~(Math.random() * results.data.length) + 0),
                posts: results.data
            })
        }).catch(console.log)
    }
    

    render(){
        // map over your recommended blogs here
        const posts = this.state.posts.map((psts, i) => <BlogThumb key={i} blog={psts} />)

        return(
            <div className="content" >
                <Hero blog={this.state.posts[this.state.index]} />
                <hr/>
                <div className="blog-grid">
                    {/* put your mapped blogs here */}
                    {posts}
                </div>
            </div>
        )
    }
}

export default Home;