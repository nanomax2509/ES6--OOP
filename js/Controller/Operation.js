import { ListPerson } from "../Person/ListPerson.js";
import { Student } from "../Person/Student.js";
import { Customer } from "../Person/Customer.js";
import { Employee } from "../Person/Employee.js";

export const dsPerson = new ListPerson();

const setLocalStorage =() =>{
  localStorage.setItem("DSPerson", JSON.stringify(dsPerson.persons));
}
export const getLocalStorage =() =>{
  var dataLocal = JSON.parse(localStorage.getItem("DSPerson"));
  if (dataLocal !== null) {
    showPerson(dataLocal);
      dsPerson.persons = dataLocal;
      console.log(dataLocal)
  }
  
  return dataLocal;
}
function xoaPerson(id){
  dsPerson.removePerson(id);
    showPerson(dsPerson.persons);
    setLocalStorage();
};
export const addPerson = ()=>{
  const id = document.getElementById('inputID').value;
  const name = document.getElementById('inputName').value;
  const address = document.getElementById('inputAddress').value;
  const email = document.getElementById('inputEmail').value;
  const type = document.getElementById('select-options').value;
  
  if(type === "student"){
    const toan = document.getElementById('student-toan').value;
    const ly = document.getElementById('student-ly').value;
    const hoa = document.getElementById('student-hoa').value;
    const student = new Student(id,name,address,email,type,Number(toan),Number(ly),Number(hoa));
    dsPerson.addPerson(student);
    setLocalStorage();
    showPerson(dsPerson);
  }
  else if(type === "employee"){
    const ngayLam = document.getElementById('employee-soNgay').value;
    const luongTheoNgay = document.getElementById('employee-luong').value;
    const employee = new Employee(id,name,address,email,type,ngayLam,luongTheoNgay);
    dsPerson.addPerson(employee);
    setLocalStorage();
    showPerson(dsPerson);

  }
  else if(type === "customer"){
    const tenCty = document.getElementById('customer-tenCty').value;
    const hoaDon = document.getElementById('customer-hoaDon').value;
    const danhGia = document.getElementById('customer-danhGia').value;
    const customer = new Customer(id,name,address,email,type,tenCty,hoaDon,danhGia);
    dsPerson.addPerson(customer);
    setLocalStorage();
    showPerson(dsPerson);

  }
}
export const showPerson = (listPerson) => {
      
  const boxPerson = document.getElementById("danhSachPerson");
  console.log("listPerson",listPerson)
  const content = listPerson.map((person) => {
    const { id, name, address, email, type } = person;
    const student = new Student(name, address, id, email, person.type, person.toan, person.ly, person.hoa);
    const diemTB = student.diemTB();

    const employee = new Employee(id, name, address, email, type, person.soNgay, person.luong);
    const tinhLuong = employee.tinhLuong();
    const customer = new Customer(id, name, address, email, type, person.tenCty, person.hoaDon, person.danhGia);

    let actionButtons = '';
    if (person.type === 'student') {
      actionButtons = `
        <td class="col-2">${diemTB}</td>          
        <td class="col-2">
          <button class="btn btn-danger pl-3 mb-2" onclick="xoaPerson('${id}')">Xóa</button>
          <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="xemThongTin('${id}')">Xem</button>
        </td>
      `;
    } else if (person.type === 'employee') {
      actionButtons = `
        <td class="col-2">${tinhLuong}</td>          
        <td class="col-2">
          <button class="btn btn-warning pl-3 mb-2" onclick="xoaPerson('${id}')">Xóa</button>
          <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="xemThongTin('${id}')">Xem</button>
        </td>
      `;
    } else if (person.type === 'customer') {
      actionButtons = `
        <td class="col-2">${person.tenCty}</td>          
        <td class="col-2">
          <button class="btn btn-warning pl-3 mb-2" onclick="xoaPerson('${id}')">Xóa</button>
          <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="xemThongTin('${id}')">Xem</button>
        </td>
      `;
    }
    return `
      <tr class="w-100">
        <th class="col-2" scope="row">${id}</th>
        <td class="col-2">${name}</td>
        <td class="col-2">${address}</td>
        <td class="col-2">${email}</td>
        <td class="col-2">${type}</td>  
        ${actionButtons}        
      </tr>
    `;
  });
  boxPerson.innerHTML = content.join("");
}
