require("dotenv").config();

const express = require("express");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// ===============================
// Supabase Connection
// ===============================

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// ===============================
// Middleware
// ===============================

app.use(express.json());
app.use(express.static("public"));

// ===============================
// Home Page
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// Admin Login
// ===============================

app.post("/admin-login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === "admin" && password === "12345") {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false
        });
    }
});

// ===============================
// Save Love Test Result
// ===============================

app.post("/save-result", async (req, res) => {
    const name1 = req.body.name1;
    const name2 = req.body.name2;
    const score = req.body.score;

    const { error } = await supabase
        .from("love_results")
        .insert([
            {
                name1: name1,
                name2: name2,
                score: score
            }
        ]);

    if (error) {
        console.log("Supabase Error:", error);

        return res.status(500).json({
            message: "Failed to save result"
        });
    }

    console.log("New result saved to Supabase!");

    res.json({
        message: "Result saved successfully!"
    });
});

// ===============================
// Get Love Test Results
// ===============================

app.get("/admin-results", async (req, res) => {
    const { data, error } = await supabase
        .from("love_results")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) {
        console.log("Supabase Error:", error);

        return res.status(500).json({
            message: "Failed to load results"
        });
    }

    res.json(data);
});

// ===============================
// Export App for Vercel
// ===============================

module.exports = app;