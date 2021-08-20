import React from 'react';
import PropTypes from 'prop-types';

const BlogPost = ({ blogPost }) => {
  const {
    id, title, body, author,
  } = blogPost;
  return (
    <div key={id}>
      <h3>{title}</h3>
      <p>{body}</p>
      <i><h6>{author}</h6></i>
    </div>
  );
};

export default BlogPost;

BlogPost.propTypes = {
  blogPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
