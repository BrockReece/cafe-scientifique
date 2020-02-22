<template>
  <v-container>
    <div class="title my-3">
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
import EventCard from '~/components/EventCard'

export default {
  components: {
    EventCard
  },

  apollo: {
    allEvents: {
      query: gql`
        query fetchEvents {
          allEvents(orderBy: [ date_ASC ]) {
            id
            date
            title
            description
            bookingLink
            previewImage {
              url
            }
            speaker {
              name
            }
          }
        }
      `
    }
  },

  data () {
    return {
      allEvents: []
    }
  }
}
</script>
