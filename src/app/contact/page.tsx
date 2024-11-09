"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { sendEmail } from "../../app/actions";
import "./contact.scss";
export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessageSent(false);
    setError(false);

    const formData = new FormData(event.currentTarget);

    try {
      await sendEmail(formData);
      setMessageSent(true);
      console.log("Message sent, error not caught!");
    } catch (error) {
      console.error("error caught!");
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {messageSent && (
        <div className="success-message">
          Your message is on its way! Thanks for reaching out.
        </div>
      )}
      {!messageSent && (
        <div className="form-container">
          <form onSubmit={handleSubmit} id="contact">
            <div className="form-row">
              <div className="message-column">
                <textarea
                  name="message"
                  placeholder="Send me a message?"
                  required
                />
              </div>
              <div className="info-column">
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />

                <button className="btn btn-normal" disabled={loading}>
                  {loading
                    ? "Sending..."
                    : error
                    ? "Error sending message :-("
                    : "Send Message"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {error && (
        <div className="error-message">
          Whoops, that went belly-up! Shoot me an email at
          aidhendrickson@gmail.com
        </div>
      )}
    </>
  );
}
