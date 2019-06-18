import React from 'react';
import { Provider } from 'react-redux';
import store from '../Client/Redux/store';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';

import { createLanes } from '../Client/components/Lane/LaneActions';
import { createNotes } from '../Client/components/Note/NoteActions';
import callApi from '../Client/util/apiCaller';
import { normalize } from 'normalizr';
import { lanes } from '../Client/util/schema';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    await callApi('lanes').then(async res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities;
      await ctx.store.dispatch(createNotes(notes));
      await ctx.store.dispatch(createLanes(normalizedLanes));
    });

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(store)(MyApp);
