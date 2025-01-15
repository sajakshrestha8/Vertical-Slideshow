const container = document.getElementById("container");

const allChilds = Array.from(container.children);

// let startPosition = 0;
const offset = 300;
// let index = 0;
let currIndex = 0;

allChilds.forEach((item) => {
  item.style.position = "absolute";
  item.style.top = `${offset}px`;
});

allChilds[1].style.transform = "scale(1.2)";

function arrangedList() {
  allChilds.forEach((item, index) => {
    // console.log(currIndex);

    let correspondingIndex =
      (index - currIndex + allChilds.length) % allChilds.length;
    // console.log(correspondingIndex);

    if (correspondingIndex === 0) {
      item.style.transform = "scale(0.8)";
      item.style.top = `${-offset}px`;
      item.style.zIndex = 1;
    } else if (correspondingIndex === 1) {
      item.style.transform = "scale(1.2)";
      item.style.top = `0px`;
      item.style.zIndex = 2;
    } else if (correspondingIndex === 2) {
      item.style.transform = "scale(0.8)";
      item.style.top = `${offset}px`;
      item.style.zIndex = 1;
    } else {
      item.style.transform = "scale(0.8)";
      item.style.top = `${offset * 2}px`;
      item.style.zIndex = -1;
    }
  });
}

arrangedList();

document.addEventListener("click", () => {
  // allChilds.forEach((item) => {
  //   if (item.getBoundingClientRect().top <= -300) {
  //     item.style.zIndex = -1;
  //     item.style.top = 300 + "px";
  //   } else {
  //     item.style.top = item.getBoundingClientRect().top - 300 + "px";
  //     item.style.zIndex = 1;
  //   }
  // });
  currIndex = (currIndex + 1) % allChilds.length;
  arrangedList();
});

// allChilds[0].style.scale = 1.2;

// let startPosition = 0;
// let index = 0;
// addEventListener("click", () => {
// container.style.top = startPosition + "px";
// startPosition -= 300;

// for (let i = 0; i < allChilds.length; i++) {
//   if (index === i) {
//     allChilds[i].style.scale = 1.2;
//   } else {
//     allChilds[i].style.scale = 0.8;
//   }
// }

// index++;

// if (startPosition < -600) {
//   startPosition = 0;
//   index = 0;
// }
// });
