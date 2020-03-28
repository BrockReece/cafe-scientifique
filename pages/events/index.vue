<template>
  <v-container>
    <div class="title my-3">
      <v-icon
        @click="$router.push('/')"
        large
      >
        mdi-chevron-left
      </v-icon>
      All events
    </div>
    <v-layout row layout>
      <v-flex v-for="event in allEvents" :key="event.id" xs12 md4 class="pb-3">
        <event-card :event="event" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

import EventCardFields from '~/gql/EventCard.gql'
import EventCard from '~/components/EventCard'

const query = gql`
  query fetchEvents {
    allEvents(orderBy: [ date_ASC ]) {
      ...EventCardFields
    }
  }
  ${EventCardFields}
`

export default {
  components: {
    EventCard
  },

  data () {
    return {
      allEvents: []
    }
  },

  async asyncData ({ app, $payloadURL, route }) {
    if (process.static && process.client && $payloadURL) {
      return fetch($payloadURL(route)).then(res => res.json())
    }

    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query
    })
    return {
      allEvents: data.allEvents
    }
  },

  head () {
    return {
      title: 'All events'
    }
  }
}
</script>
