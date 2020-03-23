let xmlRoot = '<students></students>';
let parser = new DOMParser();
var serializer = new XMLSerializer();
let xmlDoc = parser.parseFromString(xmlRoot, "text/xml");

document.addEventListener('DOMContentLoaded', (event) => {
  render();
})

document.getElementById('btnClear').addEventListener("click", () => {
  document.getElementById('ipName').value = "";
  document.getElementById('ipAddress').value = "";
});

document.getElementById('btnAdd').addEventListener("click", () => {
  let tempName = document.getElementById('ipName').value;
  let tempAddr = document.getElementById('ipAddress').value;
  if (tempName === "" || tempAddr === "") {
    var active = document.querySelector(".modal");
    active.classList.add("is-active");
  } else {
    let students = xmlDoc.getElementsByTagName("students")[0];
    let newStdRoot = xmlDoc.createElement("std");
    let newStdName = xmlDoc.createElement("name");
    newStdName.innerHTML = tempName;
    let newStdAddr = xmlDoc.createElement("address");
    newStdAddr.innerHTML = tempAddr;
    newStdRoot.appendChild(newStdName);
    newStdRoot.appendChild(newStdAddr);
    students.appendChild(newStdRoot);
    render();
    document.getElementById('ipName').value = "";
    document.getElementById('ipAddress').value = "";
  }
});

let formatAddr = (addr) => {
  let lines = addr.split(/\r?\n/);
  let final = '';
  for (let i = 0; i < lines.length-1; i++){
    if (lines[i] !== "") {
      final = final + lines[i] + '<br>';
    }
  }
  if (lines[lines.length-1] !== "") {
    final = final + lines[lines.length-1];
  }else {
    final = final.substring(0, final.length-4);
  }
  return final;
}

let render = () => {
  let students = xmlDoc.getElementsByTagName("std");
  let tableLines = '';
  for (let i = 0; i < students.length; i++){
    let tempName = students[i].getElementsByTagName('name')[0].innerHTML;
    let tempAddr = students[i].getElementsByTagName('address')[0].innerHTML;
    tempAddr = formatAddr(tempAddr);
    tableLines = tableLines + '<tr><th>' + (i+1) + '</th><td><strong>' + tempName +'</strong></td><td>' + tempAddr + '</td></tr>';
  }
  document.getElementById('tblBody').innerHTML = tableLines;
}

document.getElementsByClassName('modal-background')[0].addEventListener('click', () => {
  var active = document.querySelector(".modal");
  active.classList.remove("is-active");
})

document.getElementById('btnEdit').addEventListener('click', () => {
  var active = document.querySelector(".modal");
  active.classList.remove("is-active");
})