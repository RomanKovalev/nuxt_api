<template>
  <div class="text-xs-center">
    <br>
    <v-btn
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="loader = 'loading'"
    >
      Get data
    </v-btn>
    <div>
      <v-text-field
        v-model="searchQuery"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
      <v-data-table
        :headers="headers"
        :items="info"
        :pagination.sync="pagination"
        class="elevation-1"
        :search="searchQuery"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">
            {{ props.item.name }}
          </td>
          <td class="text-xs-left">
            {{ props.item.latest }}
          </td>
          <td class="text-xs-left">
            <nuxt-link :to="{name: 'lib-id', params: { id: props.item.name } }">
              More
            </nuxt-link>
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      info: [],
      searchQuery: '',
      loader: null,
      loading: false,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Latest',
          align: 'left',
          sortable: false,
          value: 'latest'
        },
        {
          text: 'Link',
          align: 'left',
          sortable: false,
          value: 'link'
        }
      ],
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  computed: {
    ...mapGetters({ url: 'url' })
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 1000)
      this.loader = null
      this.getApiData(this.url)
    }
  },
  mounted() {
    console.log()
  },
  methods: {
    getApiData(url) {
      axios.get(this.$store.state.url + 'libraries').then((response) => {
        (this.info = response.data.results)
      }, (err) => {
        alert(err)
      })
    }
  }
}
</script>
