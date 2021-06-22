import React, { useState, useEffect } from 'react';
import axios from 'axios';

import HeaderComponent from './components/HeaderCompoent';
import RosterComponent from './components/RosterComponent';
import FooterComponent from './components/FooterComponent';
import MeetingComponent from './components/MeetingComponent';

const App = () => {
  const api = 'http://localhost:3000';

  const [yearFilterOptions, setYearFilterOptions] = useState([]);
  const [rosterCountries, setRosterCountries] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState(meetings);

  const [yearFilter, setYearFilter] = useState('2021');
  const [stringFilter, setStringFilter] = useState('');

  // fetch init data
  useEffect(() => {
    axios.get(api + '/meetings').then((res) => {
      setMeetings(res.data);
    });

    axios.get(api + '/roster').then((res) => {
      setYearFilterOptions(res.data);
      //todo: set init year filter as first option
      console.log('/roster', res.data);
    });
  }, []);

  // apply default filters once data is fetched and when filters change
  useEffect(() => {
    filterMeetings();
  }, [meetings, yearFilter, stringFilter]);

  // update roster when year filter changes
  useEffect(() => {
    axios.get(api + `/roster/${yearFilter}/countries`).then((res) => {
      setRosterCountries(res.data);
      console.log('/roster/id/countries', res.data);
    });
  }, [yearFilter]);

  // function to filter meeting data by date and topic
  const filterMeetings = () => {
    let result = meetings.filter((meeting) => {
      return (
        meeting.date.includes(yearFilter) &&
        meeting.topic.toLowerCase().includes(stringFilter)
      );
    });
    setFilteredMeetings(result.reverse());
  };

  const getMeetingVotes = (meetingId) => {
    axios.get(api + `/meetings/${meetingId}/votes`).then((res) => {
      //todo: set init year filter as first option
      console.log('/meetings/id/votes', res.data);
    });
  };

  return (
    <>
      <HeaderComponent />
      <div className='container mt-5 mb-5'>
        <div className='columns'>
          <div className='column'>
            <input
              type='text'
              className='input is-medium'
              placeholder='Search topic...'
              onChange={(e) => setStringFilter(e.target.value.toLowerCase())}
            />
          </div>
          <div className='column'>
            <div className='select is-medium'>
              <select onChange={(e) => setYearFilter(e.target.value)}>
                {
                  //TODO: populate select options from api yearFilterOptions
                }
                <option value='2021'>2021</option>
                <option value='2020'>2020</option>
                <option value='2019'>2019</option>
              </select>
            </div>
          </div>
        </div>
        {
          //TODO: pass in roster countries via rosterCountries
        }
        <RosterComponent year={yearFilter} />
        <div className='meetings-list'>
          {filteredMeetings.map((meeting) => (
            <>
              {
                //TODO: pass data into meeting components
                getMeetingVotes(meeting.meeting_id)
              }
              <MeetingComponent meeting={meeting} />
            </>
          ))}
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default App;
