let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");
let background = "#f0f0f0";
c.fillStyle = background;
c.fillRect(0, 0, innerWidth, innerHeight);

let circleList = [];
let totalCircles = 750;
let colors = [
  "#335c67",
  "#eee2a0",
  "#e09f3e",
  "#9e2a2b",
  "#540b0e",
  "#14156e",
  "#777",
];
// let colors = ["#999"];
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
let mouseRange = 100;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function drawCircle(x, y, r, color) {
  c.beginPath();
  c.arc(x, y, r, 0, 2 * Math.PI);
  c.fillStyle = color;
  c.fill();
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Circle {
  constructor(x, y, r, color, dx, dy, maxRadius, minRadius) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;
  }

  draw() {
    drawCircle(this.x, this.y, this.r, this.color);
  }

  update() {
    if (this.x - this.r < 0 || this.x + this.r > innerWidth) this.dx *= -1; //collsion left and right wall
    if (this.y - this.r < 0 || this.y + this.r > innerHeight) this.dy *= -1; // collision up and down wall

    if ((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2 < mouseRange ** 2) {
      if (this.r < this.maxRadius) {
        this.r += 2;
      }
    } else if (this.r > this.minRadius) {
      this.r -= 1;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

for (let i = 0; i < totalCircles; i++) {
  let radius = randomIntFromInterval(3, 15);
  let x = randomIntFromInterval(0 + radius, innerWidth - radius);
  let y = randomIntFromInterval(0 + radius, innerHeight - radius);
  let dx = (Math.random() - 0.5) * 2;
  let dy = (Math.random() - 0.5) * 2;
  let color = colors[randomIntFromInterval(0, colors.length)];
  let maxRadius = randomIntFromInterval(30, 75);
  let minRadius = randomIntFromInterval(3, 15);

  circleList.push(
    new Circle(x, y, radius, color, dx, dy, maxRadius, minRadius)
  );
}

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);
  c.fillStyle = background;
  c.fillRect(0, 0, innerWidth, innerHeight);

  for (let circle of circleList) {
    circle.update();
  }
}

animate();

// for (let i = 0; i < circleList.length; i++) {
//     circleList[i].update();
//   }
