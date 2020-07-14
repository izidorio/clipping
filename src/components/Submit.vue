<template>
  <b-overlay
    :show="busy"
    rounded
    opacity="0.6"
    spinner-small
    spinner-variant="primary"
    class="d-inline-block float-right"
  >
    <b-button type="submit" class="px-5">Salvar</b-button>
  </b-overlay>
</template>

<script>
export default {
  props: {
    busy: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
