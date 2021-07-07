<template>
  <div class="percentage-bar">
    <div class="min-max">
      <span>0</span>
      <span>50</span>
      <span>100</span>
    </div>
    <div class="bar" :style="cssVars"></div>
    <span class="percent">%</span>
  </div>
</template>

<script>
export default {
  props: {
    percentage: String,
  },
  computed: {
    cssVars() {
      return {
        "--percentage": `${this.percentage}%`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.percentage-bar {
  width: 100%;
  margin-top: 14px;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
}
.min-max {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
}
.bar {
  position: relative;
  width: 100%;
  height: 8px;
  overflow: hidden;

  border-radius: 4px;
  background-color: var(--color-white);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;

    border-radius: 4px;
    background-color: var(--color-yellow);

    animation: slide 1s ease-in forwards;
  }
  @keyframes slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translate3D(var(--percentage), 0, 0);
    }
  }
}
.percent {
  display: flex;
  justify-content: flex-end;
  margin-top: 2px;
}
</style>