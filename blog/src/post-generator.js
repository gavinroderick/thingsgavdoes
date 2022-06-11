const fs = require("fs");
const config = require("./config");
const fm = require("front-matter");
const marked = require("./marked");

const createPosts = (posts) => {
  posts.forEach((post) => {
    if (!fs.existsSync(`${config.dev.outdir}/${post.path}`)) {
      fs.mkdirSync(`${config.dev.outdir}/${post.path}`);
    }

    fs.writeFile(
      `${config.dev.outdir}/${post.path}/index.html`,
      generateHtml(post),
      (err) => {
        if (err) throw err;
        console.log(`${post.path}/index.html was created successfully`);
      }
    );
  });
};

const createPost = (postPath) => {
  const data = fs.readFileSync(`${config.dev.postsdir}/${postPath}.md`, "utf8");
  const content = fm(data);
  content.body = marked(content.body);
  content.path = postPath;
  return content;
};

const generateHtml = (data) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="stylesheet" href="../assets/css/theme.css" />
        <link rel="stylesheet" href="../assets/css/main.css" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${data.attributes.description}" />

        <link rel="apple-touch-icon" sizes="180x180" href="../assets/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../assets/favicon//favicon-16x16.png">
        <link rel="manifest" href="assets/favicon/site.webmanifest">


        <title>${data.attributes.title} | thingsgavdoes</title>
    </head>
    <body>
    <header>
    <h1 class="title">
      <a href="https://thingsgavdoes.com" id="maintitle">thingsgavdoes</a>
      //
      <a href="/" id="subtitle">blog</a>
    </h1>
  </header>
  <main class="content">
  <section>
    <h1>${data.attributes.title}</h1>
    <subtitle>${new Date(parseInt(data.attributes.date)).toDateString()} - ${
  data.attributes.author
}</subtitle>
  </section>
  <article>
    ${data.body}
  </article>
  </main>
    </body>
</html>
`;

module.exports = {
  createPost: createPost,
  createPosts: createPosts,
};
