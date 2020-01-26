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
            <div class="headline pa-3">
              Cafe Scientifique
            </div>
            <div class="title mb-5">
              Interesting and insightful exploration of contemporary science issues
            </div>
            <div class="mb-3">
              <v-btn large icon class="ma-2" href="https://www.facebook.com/CafeSciShrewsbury/">
                <v-icon>
                  mdi-facebook
                </v-icon>
              </v-btn>
              <v-btn large icon class="ma-2">
                <v-icon>
                  mdi-twitter
                </v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="grey lighten-3">
      <v-container>
        <div class="title my-3">
          Upcoming events
        </div>
        <v-layout row layout>
          <v-flex v-for="event in allEvents" :key="event.id" xs12 md4>
            <v-card class="ma-3">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline">
                    {{ $dateFns.format(new Date(event.date), 'do MMMM yyyy') }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-img
                v-if="event.previewImage"
                :src="event.previewImage.url"
                height="194"
              />

              <v-card-text v-html="$md.render(event.description)" />

              <v-card-actions>
                <v-btn
                  v-if="event.bookingLink"
                  :href="event.bookingLink"
                  text
                  color="blue accent-4"
                >
                  Book
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    allEvents: {
      query: gql`
        query fetchEvents($filter: EventModelFilter) {
          allEvents(orderBy: [ date_ASC ] first: 3, filter: $filter) {
            id
            date
            description
            bookingLink
            previewImage {
              url
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
