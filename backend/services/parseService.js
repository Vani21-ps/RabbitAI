const xlsx = require("xlsx")

module.exports = async (filePath) => {

 const workbook = xlsx.readFile(filePath)

 const sheet = workbook.Sheets[workbook.SheetNames[0]]

 const data = xlsx.utils.sheet_to_json(sheet)

 return JSON.stringify(data.slice(0, 15))
}