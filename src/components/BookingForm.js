import React, { useState } from "react";
import './BookingForm.css'; 

const BookingForm = (props) => {
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");
  const [guests, setGuests] = useState("");
  const [occasion, setOccasion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitForm(e);
  };

  const handleChange = (e) => {
    setDate(e);
    props.dispatch(e);
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  return (
    <header>
      <section>
        <form className="BookingForm" onSubmit={handleSubmit}>
          <fieldset className="formField BookingForm-inputs">
            <div className="BookingForm-input">
              <label htmlFor="book-date">Choose Date:</label>
              <input
                id="book-date"
                value={date}
                onChange={(e) => handleChange(e.target.value)}
                type="date"
                min={today} // Set the minimum date to today
                required
              />
            </div>

            <div className="BookingForm-input">
              <label htmlFor="book-time">Choose Time:</label>
              <select
                id="book-time"
                value={times}
                onChange={(e) => setTimes(e.target.value)}
                required
              >
                <option value="">Select a Time</option>
                {props.availableTimes.availableTimes.map((availableTimes) => {
                  return <option key={availableTimes}>{availableTimes}</option>;
                })}
              </select>
            </div>

            <div className="BookingForm-input">
              <label htmlFor="book-guests">Number of Guests:</label>
              <select
                id="book-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
              >
                <option value="">Select number of guests</option>
                {[...Array(12).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="BookingForm-input">
              <label htmlFor="book-occasion">Occasion:</label>
              <select
                id="book-occasion"
                key={occasion}
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option>Birthday</option>
                <option>Anniversary</option>
              </select>
            </div>

            <div className="btnReceive BookingForm-input" >
              <input
                aria-label="On Click"
                type="submit"
                value={"Make Your Reservation"}
              />
            </div>
          </fieldset>
        </form>
      </section>
    </header>
  );
};

export default BookingForm;