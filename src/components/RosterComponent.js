import React from 'react';

const RosterComponent = ({ year }) => {
  return (
    <article className='message'>
      <div className='message-body'>
        <h2 className='title is-4'>{year} Roster</h2>
        <h3 className='title is-6'>Permanent Members</h3>
        <ul className='mb-5'>
          <li>Country Name</li>
          <li>Country Name</li>
        </ul>
        <h3 className='title is-6'>Non-permanent Members</h3>
        <ul>
          <li>Country Name</li>
          <li>Country Name</li>
        </ul>
      </div>
    </article>
  );
};

export default RosterComponent;
