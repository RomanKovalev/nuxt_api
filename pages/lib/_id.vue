<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-tabs
            v-model="active"
            color="cyan"
            dark
            slider-color="yellow"
          >
            <v-tab ripple>
              Description
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>{{ info.description }}</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab ripple>
              Homepage
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text><a :href="info.homepage">{{ info.homepage }}</a></v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>

          <div class="text-xs-center mt-3">
            <v-btn @click="next">
              next tab
            </v-btn>
          </div>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      info: [],
      active: null
    }
  },
  mounted() {
    axios.get(this.$store.state.url + 'libraries/' + this.$route.params.id).then((response) => {
      (this.info = response.data)
    }, (err) => {
      alert(err)
    })
  },
  methods: {
    next() {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
    }
  }
}
</script>
