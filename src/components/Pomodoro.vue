<template>
  <v-row>
    <v-col md="6" offset-md="3">
      <v-card class="mt-8" color="background">
        <v-tabs v-model="currentTab" background-color="transparent" color="accent" grow @change="changeTab">
          <v-tab v-for="tab in tabs" :key="tab.name">
            {{ tab.name }}
          </v-tab>
        </v-tabs>

        <v-card color="background" flat class="py-12">
          <Settings :tabs="tabs" :saveTabs="saveTabs" />
          <v-card-title class="text-center justify-center py-10">
          <h1 class="font-weight-bold timer--text pb-6">
            {{ minutes }} : {{ seconds }}
          </h1>
        </v-card-title>

        <div class="btn-group text-center">
          <v-btn fab color="secondary" class="mx-2" @click="start">
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn fab color="secondary" class="mx-2" @click="pause">
            <v-icon>mdi-pause</v-icon>
          </v-btn>
          <v-btn :disabled="isRunning" fab color="secondary" class="mx-2" @click="reset(tabs[currentTab].min)">
            <v-icon>mdi-replay</v-icon>
          </v-btn>
        </div>
        </v-card>
      </v-card>

      <h3 class="text-center py-6">{{ this.tabs[this.currentTab].text }}</h3>

    </v-col>
  </v-row>
</template>

<script>
import Settings from './Settings.vue'

export default {
  name: 'Pomodoro',
  components: {
    Settings
  },
  data: () => ({
    totalSec: 25 * 60,
    timer: null,
    isRunning: false,
    currentTab: 0,
    tabs: [
      {
        name: 'Pomodoro',
        min: 25,
        text: 'Time to work!'
      },
      {
        name: 'Short Break',
        min: 5,
        text: 'Time for a break'
      },
      {
        name: 'Long Break',
        min: 15,
        text: 'Time for a break'
      }
    ]
  }),
  computed: {
    minutes () {
      const min = Math.floor(this.totalSec / 60)
      if (min < 10) {
        return '0' + min
      }
      return min
    },
    seconds () {
      const sec = this.totalSec % 60
      if (sec < 10) {
        return '0' + sec
      }
      return sec
    }
  },
  methods: {
    start () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.totalSec <= 0) {
          this.pause()
          // 播放鈴聲
          const audio = new Audio()
          audio.src = './kitchen-timer.mp3'
          audio.play()
          return
        }
        this.totalSec--
      }, 1000)
      this.isRunning = true
    },
    pause () {
      clearInterval(this.timer)
      this.isRunning = false
    },
    reset (min) {
      this.totalSec = min * 60
      this.isRunning = false
    },
    changeTab (num) {
      clearInterval(this.timer)
      this.isRunning = false
      this.totalSec = this.tabs[num].min * 60
    },
    saveTabs (updatedTabs) {
      this.tabs = updatedTabs
      this.totalSec = this.tabs[this.currentTab].min * 60
    }
  }
}
</script>

<style lang="sass" scoped>
.timer--text
  color: #6b705c !important
  font-size: 120px
</style>
