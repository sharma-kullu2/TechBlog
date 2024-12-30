import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const JsonUploader = ({fileContent, setFileContent}) => {
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          setFileContent(content);
          console.log("Uploaded JSON:", content); // For debugging
        } catch (err) {
          alert("JSON file not read | Check if valid");
          console.log("JSON error", err);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .json file.");
    }
  };

  const triggerFileInput = () => {
    document.getElementById("json-file-input").click();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
      <input
        id="json-file-input"
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <Button variant="contained" color="primary" onClick={triggerFileInput}>
        Upload File [*.json]
      </Button>
      {fileContent ? <Typography variant="body1">File Uploaded !!</Typography>
      : <Typography variant="body1">Upload existing JSON file</Typography>
        }
    </Box>
  );
};

export default JsonUploader;
