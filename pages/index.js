import React from 'react';
import { connect } from 'react-redux';
import Nav from '../Client/components/Nav';
import Head from '../Client/components/Head';
import Kanban from '../Client/components/Kanban/Kanban';

const Home = () => {
  return (
    <div>
      <Head title="Kanban" />
      <Nav />
      <Kanban />
    </div>
  );
};

export default connect(state => state)(Home);
