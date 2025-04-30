// pages/mdviewer/[name].js
import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

export async function getServerSideProps({ params }) {
  const { name } = params
  const filePath = path.join(process.cwd(), 'public', 'MD', `${name}.md`)
  const fileContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, 'utf-8')
    : '# 404\n找不到该 Markdown 文件。'

  const html = marked.parse(fileContent)
  return { props: { html } }
}

export default function MdPage({ html }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
