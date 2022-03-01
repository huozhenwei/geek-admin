
<template>
    <h1>这是关于页面</h1>
    <h1 @click="toggle">click</h1>
    <div v-if="todos.loading">loading todo!</div>
    <div v-else>{{ todos.result.title }}</div>
    <div v-if="posts.loading">loading posts!</div>
    <div v-else>{{ posts.result.body }}</div>
</template>
<script setup>
// interface PostProps {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
// }
import { useFullscreen } from '@vueuse/core'
import useURLLoader from '../utils/useURLLoader';
const { isFullscreen, enter, exit, toggle } = useFullscreen()
const todos = useURLLoader('https://jsonplaceholder.typicode.com/todos/1')
// const posts = useURLLoader < PostProps > ('https://jsonplaceholder.typicode.com/posts/1')
const posts = useURLLoader('https://jsonplaceholder.typicode.com/posts/1')
</script>