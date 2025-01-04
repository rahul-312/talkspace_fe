import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/users';

export const createShipment = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-shipment/`, formData);
      return response.data;
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }
  };


  export const createInquiry = async (inquiryData) => {
    try {
      const response = await axios.post(`${BASE_URL}/inquiries/`, inquiryData);
      return response.data;
    } catch (error) {
      console.error('Error creating inquiry:', error);
      throw error;
    }
  }; 

  // Contact Us - Submit Inquiry
export const submitContactForm = async (contactData) => {
    try {
      const response = await axios.post(`${BASE_URL}/contact/`, contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  };