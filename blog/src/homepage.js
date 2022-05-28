const config = require("./config");
const fs = require("fs");

const generateHomePage = (posts) => {
  fs.writeFile(`${config.dev.outdir}/index.html`, homepage(posts), (e) => {
    if (e) throw e;
    console.log(`index.html was created successfully`);
  });
};

const homepage = (posts) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="stylesheet" href="assets/main.css" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.blogDescription}" />
        <title>${config.blogName}</title>
    </head>
    <body>
        <div class="sitename">
            <header>
                <h1>
                  <span class="mainsite-title">thingsgavdoes</span>
                  //
                  <span class="subsite-title">${config.blogName}</span>
                </h1>
                <p>—</p>
                <p>This blog is written by ${config.authorName}, ${
  config.authorDescription
}. You can see him never tweet over on <a href="${
  config.authorTwitter
}">his twitter</a>, and rarely make contributions to his <a href="${
  config.authorGithub
}">GitHub profile</a></p>
                <hr />
            </header>
            <div class="posts">
                ${posts
                  .map(
                    (post) => `<div class="post">
                    <h3><a href="./${post.path}">${
                      post.attributes.title
                    }</a></h3>
                        <small>${new Date(
                          parseInt(post.attributes.date)
                        ).toDateString()}</small>
                        <p>${post.attributes.description}</p>
                    </div>`
                  )
                  .join("")}
            </div>
            <footer>
                <p>Made with ❤️ & ☕️ by <a href="https://github.com/gavinroderick">@gavinroderick</a></p>
            </footer>
        </div>
    </body>
</html>
`;

module.exports = generateHomePage;
