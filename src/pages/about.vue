
<template>
  <h1>这是关于页面</h1>
  <h1 @click="toggle">click</h1>
  <div v-if="todos.loading">loading todo!</div>
  <div v-else>{{ todos.result.title }}</div>
  <div v-if="posts.loading">loading posts!</div>
  <div v-else>{{ posts.result.body }}</div>

  <h1>你的评分是 {{ score }}</h1>
  <Rate v-model="score">课程评分</Rate>

  <Heading :level="3">hello geekbang</Heading>
</template>
<script setup lang="ts">
// interface PostProps {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
// }
// import { ref } from 'vue'
import { computed, reactive, ref } from '@vue/runtime-core'
import { useFullscreen } from '@vueuse/core'
import useURLLoader from '../utils/useURLLoader'
import Rate from '../components/Rate.vue'

import Heading from '../components/Heading.jsx'

const { isFullscreen, enter, exit, toggle } = useFullscreen()
const todos = useURLLoader('https://jsonplaceholder.typicode.com/todos/1')
// const posts = useURLLoader < PostProps > ('https://jsonplaceholder.typicode.com/posts/1')
const posts = useURLLoader('https://jsonplaceholder.typicode.com/posts/1')

let score = ref(3.5)
function update(num) {
  score.value = num
}

interface 极客时间课程 {
  name: string
  price: number
}

const msg = ref('') //  根据输入参数推导字符串类型
const msg1 = ref<string>('') //  可以通过范型显示约束
const obj = reactive({})
const course = reactive<极客时间课程>({ name: '玩转vue3全家桶', price: 89 })

const msg2 = computed(() => '') // 默认参数推导
const course2 = computed<极客时间课程>(() => {
  return { name: '玩转vue3全家桶', price: 89 }
})
</script>