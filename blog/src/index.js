const fs = require("fs");
const config = require("./config");
const postgenerator = require("./post-generator");
const generateHomePage = require("./homepage");

const posts = fs
  .readdirSync(config.dev.postsdir)
  .map((post) => post.slice(0, -3))
  .map((post) => postgenerator.createPost(post));

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

postgenerator.createPosts(posts);
generateHomePage(posts);
