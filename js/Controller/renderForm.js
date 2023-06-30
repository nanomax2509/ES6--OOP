export const renderForm= (type = "student")=>{
    let htmlString;
    switch (type) {
      case "student":
        htmlString = `
      <div class="form-group ">
        <div class="input-group">
          
          <input type="number" id="toan" class="form-control input-sm" placeholder="Điểm toán">
          <span class="text-success m-auto px-2" id="error-tbToan"></span>
        </div>
        <span class="sp-thongbao" id="tbToan"></span>
      </div>
      <div class="form-group">
        <div class="input-group">
          
          <input type="number" id="ly" class="form-control input-sm" placeholder="Điểm lý">
          <span class="text-success m-auto px-2" id="error-tbLy"></span>
        </div>
        <span class="sp-thongbao" id="tbLy"></span>
      </div>
      <div class="form-group">
        <div class="input-group">
          
          <input type="number" name="hoa" id="hoa" class="form-control input-sm" placeholder="Điểm hóa">
          <span class="text-success m-auto px-2" id="error-tbHoa"></span>
        </div>
        <span class="sp-thongbao" id="tbHoa"></span>
      </div>
      `;
        break;

      case "employee":
        htmlString = `
          <div class="form-group">
            <div class="input-group">
              <input type="text" id="luong" class="form-control input-sm" placeholder="Lương theo ngày">
              <span class="text-success m-auto px-2" id="error-tbluong"></span>
            </div>
              <span class="sp-thongbao" id="tbLuong"></span>
          </div>
          <div class="form-group">
            <div class="input-group">
            <input type="text" id="ngayLam" class="form-control input-sm" placeholder="Ngày làm ">
              <span class="text-success m-auto px-2" id="error-tbNgay"></span>
            </div>
            <span class="sp-thongbao" id="tbNgay"></span>
          </div>`;
        break;

      case "customer":
        htmlString =`<div class="form-group ">
        <div class="input-group ">
        <input type="text" id="tenCongTy" class="form-control input-sm" placeholder="Tên Công ty">
        <span class="text-success m-auto px-2" id="error-tbGioLam"></span>
      </div>
        </div>
        <span class="sp-thongbao mb-2" id="tbTenCongTy"></span>
    </div>

    <div class="form-group ">
        <div class="input-group ">
        <input type="text"  id="hoaDon" class="form-control input-sm" placeholder="Trị giá hóa đơn">
        <span class="text-success m-auto px-2" id="error-tbGioLam"></span>
      </div>
        </div>
        <span class="sp-thongbao mb-2" id="tbHoaDon"></span>
    </div>

    <div class="form-group ">
        <div class="input-group">
        <input type="text"  id="danhGia" class="form-control input-sm" placeholder="Đánh giá">
        <span class="text-success m-auto px-2" id="error-tbGioLam"></span>
      </div>
        </div>
        <span class="sp-thongbao mb-2" id="tbDanhGia"></span>
    </div>
    `;
        break;
        case " ":
        htmlString = `
      `;
        break;
    }
    document.querySelector("#bodyform").innerHTML = htmlString;
  }
  