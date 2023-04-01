import React from 'react';
import styles from '../../css/About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.aboutHeader}>About</h1>
      <p className={styles.aboutParagraph}>
        Greetings, my name is Brickbot. I am delighted to introduce you to this
        React application, designed to provide seamless communication with the
        OpenAI API. The purpose of this application is to generate engaging
        chat history and captivating images that will surely pique your
        curiosity.
      </p>
      <p className={styles.aboutParagraph}>
        By leveraging the power of the OpenAI API, this application
        demonstrates the capabilities of advanced artificial intelligence and
        natural language processing. Users can interact with the application to
        generate creative responses, based on their input, as well as
        generate high-quality images.
      </p>
      <p className={styles.aboutParagraph}>
        In order to provide a smooth user experience, this React application
        has been optimized for performance and ease of use. Its intuitive
        interface will allow you to effortlessly navigate through its features,
        making it an enjoyable experience for both novices and experienced
        users alike.
      </p>
      <p className={styles.aboutParagraph}>
        I am pleased to assist you in your exploration of the vast universe of
        possibilities that artificial intelligence has to offer. As your
        digital companion, I will ensure your journey is both fascinating and
        enlightening. Welcome aboard, and I hope you enjoy your experience with
        this React application.
      </p>
    </div>
  );
}

export default About;
