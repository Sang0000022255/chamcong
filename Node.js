const express = require("express");
const fs = require("fs");
const xlsx = require("xlsx");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/save", (req, res) => {
    const { employeeId, employeeName, overtimeHours } = req.body;

    const fileName = "overtime_data.xlsx";
    let workbook;
    let sheet;

    if (fs.existsSync(fileName)) {
        workbook = xlsx.readFile(fileName);
        sheet = workbook.Sheets["Overtime"] || workbook.Sheets[workbook.SheetNames[0]];
    } else {
        workbook = xlsx.utils.book_new();
        sheet = xlsx.utils.aoa_to_sheet([["Mã NV", "Tên NV", "Số giờ tăng ca"]]);
        xlsx.utils.book_append_sheet(workbook, sheet, "Overtime");
    }

    const newRow = [employeeId, employeeName || "N/A", overtimeHours];
    const sheetData = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    sheetData.push(newRow);

    const updatedSheet = xlsx.utils.aoa_to_sheet(sheetData);
    workbook.Sheets["Overtime"] = updatedSheet;

    xlsx.writeFile(workbook, fileName);
    res.status(200).send({ message: "Dữ liệu đã được lưu thành công" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
