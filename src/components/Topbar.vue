<template>
  <div class="header">
    <div class="tophead">
      <h1>THE NEWS APP</h1>
      <div class="tempandtime">
        <div class="temp">
          <!-- <font-awesome-icon :icon="['fas', 'moon']" v-if="night" :style="{ color: '#FEFCD7' }" size="2x"/>
          <font-awesome-icon :icon="['fas', 'sun']" v-if="day" :style="{ color: 'orange' }" size="2x" />
         <font-awesome-icon :icon="['fas', 'cloud']" :style="{ color: '#eee', position: absolute, left:'30px'}" size="x" /> -->
          <img
            src="../assets/images/sun.png"
            width="50"
            height="50"
            alt=""
            v-if="day"
          />
          <img
            src="../assets/images/moon.png"
            width="50"
            height="50"
            alt=""
            v-if="night"
          />
          <h2>{{ high }}&deg;C</h2>
        </div>

        <div class="sunmoon">
          <!-- <font-awesome-icon :icon="['fas', 'clock']" :style="{ color: '#FFC65C' }" size="2x"/> -->
          <img src="../assets/images/clock.png" width="30" height="30" />
          <h3>{{ time }}</h3>
        </div>
      </div>
    </div>

    <div class="navig">
      <ul>
        <li
          v-for="(section, index) in sections"
          :key="section"
          @click="setActive(section, index)"
          :class="{ active: activeIndex === index }"
          :id="section"
        >
          {{ section }}
        </li>
      </ul>
    </div>

    <div class="menu">
      <font-awesome-icon
        v-if="openmenu"
        @click="menutoggle"
        :icon="['fas', 'bars']"
        :style="{ color: '#FFC65C' }"
        size="2x"
      />
      <font-awesome-icon
        v-if="closemenu"
        @click="menutoggle"
        :icon="['fas', 'times']"
        :style="{ color: '#FFC65C' }"
        size="2x"
      />
    </div>
    <hr />
    <div class="menubox" v-if="closemenu">
      <div class="navigmini">
        <ul>
          <li
            v-for="(section, index) in sections"
            :key="section"
            @click="setActive(section, index)"
            :class="{ active: activeIndex === index }"
            :id="section"
          >
            {{ section }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topbar",
  props: {
    value: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
    low: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      url_: "https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=",
      night: false,
      day: false,
      time: "",
      interval: null,
      openmenu: true,
      closemenu: false,
      activeIndex: 0,
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
  mounted() {
    let date = new Date();
    let hrs = date.getHours();
    if (hrs > 5 && hrs < 19) {
      this.day = true;
      this.night = false;
    } else {
      this.night = true;
      this.day = false;
    }
    
  },
  created() {
   
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format();
    }, 1000);
  },
  methods: {
    menutoggle() {
      console.log("open menu");
      this.openmenu = !this.openmenu;
      this.closemenu = !this.closemenu;
      
    },

    setActive(section, index) {
      this.activeIndex = index;
      this.url_ =
        section == "Trending"
          ? "https://gnews.io/api/v4/top-headlines?country=in&lang=en&token="
          : "https://gnews.io/api/v4/top-headlines?country=in&lang=en&topic=" +
            section.toLowerCase() +
            "&token=";
      this.$emit("geturl", this.url_);
      this.menutoggle();
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Digital";
  src: url("../assets/fonts/DIGITALDREAMNARROW.ttf");
}
hr {
  position: absolute;
  width: 100%;
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid var(--border);
  top: 150px;
  margin: 0;
}
.menubox {
  width: 100%;
  display: none;
  position: absolute;
  top: 151px;
  background: var(--background);
  height: fit-content;
  z-index: 30;
  margin: 0;
  transition: 0.3s ease-in;
}

.header {
  align-items: center;

  vertical-align: middle;
}
.tophead {
  height: 100px;
  /* background: rgb(248, 248, 248); */

  display: flex;
  justify-content: stretch;
}
.tophead h1 {
  color: var(--text);
  /* margin: 30px; */
  left: auto;
  right: auto;
  width: 100%;
  font-size: 40px;
  font-weight: normal;
  position: absolute;
  text-align: center;
}

.menu {
  display: none;
  position: absolute;
  right: 30px;
  top: 60px;
}

.tempandtime {
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 110px;
  right: 110px;
  top: 30px;
  justify-content: space-between;
}
.sunmoon {
  display: flex;
  align-items: center;
}
.sunmoon h3 {
  color: var(--text);
  font-family: "Digital";
  font-weight: bold;
  font-size: 17px;
  padding: 0 20px;
}
.temp {
  margin: 0;
  display: flex;
  align-items: center;
}
.temp h2 {
  color: var(--text);
  margin: 0;
  font-weight: normal;
  font-size: 27px;
}

.navigmini ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px;
  width: fit-content;
  padding: 0;
  text-align: center;
}

