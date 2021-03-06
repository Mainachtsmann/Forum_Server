import makeBeitragDb from "../../controller/data/beitragDb"
import makeBeitrag from "../../entities/beitrag"

const beitragDb = makeBeitragDb()

export default async function createBeitrag(beitrag, trx) {
    const beitragEntity = makeBeitrag(beitrag)
    const idBeitrag = await beitragDb.insertBeitrag(beitragEntity, trx)
    if (idBeitrag) {
        return idBeitrag
    }
    console.log("ERROR !!!!!!??????", idBeitrag)
    throw new Error("Unkown insertion error on Beitrag! Contact admin" + idBeitrag)
}
