<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>

    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="todo in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }"> {{ todo.title }}</span>
          <span class="remove-btn" @click="removeTodo($event, i)">❌</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选
      <input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>

    <span class="dustbin">🗑</span>
    <div class="animate-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="animate" v-show="animate.show">📋</div>
      </transition>
    </div>

    <h1 @click="add">{{ count }}</h1>
  </div>

  <transition name="modal">
    <div class="info-wrapper" v-if="showModal">
      <div class="info">哥，你啥也没输入!</div>
    </div>
  </transition>
</template>

<script>
function useStorage(name, value = []) {
  let data = ref(JSON.parse(localStorage.getItem(name)) || value)
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value))
  })
  return data
}
function useTodos() {
  let showModal = ref(false)
  let title = ref('')
  let todos = useStorage('todos', [])

  function addTodo() {
    if (!title.value) {
      showModal.value = true
      setTimeout(() => {
        showModal.value = false
      }, 1500)
      return
    }
    todos.value.push({
      title: title.value,
      done: false
    })
    title.value = ''
  }

  function clear() {
    todos.value = todos.value.filter((v) => !v.done)
  }
  let active = computed(() => {
    return todos.value.filter((v) => !v.done).length
  })
  let all = computed(() => todos.value.length)
  let allDone = computed({
    get: function () {
      return active.value === 0
    },
    set: function (value) {
      todos.value.forEach((todo) => {
        todo.done = value
      })
    }
  })

  let animate = reactive({
    show: false,
    el: null
  })
  function beforeEnter(el) {
    let dom = animate.el
    let rect = dom.getBoundingClientRect()
    let x = window.innerWidth - rect.left - 60
    let y = rect.top - 10
    el.style.transform = `translate(-${x}px, ${y}px)`
  }
  function enter(el, done) {
    document.body.offsetHeight
    el.style.transform = `translate(0,0)`
    el.addEventListener('transitionend', done)
  }
  function afterEnter(el) {
    animate.show = false
    el.style.display = 'none'
  }

  function removeTodo(e, i) {
    animate.el = e.target
    animate.show = true
    todos.value.splice(i, 1)
  }
  return {
    title,
    todos,
    addTodo,
    clear,
    active,
    all,
    allDone,
    showModal,
    removeTodo,
    animate,
    beforeEnter,
    enter,
    afterEnter
  }
}
</script>
<script setup>
import { ref, computed, watchEffect, reactive} from 'vue'

let count = ref(1)
let color = ref('red')

function add() {
  count.value++
  color.value = Math.random() > 0.5 ? 'blue' : 'red'
}

let {
  title,
  todos,
  addTodo,
  clear,
  active,
  all,
  allDone,
  showModal,
  removeTodo,
  animate,
  beforeEnter,
  enter,
  afterEnter
} = useTodos()
</script>

<style scoped>
h1 {
  color: v-bind(color);
}
.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
}
.info {
  padding: 20px;
  color: white;
  background: #d88986;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-enter-active {
  transition: all 0.3s ease;
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-leave-active {
  transition: all 0.3s ease;
}

.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  transition: all 0.5s linear;
}
</style>>