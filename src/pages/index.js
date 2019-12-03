import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import Title from 'components/title';
import Gallery from 'components/gallery';
import { graphql } from 'gatsby';

const Index = ({ data }) =>
  console.log({ data }) || (
    <Layout>
      <Box>
        <Title as="h2" size="large">
          {data.homeJson.content.childMarkdownRemark.rawMarkdownBody}
        </Title>
      </Box>
      <Gallery items={data.allPost.nodes} />
    </Layout>
  );

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

export const query = graphql`
  query HomepageQuery {
    homeJson {
      title
      content {
        childMarkdownRemark {
          html
          rawMarkdownBody
        }
      }
    }
    allPost {
      nodes {
        id
        url
        likesCount
        imageUrl
        firstComment
        timestamp
        ownerUsername
      }
    }
  }
`;
