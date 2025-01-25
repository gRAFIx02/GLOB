import express from "express";

const app = express();
const port = 3000;
const blog = {};

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/write", (req, res) => {
    res.render("index.ejs");
})

app.get("/read", (req, res) => {
    res.render("partials/read.ejs", {blog: blog || {}});
})

app.get("/read/view_blog", (req, res) => {
    const title = req.query.title;
    const content = blog[title]
    res.render("partials/view_blogs.ejs", {title, content});
})

app.post("/write", (req, res) => {
    const { title, content } = req.body;
    if(title && content)
        blog[title] = content;
    res.redirect("/read");
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})