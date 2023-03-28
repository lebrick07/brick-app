// src/components/pages/Contact.js

import React from 'react';
import styles from '../../css/Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.contactHeader}>Contact Us</h1>
      <p className={styles.contactParagraph}>
        Email us at: <a href="mailto:lebrick07@gmail.com">lebrick07@gmail.com</a>
      </p>
      <p className={styles.contactParagraph}>
      Welcome, dear explorer of the digital realm! You've journeyed far and wide across the vast expanse of cyberspace, and now you've arrived at the nexus of human connection - our Contact Us page.
      As navigators and innovators in our own right, we're delighted to have you here and eager to assist you in any way we can. Whether you have questions, suggestions, or just wish to share your thoughts and experiences, we're all ears - or rather, pixels.
      </p>
      <p className={styles.contactParagraph}>
      Simply reach out to us through the provided communication channels, and rest assured that a dedicated team of real-life human beings will be ready to respond with the perfect blend of creativity and practicality.
      Don't be shy, intrepid digital traveler - we value your insights and cherish the opportunity to connect. After all, human interaction is what makes the virtual world come alive! So, let's embark on this exciting journey together and create something truly extraordinary.
      </p>
    </div>
  );
}

export default Contact;

// import React, { useState } from 'react';
// import styles from '../../css/Contact.module.css';

// const Contact = () => {
//   const [message, setMessage] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     fetch('/submit-contact-form', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => {
//         if (response.ok) {
//           setMessage('Thank you for your message! We will be in touch soon.');
//         } else {
//           setMessage('Sorry, there was a problem sending your message. Please try again later.');
//         }
//       })
//       .catch((error) => {
//         setMessage('Sorry, there was a problem sending your message. Please try again later.');
//         console.error(error);
//       });
//   };

//   return (
//     <div className={styles.contactContainer}>
//       <h1>Contact</h1>
//       <p className={styles.contactDescription}>
//         Have a question, comment, or suggestion? Fill out the form below and
//         we'll get back to you as soon as possible!
//       </p>
//       <p>
//       You can also email us directly at: <a href="mailto:lebrick07@gmail.com">lebrick07@gmail.com</a>  
//       </p>
//       <form className={styles.contactForm} onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label htmlFor="name">Name:</label>
//           <input type="text" id="name" name="name" required />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email:</label>
//           <input type="email" id="email" name="email" required />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="message">Message:</label>
//           <textarea id="message" name="message" required />
//         </div>
//         <button type="submit" className={styles.submitButton}>
//           Submit
//         </button>
//       </form>
//       {message && <p className={styles.message}>{message}</p>}
//     </div>
//   );
// };

// export default Contact;
