<template>
  <div class="backdrop" @click.self="$emit('close')">
    <div class="modal">
      <slot>default content to override</slot>
      <div class="actions">
        <slot name="links"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
  .actions {
    text-align: center;
    //margin: 30px 0 10px 0;
    color: #333;
  }
}
.backdrop {
  top: 0;
  z-index: 3;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
</style>