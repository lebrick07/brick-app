// import React, { useState } from "react";
// // import openai from "openai";
// import axios from 'axios';

// const apiEndpoint = "https://api.openai.com/v1/images/generations";

// const ImageGeneration = () => {
//   const [generatedImage, setGeneratedImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

//   const generateImage = async () => {
//     setLoading(true);
//     setErrorMessage("");

//     const conversation = "Dogs and cats";

//     try {
//       const response = await axios.post(apiEndpoint, {
//         model: 'image-alpha-001',
//         prompt: conversation,
//         size: '1024x1024',
//         n: 1,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${apiKey}`,
//         },
//         responseType: 'arraybuffer',
//       });

//       const base64Image = Buffer.from(response.data, 'binary').toString('base64');
//       setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Failed to generate image");
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       {errorMessage && <div>{errorMessage}</div>}
//       <button onClick={generateImage} disabled={loading}>
//         {loading ? "Generating Image..." : "Generate Image"}
//       </button>
//       <br></br>
//       {generatedImage && <img src={generatedImage} alt="Generated" crossorigin="anonymous"/>}
//     </div>
//   );
// };

// export default ImageGeneration;

import React, { useState } from "react";
import axios from "axios";

const apiEndpoint = "https://api.openai.com/v1/images/generations";

const ImageGeneration = () => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const generateImage = async () => {
    setLoading(true);
    setErrorMessage("");

    const conversation = "Dogs and cats";

    try {
      const response = await axios.post(
        apiEndpoint,
        {
          model: "image-alpha-001",
          prompt: conversation,
          size: "1024x1024",
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const generatedImageUrl = response.data.data[0].url;
      setGeneratedImage(generatedImageUrl);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to generate image");
    }

    setLoading(false);
  };

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <button onClick={generateImage} disabled={loading}>
        {loading ? "Generating Image..." : "Generate Image"}
      </button>
      <br />
      {generatedImage && <img src={generatedImage} alt="Generated" />}
    </div>
  );
};

export default ImageGeneration;