.navig ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  margin: 0 auto 20px;
  width: fit-content;
  padding: 0;
}
.navig ul li {
  color: var(--text);
  padding: 0 10px;
  font-size: 17px;
  cursor: pointer;
  margin: 0 10px;
}
.navigmini ul li {
  color: var(--text);
  padding: 15px 10px 0 10px;
  font-size: 17px;
  cursor: pointer;
  margin: 0 10px;
}
.active {
  color: var(--dark) !important;
  border-bottom: 3px solid var(--light);
}
.navig ul li:hover {
  color: var(--dark);
}

@media screen and (max-width: 1100px) and (min-width: 940px) {
  .tophead {
    flex-direction: column;
    justify-content: space-between;
  }
  .temp,
  .sunmoon {
    padding: 0;
    margin: 0 20px;
    height: fit-content;
    width: fit-content;
  }
  .menu {
    display: flex;
  }
  .menubox {
    display: block;
  }
  .tophead h1 {
    margin: 30px auto 0;
    order: -1;
  }
  .tempandtime {
    display: flex;
    flex-direction: row;
    top: 90px;
    justify-content: center;
  }
  .navig {
    display: none;
  }
}

@media screen and (max-width: 940px) and (min-width: 620px) {
  .tophead {
    flex-direction: column;
    justify-content: space-between;
  }
  .temp,
  .sunmoon {
    padding: 0;
    margin: 0 20px;
    height: fit-content;
    width: fit-content;
  }
  .menu {
    display: flex;
  }
  .menubox {
    display: block;
  }
  .tophead h1 {
    margin: 30px auto 0;
    order: -1;
  }
  .tempandtime {
    display: flex;
    flex-direction: row;
    top: 90px;
    justify-content: center;
  }
  .navig {
    display: none;
  }
}

@media screen and (max-width: 620px) and (min-width: 430px) {
  .tophead {
    flex-direction: column;
    justify-content: space-between;
  }
  .temp,
  .sunmoon {
    padding: 0;
    margin: 0 20px;
    height: fit-content;
    width: fit-content;
  }
  .menu {
    display: flex;
  }
  .menubox {
    display: block;
    top: 161px;
  }
  .tophead h1 {
    margin: 30px auto 0;
    order: -1;
    font-size: 30px;
  }
  .tempandtime {
    display: flex;
    flex-direction: column;
    top: 70px;

    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }
  hr {
    top: 160px;
  }
  .sunmoon h3 {
    font-size: 14px;
    padding: 0 0 0 10px;
  }

  .sunmoon,
  .temp {
    margin: 0;
  }
  .temp h2 {
    font-size: 22px;
  }
  .navig {
    display: none;
  }
}

@media screen and (max-width: 430px) and (min-width: 312px) {
  .tophead {
    flex-direction: column;
    justify-content: space-between;
  }
  .temp,
  .sunmoon {
    padding: 0;
    margin: 0 20px;
    height: fit-content;
  }
  .menu {
    display: flex;
  }
  .menubox {
    display: block;
    top: 161px;
  }
  .tophead h1 {
    margin: 30px auto 0;
    order: -1;
    font-size: 30px;
  }
  .tempandtime {
    display: flex;
    flex-direction: column;
    top: 70px;

    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }
  hr {
    top: 160px;
  }
  .sunmoon h3 {
    padding: 0 0 0 10px;
    font-size: 14px;
    width: fit-content;
    white-space: nowrap;
  }

  .temp h2 {
    font-size: 20px;
  }
  .navig {
    display: none;
  }
}

@media screen and (max-width: 312px) {
  .tophead {
    flex-direction: column;
    justify-content: space-between;
    overflow-x: scroll;
  }
  .temp,
  .sunmoon {
    padding: 0;
    margin: 0 20px;
    height: fit-content;
    overflow-x: scroll;
  }
  .menu {
    display: flex;
  }
  .menubox {
    display: block;
    top: 161px;
    overflow-x: scroll;
  }
  .tophead h1 {
    margin: 30px auto 0;
    order: -1;
    font-size: 30px;
  }
  .tempandtime {
    display: flex;
    flex-direction: column;
    top: 70px;
    overflow-x: scroll;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }
  hr {
    top: 160px;
  }
  .sunmoon h3 {
    font-size: 14px;
    width: fit-content;
    white-space: nowrap;
  }

  .temp h2 {
    font-size: 20px;
  }
  .navig {
    display: none;
  }
}
</style>