const fs = require("fs");
const config = require("./config");
const fm = require("front-matter");
const marked = require("./marked");

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
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${data.attributes.description}" />
        <title>${data.attributes.title} | thingsgavdoes</title>
    </head>
    <body>
        <header>
            <a href="/">Go back home</a>
        </header>
        <div class="content">
                <h1>${data.attributes.title}</h1>
            <p>${new Date(parseInt(data.attributes.date)).toDateString()}</p>
            <hr />
            ${data.body}
        </div>
    </body>
</html>
`;

module.exports = createPost;
