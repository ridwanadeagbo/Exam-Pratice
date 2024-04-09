const global = {
  currentPage: window.location.pathname,
  search: {
      term: '',
      type: '',
      page: 1,
  }
};





function welcome(){
  const welcome = document.querySelector('.welcome');
  const name = localStorage.getItem('fname');
  welcome.innerHTML = `<h1>Welcome ${name}, This is your English Examination</h1>`;
}

function saveName(){
  const fname = document.querySelector('.first').value;
  const lname = document.querySelector('.last-name').value;

  localStorage.setItem('fname',fname);
  localStorage.setItem('lname',lname);
}




async function getQuestions(){
 const response = await fetch('./question&answers.json')
  const data = await response.json();
  return data;
}

const ques = document.querySelector('.questions');
let count = 0;

async function putQuestions(){
  const questions = await getQuestions();
  const button = document.createElement('button');
  button.classList.add('button-style');
  button.textContent = 'Submit'
  button.addEventListener('click',check);

  questions.forEach((question)=>{
    const div = document.createElement('div');
    div.classList.add('question');
    count++;
    div.innerHTML = `
    <h1 class="que">${question.Question}</h1>
    <div class="options">
    <span><label><input type="radio" name="question${count}" value="A" class="ans">${question.A}</label></span>
    <span><label><input type="radio" name="question${count}" value="B" class="ans">${question.B}</label></span>
    <span><label><input type="radio" name="question${count}" value="C" class="ans">${question.C}</label></span>
    <span><label><input type="radio" name="question${count}" value="D" class="ans">${question.D}</label></span>
    </div>
    `
   ques.appendChild(div); 
  })
  ques.appendChild(button);
  console.log(questions);
}



const userAnswers = [];
function check() {

  
  for (let i = 1; i <= count; i++) {
    const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);

    if (selectedOption) {
      userAnswers.push({ questionNumber: i, answer: selectedOption.value });
    } else {
      alert(`Please answer question ${i}`);
      return; // Exit the function if any question is not answered
    }
  }

  console.log(userAnswers);
  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}

const frr = localStorage.getItem('userAnswers');
const word = JSON.parse(frr)


let correct = 0;
let wrong = 0 ;
function marking(){
  const rightAnswers = ['B','C','A','D','B','B','D','C','C','C','C','B'];
   
  for(let i = 0; i<10; i++){
    if(word[i].answer === rightAnswers[i]){
      // console.log( )
     
      correct++;
    } else {
      wrong++;
    } 
  }

  displayScore();
}



function displayScore(){
 const pool = document.querySelector('.score-details');
 const info = document.querySelector('.info');
 const percent = ((correct / 12)*100).toFixed(1);
 
 const fname = localStorage.getItem('fname');
 const lname = localStorage.getItem('lname');
 info.innerHTML = `
 <h2>First Name: ${fname}</h2>
 <h2>Last Name: ${lname}</h2>
 `
 pool.innerHTML = `
 <h1 class="score">${percent}%</h1>
 <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
   <div class="progress-bar" style="width: ${percent}%"></div>
 </div>
 `
}


 async function displayCorrection() {
   const questions = await getQuestions();

   questions.forEach((question)=>{
     question.innerHTML = `
       <h3>${i + 1}. ${questions[i].Question}</h3>
       <p>Your Answer: ${word[i].answer}</p>
     `;
   })
  const correction = document.querySelector('.correction');
  const rightAnswers = ['B', 'C', 'A', 'D', 'B', 'B', 'D', 'C', 'C', 'C', 'C', 'B'];
  
  correction.innerHTML = ''; // Clear previous content
  
  for (let i = 0; i < 10; i++) {
    const question = document.createElement('div');
    question.classList.add('question-correction');
    
    // Display question
    
    // Check if the user's answer is correct or wrong
    if (word[i].answer === rightAnswers[i]) {
      question.style.color = 'green'; // Correct answer
    } else {
      question.style.color = 'red'; // Wrong answer
    }
    
    correction.appendChild(question);
  }
}




function init(){
  switch (global.currentPage){
    case '/':
      case '/login.html':
        saveName();
        break;
        case '/Exam.html':
          welcome();
          putQuestions();
          break;
          
          case '/result.html':
        marking();
        displayCorrection();
      break
    }
  
  }
    
  init();