import { Slider, Typography, Box, Chip } from "@mui/material";

interface RatingSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const RatingSlider = ({ label, value, onChange }: RatingSliderProps) => {
  const getRatingColor = (rating: number): string => {
    const colors = ["#d32f2f", "#f57c00", "#fbc02d", "#689f38", "#388e3c"];
    return colors[rating - 1] || "#757575";
  };

  const getRatingText = (rating: number): string => {
    const texts = ["Very Poor", "Poor", "Average", "Good", "Excellent"];
    return texts[rating - 1] || "Unknown";
  };

  const marks = [
    { value: 1, label: "😞" },
    { value: 2, label: "🙁" },
    { value: 3, label: "😐" },
    { value: 4, label: "🙂" },
    { value: 5, label: "😊" },
  ];

  return (
    <Box mt={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography gutterBottom sx={{ fontWeight: 500, mb: 0 }}>
          {label}: {value}/5
        </Typography>
        <Chip
          label={getRatingText(value)}
          size="small"
          sx={{
            backgroundColor: getRatingColor(value),
            color: "white",
            fontWeight: 600,
          }}
        />
      </Box>

      <Slider
        value={value}
        onChange={(_, val) => onChange(val as number)}
        step={1}
        marks={marks}
        min={1}
        max={5}
        sx={{
          color: getRatingColor(value),
          "& .MuiSlider-thumb": {
            backgroundColor: getRatingColor(value),
            border: "2px solid white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          },
          "& .MuiSlider-track": {
            backgroundColor: getRatingColor(value),
          },
        }}
      />
    </Box>
  );
};

export default RatingSlider;
