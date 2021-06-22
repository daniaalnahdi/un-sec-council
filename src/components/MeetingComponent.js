import React, { useState, useEffect } from 'react';

const MeetingComponent = ({ meeting }) => {
  const {
    meeting_id,
    date,
    topic,
    press_release,
    resolution,
    record,
    recording,
  } = meeting;

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [buttonText, setButtonText] = useState('Show More');

  useEffect(() => {
    isCollapsed ? setButtonText('Show More') : setButtonText('Show Less');
  }, [isCollapsed]);

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
            {!!recording && (
              <div className='column is-one-quarter'>
                <a href={recording} target='_blank' rel='noppener noreferrer'>
                  <button className='button is-info is-light is-fullwidth'>
                    Web Recording
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
          <div className='columns'>
            <div className='column'>
              <strong>For</strong>
              <ul>
                <li>Country Name</li>
              </ul>
            </div>
            <div className='column'>
              <strong>Against</strong>
              <ul>
                <li>Country Name</li>
              </ul>
            </div>
            <div className='column'>
              <strong>Veto</strong>
              <ul>
                <li>Country Name</li>
              </ul>
            </div>
          </div>
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
