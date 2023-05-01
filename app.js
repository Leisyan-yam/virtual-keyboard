let arr2 = ['Backspace', 'Tab', 'CapsLock', ' ', 'Meta', 'Shift', 'Enter', '\\']
const specials = [ "Tab", "CapsLock", "ShiftLeft", "ControlLeft", "MetaLeft", "AltLeft", "AltRight", "ControlRight", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight", "ShiftRight", "Enter", "Backspace" ]
const ru = [ 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.']
let arr =[];
let en = true;

keyArr = [];

// document.onkeydown = (event) => {
//   console.log(event.code);
//   keyArr.push(event.key);
//   console.log(keyArr)
// }

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
  char.setAttribute("code", `${item.code}`);
  char.setAttribute("ru", `${item.ru}`);
  char.setAttribute("en", `${item.key}`)
  char.textContent = `${(item.key)}`;
  
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


function runOnKeys() {
  let arrChars = [];                   
  document.addEventListener("keydown", function (event) {
      if (event.repeat) return;         
      arrChars.push(event.code);        
      arrChars.forEach((item) => {
      document.querySelectorAll(".char").forEach((el) => {
        if (el.getAttribute("code") === item ){
          el.classList.add("active")
        }
      })
      let key = document.querySelector(`.char[code = ${event.code}]`)
      if (!(specials.includes(key.getAttribute("code")))){
        arr.push(key.textContent);
        inputField.innerText = arr.join("");
      }
      if(key.getAttribute("code") === "Backspace") {
        arr.pop();
        inputField.innerText = arr.join("")
      }
    })    
     if((arrChars.includes("ShiftLeft", "ControlLeft")) && (arrChars.length ===  2)) {
      changeLang () 
     }
  });

  document.addEventListener("keyup", function (event) {
      if (arrChars.length == 0) return; 


      arrChars.forEach((item) => {
        document.querySelectorAll(".char").forEach((el) => {
          if (el.getAttribute("code") === item ){
            el.classList.remove("active")
          }
        })
      })
      arrChars.length = 0;              
  });
}

 runOnKeys()



document.querySelectorAll(".char").forEach((el) => {
  el.addEventListener("click", () =>  {
    document.querySelectorAll(".char").forEach((item) => {
  });
    if (!(specials.includes(el.getAttribute("code")))){
    arr.push(el.textContent);
    inputField.innerText = arr.join("")
  }
  if(el.getAttribute("code") === "Backspace") {
    arr = inputField.value.split('');
    arr.pop();
    inputField.value= arr.join("")
  }
  })
})


document.querySelector(".char[code = 'Backspace']").addEventListener("click", () => {
arr = inputField.value.split('');
arr.pop();
inputField.value= arr.join("")
})


function changeLang () {

  if (en) {
    document.querySelectorAll(".char").forEach((el) => {
      if (!(specials.includes(el.getAttribute("code")))) {
          const lang  = el.getAttribute("ru");
          el.textContent = lang
      }
    en = false
    })
  }

  else{
    document.querySelectorAll(".char").forEach((el) => {
      if (!(specials.includes(el.getAttribute("code")))) {
        const lang  = el.getAttribute("en");
        el.textContent = lang
      }
    en = true
    })
  }
}
}
getData();
