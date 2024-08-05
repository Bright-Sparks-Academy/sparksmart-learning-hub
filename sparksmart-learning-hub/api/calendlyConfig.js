import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CALENDLY_API_URL = 'https://api.calendly.com';
const CALENDLY_API_KEY = process.env.CALENDLY_API_KEY;

// Fetch Calendly user details
export const getCalendlyUser = async () => {
  try {
    const response = await axios.get(`${CALENDLY_API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${CALENDLY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.resource;
  } catch (error) {
    console.error('Error fetching Calendly user:', error);
    throw error;
  }
};

export const setCalendlyAvailability = async (schedulingUrl, startDate, endDate) => {
  try {
    const response = await axios.post(
      `${CALENDLY_API_URL}/availability`,
      {
        scheduling_url: schedulingUrl,
        start_date: startDate,
        end_date: endDate,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CALENDLY_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error setting Calendly availability:', error);
    throw error;
  }
};

// List all event types available to the user
export const listEventTypes = async (userUri) => {
  try {
    const response = await axios.get(`${CALENDLY_API_URL}/event_types`, {
      headers: {
        'Authorization': `Bearer ${CALENDLY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      params: {
        user: userUri // Pass the user URI as a query parameter
      }
    });
    return response.data.collection;
  } catch (error) {
    console.error('Error listing event types:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Retrieve the scheduling link for a given event type by name
export const getSchedulingLink = async (eventName) => {
  try {
    const user = await getCalendlyUser();
    const eventTypes = await listEventTypes(user.uri);
    const event = eventTypes.find(e => e.name === eventName);
    if (!event) {
      console.error(`Event type ${eventName} not found`);
      throw new Error(`Event type ${eventName} not found`);
    }
    console.log('Scheduling URL:', event.scheduling_url); // Log the scheduling URL
    return event.scheduling_url;
  } catch (error) {
    console.error('Error getting scheduling link:', error.message);
    throw error;
  }
};
