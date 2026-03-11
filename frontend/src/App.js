import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !email) {
      setMessage("Please select a file and enter an email.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      setMessage("Processing...");

      // Removed unused variable 'res' to satisfy ESLint
      await axios.post(
        "https://rabbitai-backend.onrender.com/api/upload",
        formData
      );

      setMessage("Success! Email sent.");
    } catch (err) {
      setMessage("Error processing file");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Sales Insight Automator</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br /><br />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={handleUpload}>
        Generate Insight
      </button>

      <p>{message}</p>
    </div>
  );
}

export default App;