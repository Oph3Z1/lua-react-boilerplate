import { useEffect, useRef } from 'react'

// No-op function to handle unused handlers
const noop = () => {};

/**
 * Function to listen to a specific NUI event
 * 
 * @param {string} action - The action name to listen for
 * @param {function} handler - The callback function to handle the event
*/
export const GetNUIEvent = (action, handler) => {
  const savedHandler = useRef(noop); // Store the handler in a ref to preserve its value across renders

  useEffect(() => {
    savedHandler.current = handler; // Update handler on each render
  }, [handler]);

  useEffect(() => {
    // Event listener for the NUI message
    const eventListener = (event) => {
      const data = event.data;
      const eventAction = data.action;

      // If the event action matches, call the saved handler with the event data
      if (savedHandler.current && eventAction === action) {
        savedHandler.current(data);
      }
    };

    window.addEventListener("message", eventListener); // Listen for NUI events
    return () => window.removeEventListener("message", eventListener); // Cleanup on component unmount
  }, [action]);
};