import env from './config/env'
import { setupApp } from './config/app'

const server = async () => {
    const app = await setupApp()
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
}

server()