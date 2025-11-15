// === Original JS logic (integrated & improved slightly for animations) ===
let [computer_score, user_score] = [0, 0];
let result_ref = document.getElementById("result");

let choices_object = {
    'rock' : {
        'rock' : 'draw',
        'scissor' : 'win',
        'paper' : 'lose'
    },
    'scissor' : {
        'rock' : 'lose',
        'scissor' : 'draw',
        'paper' : 'win'
    },
    'paper' : {
        'rock' : 'win',
        'scissor' : 'lose',
        'paper' : 'draw'
    }
};

// helper to show temporary animation class then remove it
function flashScore(el){
  el.classList.add('score-hit');
  setTimeout(()=> el.classList.remove('score-hit'), 380);
}

function showResultStyle(styleClass){
  result_ref.classList.remove('win-style','lose-style','draw-style','hidden');
  void result_ref.offsetWidth; // reflow so animation retriggers
  result_ref.classList.add(styleClass, 'pop-anim');
  setTimeout(()=> result_ref.classList.remove('pop-anim'), 380);
}

function checker(input){
    var choices = ["rock", "paper", "scissor"];
    var num = Math.floor(Math.random()*3);

    document.getElementById("comp_choice").innerHTML =
    `Computer choose <span> ${choices[num].toUpperCase()} </span>`;

    document.getElementById("user_choice").innerHTML =
    `You choose <span> ${input.toUpperCase()} </span>`;

    let computer_choice = choices[num];

    let outcome = choices_object[input][computer_choice];

    switch(outcome){
        case 'win':
            // YOU WIN
            result_ref.style.cssText = ""; // clear inline
            result_ref.innerHTML = "YOU WIN";
            user_score++;
            showResultStyle('win-style');
            flashScore(document.getElementById('user_score'));
            break;
        case 'lose':
            // YOU LOSE
            result_ref.style.cssText = "";
            result_ref.innerHTML = "YOU LOSE";
            computer_score++;
            showResultStyle('lose-style');
            flashScore(document.getElementById('computer_score'));
            break;
        default:
            // DRAW
            result_ref.style.cssText = "";
            result_ref.innerHTML = "DRAW";
            showResultStyle('draw-style');
            break;
    }

    // update scoreboard
    document.getElementById("computer_score").innerHTML = computer_score;
    document.getElementById("user_score").innerHTML = user_score;

    // ensure result is visible (remove hidden)
    result_ref.classList.remove('hidden');

    // remove style classes after short time so next rounds animate cleanly
    setTimeout(()=> {
      result_ref.classList.remove('win-style','lose-style','draw-style');
    }, 900);
}

// Hook up buttons to checker()
const weaponButtons = document.querySelectorAll('.weapons button');
weaponButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const choice = btn.dataset.choice;
    // small visual feedback
    btn.style.transform = 'scale(0.96)';
    setTimeout(() => btn.style.transform = '', 120);

    checker(choice);
  });
});

// Keyboard support (R,P,S) - use 's' for scissor to match naming
document.addEventListener('keydown', (e) => {
  if (['r','p','s'].includes(e.key.toLowerCase())){
    const mapping = { r:'rock', p:'paper', s:'scissor' };
    const btn = Array.from(weaponButtons).find(b => b.dataset.choice === mapping[e.key.toLowerCase()]);
    if(btn) btn.click();
  }
});

// Optional: reset on double-click on result
result_ref.addEventListener('dblclick', () => {
  computer_score = 0; user_score = 0;
  document.getElementById("computer_score").innerHTML = computer_score;
  document.getElementById("user_score").innerHTML = user_score;
  result_ref.innerHTML = "Scores reset";
  result_ref.classList.add('pop-anim');
  setTimeout(()=> result_ref.classList.remove('pop-anim'), 380);
});
