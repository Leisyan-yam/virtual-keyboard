let arr2 = ['Backspace', 'Tab', 'CapsLock', ' ', 'Meta', 'Shift', 'Enter', '\\']

const keyboardContainer = document.createElement("div");
keyboardContainer.classList.add("main-container");
document.body.appendChild(keyboardContainer);

const inputField = document.createElement("textarea");
inputField.classList.add("input");
document.body.insertBefore(inputField, keyboardContainer)


async function getData() {  
  const keys = 'data.json';
  const res = await fetch(keys);
  const data = await res.json(); 
  console.log(data);

data.forEach(el => {
  const row = document.createElement("div");
  row.classList.add("row");
  
  el.forEach(item => {
  const char = document.createElement("div");
  char.classList.add("char");
  char.textContent = `${(item.key)}`;
  char.setAttribute('data', `${item.code}`)
  console.log(item.code)
      if (item.key === "meta") {
        char.textContent = "win";
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
}
getData();



