import React from 'react';

const Nav = () => (
  <nav>
    <h2 className="header">Kanban</h2>
    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
        background: #4bbf6b;
      }
      nav {
        text-align: center;
      }
      .header {
        background: #3fa25a;
        color: #FAFCFB;
        margin: 0;
        padding: 20px;
      }
    `}</style>
  </nav>
);

export default Nav;
