import { Router } from "express"
import createRolle from "../../use-cases/rolle/createRolle"
import deleteRolle from "../../use-cases/rolle/deleteRolle"
import listRolle from "../../use-cases/rolle/listRolle"
import { verifyToken } from "./benutzerRoutes"

const router = Router()

router.get("/", function getRollenByQuery(req, res, next) {
    const { idRolle, name } = req.query
    listRolle({ idRolle, name })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.use("/", verifyToken)
// ######################## ALL ROUTES BELOW ARE SECURED ######################## //

router.post("/", function postRolle(req, res, next) {
    const { name, kuerzel } = req.body

    createRolle({ name, kuerzel })
        .then((idRolle) => {
            console.log("Rolle commited", idRolle)
            return res.status(201).json({ idRolle })
        })
        .catch(next)
})

router.delete("/:idRolle", function deleteRolleById(req, res, next) {
    const { idRolle } = req.params
    deleteRolle(idRolle)
        .then(() => {
            return res.status(200).send()
        })
        .catch(next)
})

export default router
