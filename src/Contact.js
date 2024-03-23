import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7eklcks",
        "template_ra9zr7i",
        form.current,
        "k_7J8JtYnt35Dq_q3"
      )
      .then(
        (result) => {
          alert("성공적으로 이메일이 전송되었습니다.");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert("이메일이 전송이 실패되었습니다.");
        }
      );
  };

  return (
    <div className="Contact-container">
      <h3>Contact</h3>
      <form ref={form} onSubmit={sendEmail} className="Contact-area">
        <label>E-Mail</label>
        <input type="email" name="user_email" required />

        <label>Title</label>
        <input type="text" name="ask_title" maxLength={20} required />

        <label>Message</label>
        <textarea name="ask_message" required />
        <button type="submit" value="Send" className="Send-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
