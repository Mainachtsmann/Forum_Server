import dbConnection from "./dbConnection"

function convertBenutzerRowToEntity(benutzerRow) {
    return {
        idBenutzer: benutzerRow.id_benutzer,
        idStudiengang: benutzerRow.id_studiengang,
        vorname: benutzerRow.vorname,
        nachname: benutzerRow.nachname,
        passwort: benutzerRow.passwort, //TODO hmmmmm?
        email: benutzerRow.email,
        bildPfad: benutzerRow.bild_pfad,
        statusAktiv: benutzerRow.status_aktiv,
    }
}

function convertEntityToBenutzerRow(benutzerEntity) {
    return {
        id_benutzer: benutzerEntity.idBenutzer,
        id_studiengang: benutzerEntity.idStudiengang,
        vorname: benutzerEntity.vorname,
        nachname: benutzerEntity.nachname,
        passwort: benutzerEntity.passwort,
        email: benutzerEntity.email,
        bild_pfad: benutzerEntity.bildPfad,
        status_aktiv: benutzerEntity.statusAktiv,
    }
}

export default function makeBenutzerDb() {
    function insertBenutzer(benutzer) {
        const benutzerRow = convertEntityToBenutzerRow(benutzer)
        console.log("Insert User:", { ...benutzerRow, passwort: "***" })
        return dbConnection.insert(benutzerRow).into("benutzer")
    }

    //Get ForumList by ParentId
    function getBenutzerList() {
        return dbConnection("benutzer").then((benutzerList) => benutzerList.map((benutzerRow) => convertBenutzerRowToEntity(benutzerRow)))
    }

    function getBenutzerById(idBenutzer) {
        return dbConnection("benutzer")
            .where("id_benutzer", idBenutzer)
            .then((benutzerList) => (benutzerList[0] ? convertBenutzerRowToEntity(benutzerList[0]) : null))
    }

    function deleteBenutzerById(idBenutzer) {
        return dbConnection("benutzer").where("id_benutzer", idBenutzer).del()
    }

    return { insertBenutzer, getBenutzerList, getBenutzerById, deleteBenutzerById }
}