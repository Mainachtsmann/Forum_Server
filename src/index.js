import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import errorController from "./config/express/middleware/errorController"
import forumRoutes from "./controller/routes/forumRoutes"
import foreneintragRoutes from "./controller/routes/foreneintragRoutes"
import beitragRoutes from "./controller/routes/beitragRoutes"
import kategorieRoutes from "./controller/routes/kategorieRoutes"
import studiengangRoutes from "./controller/routes/studiengangRoutes"
import rolleRoutes from "./controller/routes/rolleRoutes"
import benutzerRoutes from "./controller/routes/benutzerRoutes"

const { PORT } = process.env

const server = express()
server.listen(PORT, () => {
    console.log("Forum server listening on ", PORT)
})
//Middlewares
server.use(cors({ allowedHeaders: "Content-Type", credentials: true, origin: true }))
server.use(express.json())
server.use(cookieParser())

server.use("/benutzer", benutzerRoutes)
server.use("/foren", forumRoutes)
server.use("/foreneintraege", foreneintragRoutes)
server.use("/beitraege", beitragRoutes)
server.use("/kategorien", kategorieRoutes)
server.use("/studiengaenge", studiengangRoutes)
server.use("/rollen", rolleRoutes)
server.use("/files", express.static("public"))

server.use(errorController)
