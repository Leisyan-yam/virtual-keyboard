let arr2 = ['Backspace', 'Tab', 'CapsLock', ' ', 'Meta', 'Shift', 'Enter', '\\']
const specials = [ "Tab", "CapsLock", "ShiftLeft", "ControlLeft", "MetaLeft", "AltLeft", "AltRight", "ControlRight", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight", "ShiftRight", "Enter", "Backspace" ]

let arr =[];


keyArr = [];

document.onkeydown = (event) => {
  console.log(event.code);
  keyArr.push(event.code);
  console.log(keyArr)
}

const keyboardContainer = document.createElement("div");
keyboardContainer.classList.add("main-container");
document.body.appendChild(keyboardContainer);

const inputField = document.createElement("textarea");
inputField.classList.add("input");
document.body.insertBefore(inputField, keyboardContainer);



async function getData() {  
  const keys = 'data.json';
  const res = await fetch(keys);
  const data = await res.json(); 

data.forEach(el => {
  const row = document.createElement("div");
  row.classList.add("row");
  
  el.forEach(item => {
  const char = document.createElement("div");
  char.classList.add("char");
  char.textContent = `${(item.key)}`;
  char.setAttribute("code", `${item.code}`)
      if (item.code === "MetaLeft") {
        char.textContent = "Win";
      }
      if (item.key === "Control") {
        char.textContent = "Ctrl";
      }
      if (item.key=== "ArrowUp") {
        char.textContent = "↑";
      }
      if (item.key === "ArrowLeft") {
        char.textContent = "←";
      }
      if (item.key === "ArrowRight") {
        char.textContent = "→";
      }
      if (item.key === "ArrowDown") {
        char.textContent = "↓";
      }
      if (item.code === "ShiftLeft") {
        char.classList.add("shift-left")
      }
      if (item.code === "ShiftRight") {
        char.classList.add("shift-right")
      }
      if (item.code === "Enter") {
        char.classList.add("enter")
      }
      if (item.code === "Backslash") {
        char.classList.add("backslash")
      }

      arr2.forEach(el => {
        if(el === item.key) {
          char.classList.add("extended")
        }
      })
      if(item.key === ' ') {
        char.classList.add("space")
      }
      keyboardContainer.appendChild(row);
      row.appendChild(char);
})})

document.onkeydown = (event) => {
  document.querySelectorAll(".char").forEach((el) => {
    el.classList.remove("active")
  })
  document.querySelector(`.char[code = ${event.code}]`).classList.add("active");
}


document.querySelectorAll(".char").forEach((el) => {
  el.addEventListener("click", () =>  {
    document.querySelectorAll(".char").forEach((item) => {
    item.classList.remove("active");
    el.classList.add("active")});
    if (!(specials.includes(el.getAttribute("code")))){
    arr.push(el.textContent);
    inputField.innerText = arr.join("")
  }
  if(el.getAttribute("code") === "Backspace") {
    arr.pop();
    inputField.innerText = arr.join("")
  }
  })
})


document.querySelector(".char[code = 'Backspace']").addEventListener("click", () => {
arr = inputField.value.split('');
console.log(arr)
arr.pop();
console.log(arr)
inputField.value= arr.join("")
})



}
getData();
