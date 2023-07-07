import React from "react";

export default function About() {
  return (
    <>
      <div className="container">
        <h1 className="my-3 pd-4">What we are</h1>
        <p>
          Welcome to our note-taking app, your ultimate digital companion for
          capturing and organizing your thoughts, ideas, and information.
          Whether you're a student, professional, or simply someone who loves to
          jot down their everyday thoughts, we've designed this app to meet all
          your note-taking needs with simplicity and efficiency.
        </p>
        <p>
          At our core, we believe that note-taking should be a seamless and
          enjoyable experience. We understand that your notes are an extension
          of your mind, and that's why we've crafted a user-friendly interface
          that focuses on enhancing your productivity and creativity.
        </p>
      </div>
      <div className="container my-2 pd-y-3">
        <h1>Features</h1>
        <div className="container my-2 pd-y-2">
          <ol>
            <li>
              <span className="feature-point">Intuitive Note Creation: </span>
              Our app provides a smooth and intuitive note creation process.
              With just a few taps, you can create new notes effortlessly,
              allowing you to capture your ideas the moment they strike.
            </li>
            <li>
              <span className="feature-point">Rich Formatting Options:  </span>
              Express yourself freely with our extensive range of formatting
              tools. Customize your notes with bold, italics, underline,
              headings, bullet points, and more. Highlight important
              information, create organized lists, or structure your notes to
              suit your unique style.
            </li>
            <li>
              <span className="feature-point">Security and Privacy: </span>
              We understand the importance of keeping your data secure. Our app
              employs robust security measures to protect your notes and
              sensitive information. Your privacy is our top priority, and we
              adhere to strict data protection practices to ensure
              confidentiality.
            </li>
            <li>
              <span className="feature-point">
                Cross-platform Compatibility:
              </span>
              Our note-taking app is available across various platforms,
              including iOS, Android, and the web. Seamlessly switch between
              devices without compromising on functionality or user experience.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
