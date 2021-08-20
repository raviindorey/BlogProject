import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import BlogPost from './BlogPost';

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: '',
    };
  }

  async componentDidMount() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      const blogPosts = await this.getPosts();
      this.setState({
        blogPosts,
      });
    }
  }

  getPosts = async () => {
    const token = localStorage.getItem('token');
    const { handleLogout } = this.props;
    try {
      const { data } = await axios.get('http://localhost:8000/api/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      handleLogout();
    } return null;
  }

  render() {
    const { blogPosts } = this.state;
    return (
      <div>
        {blogPosts === ''
          ? ''
          : blogPosts.map((blogPost) => <BlogPost key={blogPost.id} blogPost={blogPost} />)}
      </div>
    );
  }
}

export default BlogPosts;

BlogPosts.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
