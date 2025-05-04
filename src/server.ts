import app from "./app";
import { loadCSV } from "./services/csvLoader";


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

loadCSV(); // Call it once on startup to test

