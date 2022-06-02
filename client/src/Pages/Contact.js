import React from "react";
import './Contact.scss'


const Contact = () => {
  //when the user clicks the button, the form will be submitted and say "Thank you for contacting us!"
  const handleClick = () => {
    alert("Thank you for contacting us!")
  }

  return (
    <div className="contact-container">
      <h1>Contact us</h1>
      <div className="contact-container__form">
        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Last name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Phone" />
        <textarea className="contact-container__form__textarea" placeholder="Message" />
        <button className="contact-container__form__button" onClick={handleClick}>Send</button>
      </div>
    </div>
  )
}


export default Contact;