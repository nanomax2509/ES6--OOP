export const choosePerson = () =>{
    var choose  = document.getElementById("select-options").value;
    if(choose === "student"){
        document.getElementById("student-fields").style.display = "block";
        document.getElementById("employee-fields").style.display = "none";
        document.getElementById("customer-fields").style.display = "none";
    }
    else  if(choose === "employee"){
        document.getElementById("student-fields").style.display = "none";
        document.getElementById("employee-fields").style.display = "block";
        document.getElementById("customer-fields").style.display = "none";
    }
    else if(choose === "customer"){
        document.getElementById("student-fields").style.display = "none";
        document.getElementById("employee-fields").style.display = "none";
        document.getElementById("customer-fields").style.display = "block";
    }
}
choosePerson();