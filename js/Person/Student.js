import { Person } from "./Person.js";
export class  Student extends Person {
    constructor(name, address, id, email,type, toan, ly, hoa) {
      super(name, address, id, email,type);
      this.toan =toan;
      this.ly =ly;
      this.hoa =hoa;
      this.class = 'student';
    }
    diemTB(){
      const DTB = (Number(this.toan) + Number(this.ly) + Number(this.hoa)) / 3;
        return DTB.toFixed(1);
    }  
  }
