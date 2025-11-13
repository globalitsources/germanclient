<template lang="">



  <div class="structed-content">
    <div
      class="structed-content__wrapper"
      v-for="(row_element, row_index) in structure.rows.length"
      :key="row_index"
    >
      <div
        class="structed-content__item"
        v-for="(column_element, column_index) in structure.rows[row_index]
          .columns.length"
        :key="column_index"
      >
        {{ columnWidths[column_index] }}
        <div
          :class="`qqq frame frame-${layout} frame-type-${type} frame-layout-${frameClass} frame-space-before-${spaceBefore} frame-space-after-${spaceAfter}`"
        >
		
          <t3-renderer :content="structure.rows[row_index]?.columns[column_index]?.elements"/>
		
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "T3CeStructuredContent",
  props: {
    structure: {
      type: Object,
    },
    appearance: {
      type: Object,
    },
    type: {
      type: String,
    },
  },

  data() {
    return {
      columnWidth: Math.floor(12 / this.structure.rows[0].columns.length),
      layout: this.appearance.layout,
      frameClass: this.appearance.frameClass,
      spaceBefore: this.appearance.spaceBefore,
      spaceAfter: this.appearance.spaceAfter,
      columnWidths: [],
    };
  },
};
</script>
