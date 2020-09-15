// Stock Market Portfolio App
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const request = require("request");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// API KEY pk_145065d7af7646a0961e795aa8d0b395
// Create call_api function
function call_api(finishedAPI) {
  request(
    "https://strainapi.evanbusse.com/gHhro7U/strains/search/all",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      if (res.statusCode === 200) {
        // console.log(body);
        finishedAPI(body);
      }
    }
  );
}

function strain_search(finishedAPI, strain) {
  request(
    "https://strainapi.evanbusse.com/gHhro7U/strains/search/name/" + strain,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      if (res.statusCode === 200) {
        console.log(body);
        finishedAPI(body);
      }
    }
  );
}
function canna_news(finishedAPI) {
  request(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=cannabis&api-key=jJVKbAMaP9PMzRCM4Y2YgpG8n8E0NOMy",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      if (res.statusCode === 200) {
        console.log(body);
        finishedAPI(body);
      }
    }
  );
}

// Set Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const otherstuff = "This is other stuff";

// Set handlebar index GET routes
app.get("/", function (req, res) {
  call_api(function (doneAPI) {
    res.render("home", {
      strains: doneAPI,
    });
  });
});

// Set handlebar index POST routes
app.post("/", function (req, res) {
  strain_search(function (completeAPI) {
    // posted_stuff = req.body.stock_ticker;
    res.render("search", {
      strain: completeAPI,
    });
  }, req.body.strain_search);
});

app.get("/search", function (req, res) {
  strain_search(function () {
posted_stuff = req.body.stock_ticker;
    res.render("search");
  });
});

// Set handlebar index POST routes
app.get("/news", function (req, res) {
  canna_news(function (completedAPI) {
// posted_stuff = req.body.stock_ticker;
    res.render("news", {
      news: completedAPI,
    });
  });
});

// Set handlebar index POST routes
app.post("/news", function (req, res) {
  strain_search(function (completedAPI) {
    // posted_stuff = req.body.stock_ticker;
    res.render("news", {
      strain: completedAPI,
    });
  });
});

// Set handlebar index POST routes
app.get("/about", function (req, res) {
  canna_news(function (completedAPI) {
// posted_stuff = req.body.stock_ticker;
    res.render("about", {
      news: completedAPI,
    });
  });
});

// Set handlebar index POST routes
app.get("/contact", function (req, res) {
  canna_news(function (completedAPI) {
// posted_stuff = req.body.stock_ticker;
    res.render("contact", {
      news: completedAPI,
    });
  });
});

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
