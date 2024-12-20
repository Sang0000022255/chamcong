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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Hàm lưu thông tin nhân viên và tăng ca vào Firebase
function saveEmployeeData() {
  const employeeId = document.getElementById("employeeId").value;
  const name = document.getElementById("name").value;
  const days = document.getElementById("days").value;
  const hours = document.getElementById("hours").value;

  // Kiểm tra các trường dữ liệu đã được điền đầy đủ chưa
  if (!employeeId || !name || !days || !hours) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  // Dữ liệu nhân viên
  const employeeData = {
    employeeId: employeeId,
    name: name
  };

  // Lưu thông tin nhân viên vào node "employees"
  firebase.database().ref('employees/' + employeeId).set(employeeData)
    .then(() => {
      console.log("Thông tin nhân viên đã được lưu!");
    })
    .catch((error) => {
      console.error("Lỗi khi lưu thông tin nhân viên:", error);
    });

  // Dữ liệu tăng ca
  const overtimeData = {
    days: parseInt(days),
    hours: parseInt(hours)
  };

  // Lưu thông tin tăng ca vào node "overtime"
  firebase.database().ref('overtime/' + employeeId).set(overtimeData)
    .then(() => {
      console.log("Thông tin tăng ca đã được lưu!");
    })
    .catch((error) => {
      console.error("Lỗi khi lưu thông tin tăng ca:", error);
    });
}
