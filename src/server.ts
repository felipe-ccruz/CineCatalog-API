import { app } from './app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🎬 Server running at http://localhost:${PORT}`)
  console.log(`📚 Docs at http://localhost:${PORT}/docs`)
  console.log(`💾 MinIO Console at http://localhost:9001/login`)
  
})