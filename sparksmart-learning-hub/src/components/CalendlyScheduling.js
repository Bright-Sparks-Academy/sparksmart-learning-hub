// CalendlyScheduling.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ScheduleContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ScheduleHeader = styled.h2`
  font-weight: bold;
  font-size: 1.75rem;
  color: black;
  margin-bottom: 10px;
`;

const CalendlyContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 600px;
  border: none;
`;

const CalendlyScheduling = () => {
  const [schedulingUrl, setSchedulingUrl] = useState('');

  useEffect(() => {
    const fetchSchedulingUrl = async () => {
      try {
        const response = await axios.post('/api/schedule-consultation', { eventName: '30 Minute Meeting' });
        setSchedulingUrl(response.data.schedulingUrl);
      } catch (error) {
        console.error('Failed to fetch scheduling URL:', error);
      }
    };

    fetchSchedulingUrl();
  }, []);

  useEffect(() => {
    if (schedulingUrl && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: schedulingUrl,
        parentElement: document.getElementById('calendly-inline-widget'),
        prefill: {},
        utm: {}
      });
    }
  }, [schedulingUrl]);

  return (
    <ScheduleContainer>
      <ScheduleHeader>Schedule a Consultation</ScheduleHeader>
      {schedulingUrl ? (
        <CalendlyContainer id="calendly-inline-widget" />
      ) : (
        <p>Loading...</p>
      )}
    </ScheduleContainer>
  );
};

export default CalendlyScheduling;
