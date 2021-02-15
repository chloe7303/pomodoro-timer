<template>
  <v-app>
    <v-main>
      <Pomodoro/>
      <Todolist/>
    </v-main>
  </v-app>
</template>

<script>
import Pomodoro from './components/Pomodoro'
import Todolist from './components/Todolist'

export default {
  name: 'App',
  components: {
    Pomodoro,
    Todolist
  },

  data: () => ({
    //
  })
}
</script>
