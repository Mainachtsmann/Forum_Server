import makeBenutzerDb from "../../controller/data/benutzerDb"
import makeBenutzer from "../../entities/benutzer"

const benutzerDb = makeBenutzerDb()

export default async function createBenutzer(benutzer) {
    const benutzerEntity = await makeBenutzer(benutzer)
    const idBenutzer = await benutzerDb.insertBenutzer(benutzerEntity)

    if (idBenutzer) {
        return idBenutzer
    }
    console.log("ERROR !!!!!!??????", idBenutzer)
    throw new Error("Unkown insertion error on Benutzer! Contact admin" + idBenutzer)
}
