<template>
  <Topbar
    :value="this.forecast.temperatureValue"
    :high="this.forecast.temperatureHigh"
    :low="this.forecast.temperatureLow"
    @geturl="geturll"
  >
  </Topbar>

  <div class="grid" v-if="articles.length">
    <div
      class="griditem"
      v-for="article in articles"
      :style="[
        article.image
          ? {
              backgroundImage: `url(${article.image})`,
              backgroundSize: 'cover',
            }
          : {
              backgroundImage:
                'url(' + require('@/assets/images/imagenotfound.jpg') + ')',
              backgroundSize: 'cover',
            },
      ]"
      :key="article.title"
    >
      <div class="shadow"></div>
      <div class="title">
        <h3>{{ article.title }}</h3>
      </div>

      <div class="desc">
        <p>{{ truncate(article.description) }}</p>
        <a :href="article.url"> Read more</a>
      </div>
    </div>
  </div>

  <div class="loading" v-if="articles == 0">
    <h2>Loading...(If it is taking too long, try refreshing your browser)</h2>
  </div>
</template>

<script>
import Topbar from "./components/Topbar";
// import Newsbody from "./Newsbody.vue"
import WeatherForecast from "./services/WeatherForecast";
import axios from "axios";



export default {
  components: { Topbar },
  data() {
    return {
      url_: "https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=",
      night: false,
      day: true,
      time: "",
      interval: null,
      forecast: new WeatherForecast(),
      api_key: your_api_key,
      articles: [],
      errors: [],
      sections: [
        "Trending",
        "Health",
        "Entertainment",
        "Business",
        "Sports",
        "Technology",
        "Science",
      ],
    };
  },

  created() {
    let date = new Date();
    let hrs = date.getHours();
    if (hrs > 5 && hrs < 19) {
      this.day = true;
      this.night = false;
    } else {
      this.night = true;
      this.day = false;
      let bodyStyles = document.body.style;
      bodyStyles.setProperty("--background", "#171717");
      bodyStyles.setProperty("--text", "#fff");
      bodyStyles.setProperty("--shadow", "black");
      bodyStyles.setProperty("--border", "#666666");

    }

    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format();
    }, 1000);

    this.getdata(this.url_);
  },
  methods: {
    geturll(e) {
      this.url_ = e;
      this.getdata(e);
    },
    truncate(str) {
      if (str == null) {
        return;
      } else if (str.length > 100) {
        return str.substring(0, 100) + "...";
      } else {
        return str;
      }
    },

    getdata(url) {
      // console.log(url + this.api_key);
      axios
        .get(url + this.api_key)
        .then((response) => {
          
          this.articles = response.data.articles;
          // console.log(response.data.articles);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style>

@font-face {
  font-family: "DMSerifDisplay";
  src: url("./assets/fonts/DMSerifDisplay-Regular.ttf");
}
@font-face {
  font-family: "Digital";
  src: url("./assets/fonts/DIGITALDREAMNARROW.ttf");
}

@font-face {
  font-family: "DMSans";
  src: url("./assets/fonts/DMSans-Regular.ttf");
}

:root {
  --background: #fff !important;
  --text: black !important;
  --shadow: rgb(197, 197, 197) !important;
  --border: #eee !important;
  --dark: #ffa502 !important;
  --light: #ffc65c !important;
}

#app {
  font-family: DMSerifDisplay;
  background: var(--background);
}
body {
  padding: 0;
  margin: 0;
  background: var(--background);
}

.loading {
  position: absolute;
  display: flex;
  z-index: 50;
  align-items: center;
  vertical-align: middle;

  justify-content: center;
  height: 100vh;
  width: 100%;
  background: var(--background);
}
.loading h2 {
  position: absolute;
  font-weight: normal;
  color: var(--text);
  top: 280px;
}

.grid {
  position: relative;
  margin: 70px auto 0 auto;
  column-count: 2;
  width: fit-content;
  justify-content: flex-end;
  vertical-align: middle;
  column-gap: 60px;
}
.griditem {
  height: 400px;
  width: 400px;
  margin-bottom: 60px;
  box-shadow: 0 10px 15px var(--shadow);
  display: flex;
  z-index: 20;
  flex-direction: column;
  justify-content: flex-end;
}

.grid .shadow {
  width: 400px;
  z-index: 10;
  display: block;
  position: absolute;
  background: linear-gradient(to top, black 0%, rgba(255, 255, 255, 0) 80%);
  height: 400px;
}

.griditem .title {
  z-index: 20;
  height: fit-content;
}
.griditem .desc {
  z-index: 20;
  height: fit-content;
  padding: 10px 10px 15px 10px;
}
.griditem .title h3 {
  margin: 0 10px 0 10px;
  font-weight: normal;
  color: var(--dark);
  font-size: 20px;
  text-overflow: clip;
}
.griditem a {
  text-decoration: none;
  cursor: pointer;
  color: var(--light);
  font-size: 17px;
}
.griditem .desc p {
  font-weight: normal;
  font-family: "DMSans";
  margin-top: 0;
  margin-bottom: 10px;
  color: white;

  /* text-overflow: clip; */
  font-size: 15px;
}
.griditem a::after {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background: var(--dark);
  transition: width 0.3s;
}
.griditem a:hover::after {
  width: 100px;
}

@media screen and (max-width: 1100px) and (min-width: 940px) {
  .loading {
    top: 200px;
  }

  .grid {
    margin-top: 100px;
  }
}

@media screen and (max-width: 940px) and (min-width: 620px) {
  .grid {
    margin-top: 100px;
    column-count: 1;
  }
}

@media screen and (max-width: 620px) and (min-width: 430px) {
  .loading {
    top: 200px;
  }

  .grid {
    margin-top: 100px;
    column-count: 1;
  }
}

@media screen and (max-width: 430px) and (min-width: 312px) {
  .loading {
    top: 200px;
  }

  .grid {
    margin-top: 100px;
    column-count: 1;
  }

  .griditem,
  .grid .shadow {
    width: 300px;
  }
}

@media screen and (max-width: 312px) {
  #app {
    overflow-x: scroll;
  }
  .loading {
    top: 200px;
  }

  .grid {
    margin-top: 100px;
    column-count: 1;
  }

  .griditem,
  .grid .shadow {
    width: 300px;
  }
}
</style>
