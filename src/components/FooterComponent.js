import React from 'react';

const FooterComponent = () => {
  return (
    <footer className='footer'>
      <div className='content has-text-centered'>
        Project for CS3200 Database Design at Northeastern University. Data from
        the{' '}
        <a
          href='https://www.un.org/securitycouncil'
          target='_blank'
          rel='nooppener noreferrer'
        >
          United Nations Security Council
        </a>
        .
      </div>
    </footer>
  );
};

export default FooterComponent;
