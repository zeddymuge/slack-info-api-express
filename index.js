const express = require("express");
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    const { slack_name, track } = req.query;
    const now = new Date();
    
    // Explicitly set the time zone to UTC
    now.setUTCHours(now.getUTCHours());
    
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const utcTime = now.toISOString();

    if (!slack_name || !track) {
        return res.status(400).json({ error: 'slack_name and track required!' });
    }

    const githubRepoUrl = "https://github.com/zeddymuge/slack-info-api-express";
    const githubFileUrl = `${githubRepoUrl}/blob/main/index.js`;

    const response = {
        slack_name,
        current_day: currentDay,
        utc_time: utcTime,
        track,
        github_file_url: githubFileUrl,
        github_repo_url: githubRepoUrl,
        status_code: 200,
    };

    res.json(response);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
