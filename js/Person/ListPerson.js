import { Student } from "./Student.js";
import { Employee } from "./Employee.js";
import { Customer } from "./Customer.js";


export class ListPerson {
  constructor() {
    this.persons = [];
  };
  setLocalStorage() {
    localStorage.setItem("DSPerson", JSON.stringify(this.persons));
  }
  getLocalStorage() {
    if (localStorage.getItem("DSPerson")) {
      this.persons = JSON.parse(localStorage.getItem("DSPerson"));
    }
  }
  renderTable(selectorTbody) {
    let htmlString = "";
    let string = "";
    for (let user of this.persons) {
      switch (user.class) {
        case "student":
          var person = new Student();
          Object.assign(person, user);
          string = `Tổng Điểm : ${person.diemTB()}`;
          break;
        case "employee":
          var person = new Employee();
          Object.assign(person, user);
          string = `Tổng Lương : ${person.tinhLuong()}`;
          break;
        case "customer":
          var person = new Customer();
          Object.assign(person, user);
          string = `Tên Công Ty: ${person.tenCty} <br/>
          Hóa đơn: ${person.hoaDon} <br/>
          Đánh giá: ${person.danhGia}`;
          break;
      }

      htmlString += `<thead >
          <tr>
            <th>${user.id}</th>
            <th>${user.name}</th>
            <th>${user.address}</th>
            <th>${user.email}</th>
            <th>${string}</th>									
            <th><button class="btn btn-success"   data-toggle="modal"
            data-target="#myModal" onclick="xemThongtin('${user.id}')">Xem</button> 
            <button class="btn btn-danger" onclick="xoaPerson('${user.id}')">Xoá</button>
            </th>
          </tr>
          </thead>`;
    }
    document.querySelector(selectorTbody).innerHTML = htmlString;
    return htmlString;
  }
  renderTableUser(selectorTbody, list) {
    let htmlString = "";
    let string = "";
    for (let user of list) {
      switch (user.class) {
        case "student":
          var person = new Student();
          Object.assign(person, user);
          string = `Tổng Điểm : ${person.diemTB()}`;
          break;
        case "employee":
          var person = new Employee();
          Object.assign(person, user);
          string = `Tổng Lương : ${person.tinhLuong()}`;
          break;
        case "customer":
          var person = new Customer();
          Object.assign(person, user);
          string = `Tên Công Ty: ${person.tenCongTy} <br/>
          Hóa đơn: ${person.hoaDon} <br/>
          Đánh giá: ${person.danhGia}`; ;
          break;
      }

      htmlString += `<thead >
          <tr>
            <th>${user.id}</th>
            <th>${user.name}</th>
            <th>${user.email}</th>
            <th>${user.address}</th>
            <th>${string}</th>									
            <th><button class=" btn btn-success"  data-toggle="modal"
            data-target="#myModal" onclick="xemThongtin('${user.id}')">Xem</button> 
            <button class="btn btn-danger" onclick="xoaPerson('${user.id}')">Xoá</button>
            </th>
          </tr>
          </thead>`;
    }
    document.querySelector(selectorTbody).innerHTML = htmlString;
    return htmlString;
  }
  addPerson = (person) => {
    this.persons.push(person);
  };
  // findIndex = (id) => {
  //   return this.persons.findIndex((person) => person.id === id);
  // };
  timIndex(idXoa) {
    return this.persons.findIndex((person) => person.id === idXoa);
  };
  removePerson(idXoa) {
    const indexDel = this.timIndex(idXoa);
    if (indexDel !== -1) {
      this.persons.splice(indexDel, 1);
    }
  };
  layThongtin(id) {
    let edit = this.persons.find(user => {
      return user.id === id;
    });
    return edit;
  }
  capNhat(person) {
    let indexFind = this.timIndex(person.id);

    if (indexFind > -1) {
      this.persons[indexFind] = person;
      return true;
    } else {
      return false;
    }
  }
  filterUser(type) {
    if (type) {
      let filterList = this.persons.filter((user) => {
        return user.class === type;
      });
      return filterList;
    } else {
      return this.persons;
    }
  }
  sortName(list, number) {
    console.log(number)
    if (number === 1) {
      list.sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
    } else {
      list.sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) { return 1; }
        if (x > y) { return -1; }
        return 0;
      });
    }
    return list;
  }
  getAllPersons() {
    return this.persons;
  }
}
