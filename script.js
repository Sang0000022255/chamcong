// script.js
document.getElementById("save-data").addEventListener("click", async () => {
    const employeeId = document.getElementById("employee-id").value.trim();
    const employeeName = document.getElementById("employee-name").value.trim();
    const overtimeHours = document.getElementById("overtime-hours").value.trim();

    if (!employeeId || !overtimeHours) {
        alert("Vui lòng điền đầy đủ mã nhân viên và số giờ tăng ca!");
        return;
    }

    const rowData = {
        employeeId,
        employeeName,
        overtimeHours,
    };

    try {
        const response = await fetch("https://docs.google.com/spreadsheets/d/1myOZNfu2YG_SpheBotUbATn5Z6ZxfQ4OHmfo8_GM9Vo/edit?usp=sharing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rowData),
        });

        if (response.ok) {
            document.getElementById("status").textContent = "Lưu dữ liệu thành công!";
        } else {
            throw new Error("Lỗi khi lưu dữ liệu");
        }
    } catch (error) {
        console.error(error);
        document.getElementById("status").textContent = "Lưu dữ liệu thất bại!";
    }
});
