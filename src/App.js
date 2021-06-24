import React, { useState, useEffect } from 'react';
import axios from 'axios';

import HeaderComponent from './components/HeaderCompoent';
import RosterComponent from './components/RosterComponent';
import FooterComponent from './components/FooterComponent';
import MeetingComponent from './components/MeetingComponent';

const App = () => {
  const api = 'https://un-sec-council.herokuapp.com';

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
    });
  }, []);

  // apply filters once data is fetched and when filters change
  useEffect(() => {
    let result = meetings.filter((meeting) => {
      return (
        meeting.date.includes(yearFilter) &&
        meeting.topic.toLowerCase().includes(stringFilter)
      );
    });
    setFilteredMeetings(result.reverse());
  }, [meetings, yearFilter, stringFilter]);

  // update roster based on year filter changes
  useEffect(() => {
    axios.get(api + `/roster/${yearFilter}/countries`).then((res) => {
      setRosterCountries(res.data);
    });
  }, [yearFilter]);

  return (
    <>
      <HeaderComponent />
      <div className='container mt-5 mb-5'>
        <div className='mr-4 ml-4'>
          <div className='columns'>
            <div className='column'>
              <input
                type='text'
                className='input is-medium'
                placeholder='Search topic...'
                onChange={(e) => setStringFilter(e.target.value.toLowerCase())}
              />
            </div>
            <div className='column is-one-quarter'>
              <div className='select is-medium is-fullwidth'>
                <select onChange={(e) => setYearFilter(e.target.value)}>
                  {yearFilterOptions.map(({ year }) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <RosterComponent year={yearFilter} countries={rosterCountries} />
          <div className='meetings-list'>
            {filteredMeetings.map((meeting) => (
              <MeetingComponent
                meeting={meeting}
                collapse={yearFilter}
                api={api}
              />
            ))}
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default App;
