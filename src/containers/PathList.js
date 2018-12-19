import React from 'react';
import { connect } from 'react-redux';
import { getCurrentPosition, getPaths } from '../actions';
import Card from '../components/Card';



class PathList extends React.Component {
  componentDidMount() {
    const { getCurrentPosition, getPaths } = this.props;
    getPaths();
    getCurrentPosition();
  }

  render() {
    const { paths, search } = this.props;
    return (
      <ul>
        {
          paths
            .sort((a, b) => b.favorite)
            .filter(({ title, shortDescription }) => {
              const regexp = new RegExp(search, 'i');
              return regexp.test(title) || regexp.test(shortDescription);
            })
            .map(({ id, title, shortDescription, length, favorite }) => <Card
              key={id}
              id={id}
              title={title}
              shortDescription={shortDescription}
              length={length}
              favorite={favorite}
            />)
        }
      </ul>
    );
  }
};

export default connect(
  ({ paths, search }) => ({
    paths: paths.paths,
    search
  }),
  {
    getCurrentPosition,
    getPaths,
  }
)(PathList);