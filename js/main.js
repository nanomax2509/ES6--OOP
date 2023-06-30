import { Student } from "./Person/Student.js"
import { renderForm } from "./Controller/renderForm.js";
import { ListPerson } from "./Person/ListPerson.js";
import { Employee } from "./Person/Employee.js";
import { Customer } from "./Person/Customer.js";
import { Validation } from "./Controller/validation.js";


let listPerson = new ListPerson();
let validation = new Validation();
const valid = (params) => {
  var valid = true;
  valid = validation.checkLength(params.id, 'tbID', 'Mã', 4, 6)
    & validation.checkName(params.name, 'tbName', 'Họ Tên', "error-tbName")
    & validation.checkEmail(params.email, 'tbEmail', "Email", 'error-tbEmail')
    & validation.checkRong(params.address, 'tbAddress', "Địa chỉ")
  return valid;
}
// Form chọn kiểu nhập kiểu khách hàng
document.querySelector("#type").addEventListener("change", (e) => {
  let personUser = e.target.value;
  switch (personUser) {
    case "student":
      renderForm(personUser);
      break;
    case "employee":
      renderForm(personUser);
      break;
    case "customer":
      renderForm(personUser);
      break;
    case " ":
      renderForm(personUser);
    default:
      renderForm(personUser);
  }
});

//  Thêm khách hàng vào danh sách
document.querySelector("#addPerson").addEventListener("click", () => {
  addPerson();
});
const student1 = new Student(
  "Nguyễn Văn Một",
  "HCM",
  "001",
  "nguyenmot@gmail.com",
  "student",
  "6",
  "7",
  "8"
);
listPerson.addPerson(student1);
listPerson.getLocalStorage();
listPerson.renderTable("#danhSachPerson");
//thêm người dùng
const addPerson = () => {
  const name = document.getElementById('inputName').value;
  const id = document.getElementById('inputID').value;
  const address = document.getElementById('inputAddress').value;
  const email = document.getElementById('inputEmail').value;
  const type = document.getElementById('type').value;

  if (type === 'student') {
    const toan = document.getElementById('toan').value;
    const ly = document.getElementById('ly').value;
    const hoa = document.getElementById('hoa').value;
    const student = new Student(name, address, id, email, type, toan, ly, hoa);
    let newValid = true;
    newValid = valid(student) && validation.checkNumber(student.toan, 'tbToan', 'Điểm', 0, 10) && validation.checkNumber(student.ly, 'tbLy', 'Điểm', 0, 10) && validation.checkNumber(student.hoa, 'tbHoa', 'Điểm', 0, 10);
    if (!newValid) return;
    listPerson.addPerson(student);
    listPerson.renderTable("#danhSachPerson");
    listPerson.setLocalStorage();
  }
  else if (type === 'employee') {
    const luongTheoNgay = document.getElementById('luong').value;
    const ngayLam = document.getElementById('ngayLam').value;
    const employee = new Employee(name, address, id, email, type, ngayLam, luongTheoNgay);
    let newValid = true;
    newValid = valid(employee) && validation.checkNumber1(employee.ngayLam, 'tbNgay', 'Số ngày làm', 10) && validation.checkNumber1(employee.luongTheoNgay, 'tbLuong', 'Lương', 100000)
    if (!newValid) return;
    listPerson.addPerson(employee);
    listPerson.renderTable("#danhSachPerson");
    listPerson.setLocalStorage();
  }
  else if (type === 'customer') {
    const tenCty = document.getElementById("tenCongTy").value;
    const hoaDon = document.getElementById("hoaDon").value;
    const danhGia = document.getElementById("danhGia").value;
    const customer = new Customer(name, address, id, email, type, tenCty, hoaDon, danhGia);
    let newValid = true;
    newValid = valid(customer) && validation.checkText(customer.tenCty, 'tbTenCongTy', 'Tên Công ty') && validation.checkNumber1(customer.hoaDon, 'tbHoaDon', 'Hóa đơn', 500000) && validation.checkText(customer.danhGia, 'tbDanhGia', 'Đánh Giá')
    if (!newValid) return;
    listPerson.addPerson(customer);
    listPerson.renderTable("#danhSachPerson");
    listPerson.setLocalStorage();
  }
  document.querySelector('#info-form').reset();
}

