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
