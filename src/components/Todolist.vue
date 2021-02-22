<template>
  <v-row>
    <v-col md="6" offset-md="3">
      <h3 class="mb-1">Current task: {{ currentTask }}</h3>
      <v-card color="background mb-4">
        <v-system-bar color="accent"></v-system-bar>
        <v-toolbar flat color="background">
          <v-toolbar-title>My Tasks</v-toolbar-title>
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" class="ml-auto">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                link
                @click="executeFunc(i)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>

        <v-list-item-group class="pb-2">
          <v-list-item-title class="ml-4 mb-4">
            <v-row class="align-center">
              <v-col cols="4" class="d-flex align-center">
                <span class="mr-3">show:</span>
                <v-select
                  v-model="select"
                  :items="selects"
                  dense
                  color="accent"
                  hide-details
                  outlined
                ></v-select>
              </v-col>
              <v-col>
                <span>; total: {{ showLists.length }}</span>
              </v-col>
            </v-row>
            </v-list-item-title>
            
          <v-list-item v-for="list in showLists" :key="list.id">
            <v-list-item-action>
              <v-checkbox v-model="list.done" color="accent"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content @click="currentTask = list.title">
              <div v-if="!list.edit">
              <v-list-item-title v-if="!list.done">{{ list.title }}</v-list-item-title>
              <v-list-item-title v-else style="color:grey;text-decoration:line-through;">{{ list.title }}</v-list-item-title>
              </div>
              <v-text-field color="accent" v-else v-model="list.model" @keydown.enter="save(list)"></v-text-field>
            </v-list-item-content>
            <span v-if="!list.edit">
              <v-btn icon @click="list.edit = true"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
              <v-btn icon @click="del(list)"><v-icon>mdi-delete</v-icon></v-btn>
            </span>
            <span v-else>
              <v-btn icon @click="save(list)"><v-icon>mdi-check</v-icon></v-btn>
              <v-btn icon @click="cancel(list)"><v-icon>mdi-close</v-icon></v-btn>
            </span>
          </v-list-item>
        </v-list-item-group>
      </v-card>

      <v-btn block color="secondary" @click="dialog = true">Add Task</v-btn>
      <v-dialog v-model="dialog" max-width="500" @keydown.enter="add">
        <v-card>
          <v-card-title class="headline">New Task</v-card-title>
          <v-card-text>
            <v-text-field
              label="write your new task..."
              required
              color="accent"
              v-model="newTask"
              autofocus
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="accent"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="secondary"
              text
              @click="add"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Todolist',
  data: () => ({
    currentTask: '',
    lists: [],
    id: 0,
    newTask: '',
    dialog: false,
    items: [
      { title: 'clear all tasks' },
      { title: 'clear finished tasks' },
      { title: 'mark all tasks complete' },
      { title: 'mark all tasks active' }
    ],
    selects: ['all', 'active', 'complete'],
    select: 'all'
  }),
  computed: {
    showLists () {
      return this.lists.filter((list) => {
        if (this.select === 'all') return true
        else if (this.select === 'active' && !list.done) return true
        else if (this.select === 'complete' && list.done) return true
        else return false
      })
    }
  },
  methods: {
    add () {
      this.dialog = false
      this.lists.push({
        title: this.newTask,
        edit: false,
        done: false,
        model: this.newTask,
        id: this.id
      })
      this.newTask = ''
      this.id++
    },
    del (list) {
      const idx = this.lists.indexOf(list)
      this.lists.splice(idx, 1)
    },
    save (list) {
      list.edit = false
      list.title = list.model
      this.currentTask = list.title
    },
    cancel (list) {
      list.edit = false
      list.model = list.title
    },
    executeFunc (i) {
      switch (i) {
        case 0:
          this.lists = []
          break
        case 1:
          this.lists = this.lists.filter((list) => !list.done)
          break
        case 2:
          this.lists = this.lists.map((list) => {
            list.done = true
            return list
          })
          break
        case 3:
          this.lists = this.lists.map((list) => {
            list.done = false
            return list
          })
          break
        default:
          this.lists = []
      }
    }
  },
  watch: {
    // 監測 lists 改變時就放進 localStorage
    lists: {
      handler (value) {
        localStorage.setItem('lists', JSON.stringify(value))
      },
      deep: true
    }
  },
  mounted () {
    const data = localStorage.getItem('lists')
    if (data) {
      this.lists = JSON.parse(data)
      // 設定 id 為 items 最後一個東西的值 + 1
      this.id = this.lists[this.lists.length - 1].id + 1
    }
  }
}
</script>
