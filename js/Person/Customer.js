import { Person } from "./Person.js";

export class Customer extends Person {
    constructor(name, address, id, email,type, tenCty, hoaDon, danhGia) {
      super(name, address, id, email,type);
      this.tenCty = tenCty;
      this.hoaDon = hoaDon;
      this.danhGia = danhGia;
      this.class = 'customer';

    }
  }