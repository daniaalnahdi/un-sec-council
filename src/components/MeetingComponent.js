import React from 'react';

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

  return (
    <ul id={meeting_id}>
      <li>Date: {date}</li>
      <li>Topic: {topic}</li>
      {!!press_release && <li>Press Release: {press_release}</li>}
      {!!resolution && <li>Resolution: {press_release}</li>}
      {!!record && <li>Record: {record}</li>}
      {!!recording && <li>Recording: {recording}</li>}
    </ul>
  );
};

export default MeetingComponent;
