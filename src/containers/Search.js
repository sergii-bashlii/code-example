import React from 'react';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import { setSearch } from '../actions';

const Search = ({ search, setSearch }) => {
  return (
    <Input
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Search"
      className="search"
    />
  );
};

export default connect(
  ({ search }) => ({search}),
  { setSearch }
)(Search);