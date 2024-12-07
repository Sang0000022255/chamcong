// Import các hàm cần thiết từ Firebase SDK v9+
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase Configuration (thay bằng thông tin của bạn)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaTrs5w-JiEAxhBnpjLM0lofRFy1MhoVM",
  authDomain: "m-cong.firebaseapp.com",
  databaseURL: "https://m-cong-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "m-cong",
  storageBucket: "m-cong.firebasestorage.app",
  messagingSenderId: "485241829938",
  appId: "1:485241829938:web:d18a7fd68a9d6238939a2b",
  measurementId: "G-YXQKLKH0Z4"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Tìm kiếm nhân viên
function searchEmployee() {
  const employeeId = document.getElementById("employeeId").value;
  if (employeeId.trim() === "") {
    alert("Vui lòng nhập mã nhân viên!");
    return;
  }
  document.getElementById("inputSection").style.display = "block";
}

// Lưu thông tin tăng ca
function saveOvertime() {
  const employeeId = document.getElementById("employeeId").value;
  const days = document.getElementById("days").value;
  const hours = document.getElementById("hours").value;

  if (days === "" || hours === "") {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  const overtimeData = {
    employeeId,
    days: parseInt(days),
    hours: parseInt(hours)
  };

  // Lưu dữ liệu vào Firebase
  const overtimeRef = ref(database, 'overtime/' + employeeId); // Đối tượng lưu trữ theo ID nhân viên
  set(overtimeRef, overtimeData)
    .then(() => {
      alert("Lưu thành công!");
      addRowToTable(overtimeData);
    })
    .catch((error) => {
      console.error("Lỗi khi lưu dữ liệu:", error);
    });
}

// Thêm hàng vào bảng
function addRowToTable(data) {
  const tableBody = document.getElementById("tableBody");
  const row = tableBody.insertRow();

  row.insertCell(0).innerText = data.employeeId;
  row.insertCell(1).innerText = data.days;
  row.insertCell(2).innerText = data.hours;
}
