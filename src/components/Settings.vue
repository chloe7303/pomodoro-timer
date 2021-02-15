<template>
  <v-row justify="end">
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="black"
          dark
          v-bind="attrs"
          v-on="on"
          fab
          small
        >
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Settings
        </v-card-title>
        <v-card-text>
          <v-text-field
            color="accent"
            v-for="(tab, i) in updatedTabs"
            :key="i"
            type="number"
            v-model="tab.min"
            :label="tab.name"
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
            @click="saveTabs(updatedTabs); dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'Settings',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    saveTabs: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    updatedTabs: []
  }),
  mounted () {
    this.updatedTabs = this.tabs
  }
}
</script>
