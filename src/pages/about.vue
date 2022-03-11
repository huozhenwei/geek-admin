
<template>
  <h1>这是关于页面</h1>
  <h1 @click="toggle">click</h1>
  <div v-if="todos.loading">loading todo!</div>
  <div v-else>{{ todos.result.title }}</div>
  <div v-if="posts.loading">loading posts!</div>
  <div v-else>{{ posts.result.body }}</div>

  <h1>你的评分是 {{ score }}</h1>
  <Rate v-model="score" >课程评分</Rate>
</template>
<script setup>
// interface PostProps {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
// }
import { ref } from 'vue'
import { useFullscreen } from '@vueuse/core'
import useURLLoader from '../utils/useURLLoader'
import Rate from '../components/Rate.vue'

const { isFullscreen, enter, exit, toggle } = useFullscreen()
const todos = useURLLoader('https://jsonplaceholder.typicode.com/todos/1')
// const posts = useURLLoader < PostProps > ('https://jsonplaceholder.typicode.com/posts/1')
const posts = useURLLoader('https://jsonplaceholder.typicode.com/posts/1')

let score = ref(3.5)
function update(num) {
  score.value = num
}
</script>