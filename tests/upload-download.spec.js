const ExcelJs = require('../node_modules/exceljs');
const { test, expect } = require('@playwright/test');
const path = require('path');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = readExcel(worksheet, searchText)
    const cell = worksheet.getCell(output.row, output.column + change.colChange)
    cell.value = replaceText
    await workbook.xlsx.writeFile(filePath)
}

function readExcel(worksheet, searchText) {
    let output = {
        row: 1,
        column: 1
    }
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber
                output.column = colNumber
            }
        })
    })
    return output
}
//update Mango price to 350
// writeExcelTest("Mango", "350", { rowChange: 0, colChange: 2 }, "C:/Users/Ngo Anh Thai/Downloads/exceldownloadTest.xlsx")
test('Upload download excel validation', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole("button", { name: 'Download' }).click()
    ]);
    const downloadPath = path.resolve(__dirname, 'C:/Users/Ngo Anh Thai/Downloads/', 'download.xlsx');
    await download.saveAs(downloadPath);
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, "C:/Users/Ngo Anh Thai/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/Ngo Anh Thai/Downloads/download.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({has:textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
})