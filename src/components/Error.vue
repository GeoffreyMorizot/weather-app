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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: var(--color-white);
  border: 2px solid var(--color-red);
  &:before {
    content: "!";
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
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