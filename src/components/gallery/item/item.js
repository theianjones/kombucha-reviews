import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Title, Copy } from './item.css';

const Item = ({ title, firstComment, imageUrl, url }) => (
  <div style={{ width: 400 }}>
    <a href={url}>
      <img src={imageUrl} alt={title} height={400} width={400} />
    </a>
    <div>
      <Copy>{firstComment}</Copy>
    </div>
  </div>
);

Item.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  image: PropTypes.object.isRequired,
};

export default Item;
