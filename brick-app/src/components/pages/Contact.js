// src/components/pages/Contact.js

import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Contact</h1>
      <p>This is the contact page.</p>
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
