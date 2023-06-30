import { Person } from "./Person.js";

export class Employee extends Person {
    constructor(name, address, id, email,type, ngayLam, luongTheoNgay) {
      super(name, address, id, email,type);
      this.ngayLam = ngayLam;
      this.luongTheoNgay = luongTheoNgay;
      this.class = 'employee';

    }
    tinhLuong(){
      const luong = +this.ngayLam * +this.luongTheoNgay;
        return luong.toFixed(1);
    }
  }