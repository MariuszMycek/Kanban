import React from 'react';
import { connect } from 'react-redux';
import Nav from '../Client/components/nav.component';
import Head from '../Client/components/head.component';
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
