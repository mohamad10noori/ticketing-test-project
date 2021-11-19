<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h3>{{ title }}</h3>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.backdrop {
  position:fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, .3);
  z-index: 10;
}

dialog {
  min-width: 30%;
  max-width: 50%;
  position: fixed;
  top: 50%;
  bottom: 50%;
text-align: center;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  padding: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #42b983;
  color: white;
  width: 100%;
  padding: 1rem;
}
header{
   padding:  1rem 0;
}
header h3 {
  margin:0
 
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: center;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

</style>