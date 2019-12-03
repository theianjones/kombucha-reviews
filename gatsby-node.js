const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const posts = require('./data/posts');
const crypto = require('crypto');
exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      plugins: [
        new DirectoryNamedWebpackPlugin({
          exclude: /node_modules/,
        }),
      ],
    },
  });
};

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId },
  { plugins, ...options }
) => {
  const packagePost = postData => {
    const {
      url,
      likesCount,
      imageUrl,
      firstComment,
      timestamp,
      locationName,
      ownerUsername,
    } = postData;
    const nodeContent = JSON.stringify(postData);
    const nodeContentDigest = crypto
      .createHash('md5')
      .update(nodeContent)
      .digest('hex');

    const node = {
      url,
      likesCount,
      imageUrl,
      firstComment,
      timestamp,
      ownerUsername,
      id: timestamp,
      content: nodeContent,
      internal: {
        type: 'Post',
        contentDigest: nodeContentDigest,
      },
    };
    createNode(node);
  };

  const postIds = posts.reduce((acc, post) => {
    return { ...acc, [post.url]: createNodeId(post.url) };
  }, {});

  const reducePosts = (acc, item) => {
    return [
      ...acc,
      {
        id: postIds[item.url],
        ...item,
      },
    ];
  };
  console.log({ posts: posts.count });
  const processedPosts = posts.reduce(reducePosts, []);

  processedPosts.map(packagePost);
};
