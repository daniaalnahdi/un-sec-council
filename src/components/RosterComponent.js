import React from 'react';

const RosterComponent = ({year}) => {
  return (
    <article className='message'>
      <div className='message-body'>
        <h2 className='title is-4'>Roster {year}</h2>
      </div>
    </article>
  );
};

export default RosterComponent;
