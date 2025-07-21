import React from "react";
import {
  Box,
  Button,
  Slider,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

interface Props {
  values: {
    overall: number;
    workLife: number;
    culture: number;
    review: string;
  };
  setValues: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
}

const StressForm: React.FC<Props> = ({ values, setValues, onSubmit }) => {
  const handleChange =
    (field: string) => (event: Event, newValue: number | number[]) => {
      setValues((prev: any) => ({
        ...prev,
        [field]: newValue,
      }));
    };

  // Color mapping for ratings
  const getRatingColor = (rating: number): string => {
    switch (rating) {
      case 1: return '#d32f2f'; // Red
      case 2: return '#f57c00'; // Orange
      case 3: return '#fbc02d'; // Yellow
      case 4: return '#689f38'; // Light Green
      case 5: return '#388e3c'; // Green
      default: return '#0073e6'; // Default blue
    }
  };

  return (
    <Paper
      elevation={10}
      sx={{
        p: 3,
        borderRadius: "1rem",
        background: "#ffffff",
        boxShadow: "0 12px 54px rgba(0,0,0,0.3)",
        height: "75vh", // Takes 95% of viewport height
        width: "100%", // Takes 95% of container width
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        Rate the following:
      </Typography>

      {[
        { label: "Overall Experience", key: "overall" },
        { label: "Work-Life Balance", key: "workLife" },
        { label: "Company Culture", key: "culture" },
      ].map(({ label, key }) => (
        <Box key={key} mb={2}>
          <Typography gutterBottom color="textPrimary">
            {label}
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            {/* Red indicator for 1 */}
            <Typography 
              sx={{ 
                color: '#d32f2f', 
                fontWeight: 600,
                backgroundColor: values[key] === 1 ? '#d32f2f' : 'transparent',
                color: values[key] === 1 ? 'white' : '#d32f2f',
                borderRadius: '50%',
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                border: '2px solid #d32f2f'
              }}
            >
              1
            </Typography>
            
            <Slider
              value={values[key]}
              onChange={handleChange(key)}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay="auto"
              sx={{
                flex: 1,
                color: getRatingColor(values[key]),
                '& .MuiSlider-thumb': {
                  backgroundColor: getRatingColor(values[key]),
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                },
                '& .MuiSlider-track': {
                  backgroundColor: getRatingColor(values[key]),
                },
              }}
              aria-label={label}
            />
            
            {/* Green indicator for 5 */}
            <Typography 
              sx={{ 
                color: '#388e3c', 
                fontWeight: 600,
                backgroundColor: values[key] === 5 ? '#388e3c' : 'transparent',
                color: values[key] === 5 ? 'white' : '#388e3c',
                borderRadius: '50%',
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                border: '2px solid #388e3c'
              }}
            >
              5
            </Typography>
          </Box>
        </Box>
      ))}

      <TextField
        label="Employee Review"
        multiline
        rows={3}
        fullWidth
        
        value={values.review}
        onChange={(e) =>
          setValues((prev: any) => ({
            ...prev,
            review: e.target.value,
          }))
        }
        margin="normal"
        aria-label="Review Text"
        InputProps={{
          sx: {
            height: "75px",
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        }}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={onSubmit}
      >
        Predict Stress Level
      </Button>
    </Paper>
  );
};

export default StressForm;