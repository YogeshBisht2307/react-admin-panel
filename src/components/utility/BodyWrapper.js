import React from 'react';

const BodyWrapper = ({children}) => {
  return (
        <main className="main-screen">
          {children}
        </main>
  );
};

export default BodyWrapper;
