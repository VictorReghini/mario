const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");

const score = document.getElementById("score");
const restart = document.getElementById("restart");

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 1000);
};

function scoreCountFunction() {
  score.innerHTML = +score.innerHTML + 1;
}

function loopFunction() {
  const cloudsPosition = clouds.offsetLeft;
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.classList.remove("pipe-run");
    pipe.style.left = `${pipePosition}px`;

    clouds.classList.remove("clouds-run");
    clouds.style.left = `${cloudsPosition}px`;

    mario.style.bottom = `${marioPosition}px`;
    mario.src = "./images/game-over.png";
    mario.classList.remove("jump");
    mario.classList.remove("mario");
    mario.classList.add("game-over");

    clearInterval(loop);
    clearInterval(scoreCount);
  }
}

const scoreCount = setInterval(scoreCountFunction, 2000);
const loop = setInterval(loopFunction, 10);

const resetGame = () => {
  pipe.removeAttribute("style");
  pipe.classList.add("pipe-run");

  clouds.removeAttribute("style");
  clouds.classList.add("clouds-run");

  mario.removeAttribute("style");
  mario.src = "./images/mario.gif";
  mario.classList.remove("game-over");
  mario.classList.add("mario");

  score.innerHTML = 0;
  clearInterval(loop);
  clearInterval(scoreCount);
  loop = setInterval(loopFunction, 10);
  scoreCount = setInterval(scoreCountFunction, 2000);
};

document.addEventListener("keydown", jump);
restart.addEventListener("click", resetGame);
