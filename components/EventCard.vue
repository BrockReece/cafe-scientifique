<template>
  <v-card class="ma-3" height="100%">
    <v-layout column style="height: 100%">
      <v-flex>
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

        <v-card-title style="word-break: inherit">
          {{ event.title }}
        </v-card-title>
        <v-card-subtitle v-if="event.speaker" class="subtitle-1">
          {{ event.speaker.name }}
        </v-card-subtitle>
        <v-card-text v-html="$md.render(event.description)" />
      </v-flex>
      <v-spacer />
      <v-card-actions
        v-if="event.bookingLink"
      >
        <v-btn
          :href="event.bookingLink"
          text
          color="blue accent-4"
        >
          Book
        </v-btn>
      </v-card-actions>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
