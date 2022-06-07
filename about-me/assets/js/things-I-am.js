const things = [
  "Software Engineer",
  "very amatuer woodworker",
  "former bartender",
  "converted coffee snob",
  "pushover to a spoiled resue cat",
  "parnter to an amazing woman",
];

function randomizeListOrder() {
  for (i = things.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = things[i];
    things[i] = things[j];
    things[j] = k;
  }
}

let count = 0;

function cycleArray() {
  let index = count % things.length;
  document.getElementById("what-am-i").innerHTML = things[index];
  count++;
}

randomizeListOrder();
setInterval(cycleArray, 5000);
