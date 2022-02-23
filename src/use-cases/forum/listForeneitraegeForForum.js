import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeForeneintragDb from "../../controller/data/foreneintragDb"
const foreneintragDb = makeForeneintragDb()

export default async function listForeneintraegeForForum(idForum, limit, offset) {
    const foreneintragList = await foreneintragDb.getForeneintragListForForum(idForum, limit, offset)
    if (foreneintragList.length > 0) {
        return foreneintragList
    }
    throw new NotFoundError("Keine Foreneinträge gefunden")
}
