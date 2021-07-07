<template>
  <div class="error">
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.error {
  position: relative;
  @extend %flex-center;
  padding: 20px;
  color: var(--color-white);
  border: 2px solid var(--color-red);
  &:before {
    content: "!";
    position: absolute;
    @extend %flex-center;
    width: 32px;
    height: 32px;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 30px;
    background: var(--color-red);
  }
}
</style>