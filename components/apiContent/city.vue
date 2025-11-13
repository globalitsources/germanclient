<!-- <template>

  <a href="/monteurzimmer/{{ city }}">{{ city }}</a>

</template>

<script>
import { replaceTranslit } from "~/service/helpers/helpers";




export default {
  name: "city",
  props: {
    city: {
      required: true,
    },
  },
};
</script>
<!-- <template>
  <a :href="`/monteurzimmer/${slug}`">{{ city }}</a>
</template>

<script>
import { replaceTranslit } from "~/service/helpers/helpers";

export default {
  name: "City",
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  computed: {
    slug() {
      // Use helper if needed, otherwise basic transliteration
      return replaceTranslit
        ? replaceTranslit(this.city)
        : this.city.toLowerCase().replace(/\s+/g, "-");
    },
  },
};
</script> --> 


<template>
  <!-- Dynamic link to city page -->
  <a :href="`/monteurzimmer/${slug}`">{{ city }}</a>
</template>

<script>
import { replaceTranslit } from "~/service/helpers/helpers";

export default {
  name: "City",
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  computed: {
    slug() {
      // Generate slug using helper if available, else fallback
      return replaceTranslit
        ? replaceTranslit(this.city)
        : this.city.toLowerCase().replace(/\s+/g, "-");
    },
  },
};
</script>
