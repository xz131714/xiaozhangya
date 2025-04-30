<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const htmlContent = ref('<p>加载中...</p>')

onMounted(async () => {
  const name = route.params.name
  const res = await fetch(`/MD/${encodeURIComponent(name)}.md`)
  if (res.ok) {
    const markdown = await res.text()
    htmlContent.value = marked.parse(markdown)
  } else {
    htmlContent.value = '<h1>404</h1><p>找不到该 Markdown 文件。</p>'
  }
})
</script>

<template>
  <div style="padding: 2rem; max-width: 800px; margin: auto;">
    <div v-html="htmlContent" />
  </div>
</template>
