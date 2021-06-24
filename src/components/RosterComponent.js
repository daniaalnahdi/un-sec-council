import React from 'react';

const RosterComponent = ({ year, countries }) => {
  return (
    <article className='message'>
      <div className='message-body'>
        <h2 className='title is-4'>{year} Roster</h2>
        <h3 className='title is-6'>Permanent Members</h3>
        <ul className='mb-5'>
          {countries.map(({ country_name, permanent_member }) => {
            return (
              !!permanent_member && <li key={country_name}>{country_name}</li>
            );
          })}
        </ul>
        <h3 className='title is-6'>Non-permanent Members</h3>
        <ul>
          {countries.map(({ country_name, permanent_member }) => {
            return (
              !permanent_member && <li key={country_name}>{country_name}</li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};

export default RosterComponent;
