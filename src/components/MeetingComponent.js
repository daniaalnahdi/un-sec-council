import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeetingComponent = ({ meeting, api, collapse }) => {
  const { meeting_id, date, topic, press_release, resolution, record } =
    meeting;

  const [votes, setVotes] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [buttonText, setButtonText] = useState('Show More');

  //retrieves meeting votes
  useEffect(() => {
    axios.get(api + `/meetings/${meeting_id}/votes`).then((res) => {
      setVotes(res.data);
    });
  }, [meeting_id]);

  useEffect(() => {
    isCollapsed ? setButtonText('Show More') : setButtonText('Show Less');
  }, [isCollapsed]);

  useEffect(() => {
    setIsCollapsed(true);
  }, [collapse]);

  return (
    <div className='card mt-3 mb-3 p-5' id={meeting_id}>
      <div className='mb-3'>
        <h3 className='title is-5'>{topic}</h3>
        <h4 className='subtitle is-6'>{date.substring(0, 10)}</h4>
      </div>
      {!isCollapsed && (
        <>
          <div className='columns'>
            {!!resolution && (
              <div className='column is-one-quarter'>
                <a href={resolution} target='_blank' rel='noppener noreferrer'>
                  <button className='button is-info is-fullwidth '>
                    Resolution
                  </button>
                </a>
              </div>
            )}
            {!!record && (
              <div className='column is-one-quarter'>
                <a href={record} target='_blank' rel='noppener noreferrer'>
                  <button className='button is-info is-light is-fullwidth'>
                    Meeting Record
                  </button>
                </a>
              </div>
            )}
            {!!press_release && (
              <div className='column is-one-quarter'>
                <a
                  href={press_release}
                  target='_blank'
                  rel='noppener noreferrer'
                >
                  <button className='button is-info is-light is-fullwidth'>
                    Press Release
                  </button>
                </a>
              </div>
            )}
          </div>
          {!resolution && (
            <p className='mb-5'>
              <i>No resolution or votes available.</i>
            </p>
          )}
          {votes.length != 0 && !!resolution && (
            <>
              {votes.every(({ vote }) => !vote) ? (
                <p className='mb-5'>
                  <i>No votes available.</i>
                </p>
              ) : (
                <div className='columns'>
                  <div className='column'>
                    <strong>For</strong>
                    <ul>
                      {votes.map(({ country_name, vote }) => {
                        return (
                          vote == 'for' && (
                            <li key={country_name}>{country_name}</li>
                          )
                        );
                      })}
                    </ul>
                  </div>
                  <div className='column'>
                    <strong>Against</strong>
                    <ul>
                      {votes.map(({ country_name, vote }) => {
                        return (
                          vote == 'against' && (
                            <li key={country_name}>{country_name}</li>
                          )
                        );
                      })}
                    </ul>
                  </div>
                  <div className='column'>
                    <strong>Abstain</strong>
                    <ul>
                      {votes.map(({ country_name, vote }) => {
                        return (
                          vote == 'abstain' && (
                            <li key={country_name}>{country_name}</li>
                          )
                        );
                      })}
                    </ul>
                  </div>
                  <div className='column'>
                    <strong>Veto</strong>
                    <ul>
                      {votes.map(({ country_name, veto }) => {
                        return (
                          !!veto && (
                            <li key={country_name}>{country_name}</li>
                          )
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
      <button
        className='button is-light'
        onClick={() => {
          setIsCollapsed((prevState) => !prevState);
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default MeetingComponent;
