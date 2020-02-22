<template>
  <div>
    <div class="white pa-5 text-center">
      <v-container>
        <v-layout class="justify-center">
          <v-flex xs12 lg4>
            <img
              src="~/assets/logo.png"
              height="194"
            >
            <div class="headline pa-3 pb-1">
              Cafe Scientifique
            </div>
            <div>Shrewsbury</div>
            <div class="title mt-3 mb-5">
              Interesting and insightful exploration of contemporary science issues
            </div>
            <div class="mb-3">
              <v-btn large icon class="ma-2" href="https://www.facebook.com/CafeSciShrewsbury/">
                <v-icon>
                  mdi-facebook
                </v-icon>
              </v-btn>
              <v-btn large icon class="ma-2" href="mailto:cafescishrewsbury@gmail.com">
                <v-icon>
                  mdi-email
                </v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="grey lighten-3 pb-5">
      <v-container>
        <div class="title my-3">
          Upcoming events
        </div>
        <v-layout row layout>
          <v-flex v-for="event in allEvents" :key="event.id" xs12 md4 class="pb-3">
            <event-card :event="event" />
          </v-flex>
        </v-layout>
        <div class="title mt-5">
          <v-btn
            text
            color="blue accent-4"
            to="/events/"
          >
            See more events
          </v-btn>
        </div>
      </v-container>
    </div>
    <div class="grey lighten-5 pa-5 text-center">
      <v-container>
        <v-layout row align-center fill-height>
          <v-flex xs12 md6 class="pa-5 headline">
            <div class="px-5">
              Come and join us on the Second Monday of each month at the Alb
            </div>
          </v-flex>
          <v-flex xs12 md6 class="pa-5">
            <div style="width: 100%">
              <no-ssr>
                <iframe
                  width="100%"
                  height="400"
                  src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=The%20Alb%20Bar%2C%2014%20smithfield%20rd%2C%20Shrewsbury%20sy1%201pb+(the%20alb%20shrewsbury)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                />
              </no-ssr>
            </div><br>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
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
        query fetchEvents($filter: EventModelFilter) {
          allEvents(orderBy: [ date_ASC ] first: 3, filter: $filter) {
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
      `,
      variables () {
        return {
          filter: {
            date: {
              gte: this.$dateFns.format(new Date(), 'yyyy-MM-dd')
            }
          }
        }
      },
      prefetch () {
        return {
          filter: {
            date: {
              gte: this.$dateFns.format(new Date(), 'yyyy-MM-dd')
            }
          }
        }
      }
    }
  },

  data () {
    return {
      allEvents: []
    }
  }
}
</script>
