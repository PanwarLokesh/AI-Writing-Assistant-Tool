const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;
const analyzeRoute = require('./routes/analyze');
const grammarCheckRoute = require('./routes/grammarCheck');
const spellCheckRoute = require('./routes/spellCheck');
app.use(cors());
app.use(express.json());
app.use("/api/analyze", analyzeRoute);
app.use("/api/grammarCheck", grammarCheckRoute);
app.use('/api/spellCheck', spellCheckRoute);
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})