// xoá người dùng
window.xoaPerson = (id) => {
  listPerson.removePerson(id);
  listPerson.renderTable("#danhSachPerson");
  listPerson.setLocalStorage();
};
window.xemThongtin = (id) => {
  document.querySelector('#inputID').disabled = true;
  document.querySelector("#type").disabled = true;
  document.querySelector("#updatePerson").style.display = "inline";

  let info = listPerson.layThongtin(id);
  if (info) {
    switch (info.class) {
      case "student":
        renderForm(info.class);
        document.querySelector("#type").value = 'student';
        break;
      case "employee":
        renderForm(info.class);
        document.querySelector("#type").value = 'employee';
        break;
      case "customer":
        renderForm(info.class);
        document.querySelector("#type").value = 'customer';
        break;
      default:
        renderForm("");
        document.querySelector("#type").value = "";
        break;
    }
    var indexFind = listPerson.timIndex(id);
    if (indexFind > -1) {
      var personFind = listPerson.persons[indexFind]
      document.getElementById("inputID").value = personFind.id;
      document.getElementById("inputName").value = personFind.name;
      document.getElementById("inputAddress").value = personFind.address;
      document.getElementById("inputEmail").value = personFind.email;
      document.getElementById("type").value = personFind.type;
      switch (info.class) {
        case 'student':
          document.getElementById("toan").value = personFind.toan;
          document.getElementById("ly").value = personFind.ly;
          document.getElementById("hoa").value = personFind.hoa;
          break;
        case 'employee':
          document.getElementById("ngayLam").value = personFind.ngayLam;
          document.getElementById("luong").value = personFind.luongTheoNgay;
          break;
        case 'customer':
          document.getElementById("tenCongTy").value = personFind.tenCty;
          document.getElementById("hoaDon").value = personFind.hoaDon;
          document.getElementById("danhGia").value = personFind.danhGia;
          break;
        default:
      }

    }
    // let arrinput = document.querySelectorAll(".form-group input");
    // for (let input of arrinput) {
    //   let { id } = input;
    //   input.value = info[id] ? info[id] : "";
    // }
  }
};
document.querySelector('#updatePerson').onclick = () => {
  let id = document.getElementById("inputID").value;
  let personUser = document.querySelector("#type").value;
  let name = document.getElementById("inputName").value;
  let address = document.getElementById("inputAddress").value;
  let email = document.getElementById("inputEmail").value;
  let type = document.getElementById("type").value;
  switch (personUser) {
    case "student":
      {

        let toan = document.getElementById("toan").value;
        let ly = document.getElementById("ly").value;
        let hoa = document.getElementById("hoa").value;

        const student = new Student(name, address, id, email, type, toan, ly, hoa);
        const result = listPerson.capNhat(student);
        let newValid = true;
        newValid = valid(student) & validation.checkNumber(student.toan, 'tbToan', 'Điểm', 0, 10) & validation.checkNumber(student.ly, 'tbLy', 'Điểm', 0, 10) & validation.checkNumber(student.hoa, 'tbHoa', 'Điểm', 0, 10)
        if (!newValid) return;
        if (result) {
          listPerson.renderTable("#danhSachPerson");
          listPerson.setLocalStorage();
        }
      }
      break;
    case "employee":
      {

        const luongTheoNgay = document.getElementById('luong').value;
        const ngayLam = document.getElementById('ngayLam').value;

        const employee = new Employee(name, address, id, email, type, ngayLam,luongTheoNgay );
        const result = listPerson.capNhat(employee);
        let newValid = true;
        newValid = valid(employee) & validation.checkNumber1(employee.ngayLam, 'tbNgay', 'Số ngày làm', 10) & validation.checkNumber1(employee.luongTheoNgay, 'tbLuong', 'Lương', 100000)
        if (!newValid) return;
        if (result) {
          listPerson.renderTable("#danhSachPerson");
          listPerson.setLocalStorage();
        }
      }
      break;
    case "customer":
      {
        const tenCty = document.getElementById("tenCongTy").value;
        const hoaDon = document.getElementById("hoaDon").value;
        const danhGia = document.getElementById("danhGia").value;
        const customer = new Customer(name, address, id, email, type, tenCty, hoaDon, danhGia);
        const result = listPerson.capNhat(customer);
        let newValid = true;
        newValid = valid(customer) & validation.checkText(customer.tenCty, 'tbTenCongTy', 'Tên Công ty') & validation.checkNumber1(customer.hoaDon, 'tbHoaDon', 'Hóa đơn', 500000) & validation.checkText(customer.danhGia, 'tbDanhGia', 'Đánh Giá')
        if (!newValid) return;
        if (result) {
          listPerson.renderTable("#danhSachPerson");
          listPerson.setLocalStorage();
        }
      }
      break;
  }
  document.querySelector('#info-form').reset();
};
// button reset form
document.getElementById('resetPerson').addEventListener('click', () => {
  document.querySelector('#info-form').reset();
  document.querySelector('#inputID').disabled = false;
  document.querySelector("#type").disabled = false;
})
// lọc danh sách người dùng
function handleClickButton(event) {
  const user = event.target.dataset.user || ""
  const filterList = listPerson.filterUser(user);
  listPerson.renderTableUser('#danhSachPerson', filterList);

  // Thêm lớp active cho button
  event.target.classList.add('active');

  // Loại bỏ lớp active của các button khác trong cùng một nhóm
  const otherButtons = document.querySelectorAll('.nav-link[data-bs-toggle="pill"]');
  otherButtons.forEach(button => {
    if (button !== event.target) {
      button.classList.remove('active');
    }
  });
}

document.getElementById("softHome").addEventListener('click', (event) => {
  listPerson.renderTable('#danhSachPerson');
  handleClickButton(event);
});

document.querySelectorAll('.nav-link[data-user]').forEach(button => {
  button.addEventListener('click', handleClickButton);
});

// sắp xêp tăng giảm theo tên
document.querySelector('#btnTang').addEventListener('click', () => {
  document.querySelector('#btnTang').style.display = 'none';
  document.querySelector('#btnGiam').style.display = 'inline';
  listPerson.sortName(listPerson.persons, 1);
  listPerson.renderTable('#danhSachPerson');
  listPerson.setLocalStorage();
});
document.querySelector('#btnGiam').addEventListener('click', () => {
  document.querySelector('#btnGiam').style.display = 'none';
  document.querySelector('#btnTang').style.display = 'inline';
  listPerson.sortName(listPerson.persons, -1);
  listPerson.renderTable('#danhSachPerson');
  listPerson.setLocalStorage();
});