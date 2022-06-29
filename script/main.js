const apiURL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/"
let lista  //lista com todos os quiz's


const getQuizzes = async (quizId='') => {
    const response = await axios.get(`${apiURL}/${quizId}`)

    return response.data
}

const setQuizzes = async () => {
    renderQuizzes(await getQuizzes())
}


const renderQuizzes = async (quizzes) => {
    const allQuizzesContainer = document.querySelector('.all-quizzes .quizzes-container')

    lista = quizzes

    quizzes.forEach(quiz => {
        allQuizzesContainer.innerHTML += `<li data-id="${quiz.id}">${quiz.title}</li>` 

        const newQuiz = allQuizzesContainer.querySelector(':last-child')
        newQuiz.style.backgroundImage = `url(${quiz.image})`
    });

        
    const allQuizzes = allQuizzesContainer.querySelectorAll('li')
    allQuizzes.forEach(quiz => quiz.addEventListener('click', e => openQuiz(e.target)))

    console.log(quizzes)
}


const openQuiz = (e) => {
    const quizId = e.dataset.id
    let quiz;
    console.log(quizId)
    
    /* TO-DO */

    for (let i = 0; i < lista.length; i++){
        if(Number(lista[i].id) === Number(quizId)) quiz = lista[i];
    }
    
    exibirQuiz(quizId, quiz)

}

function exibirQuiz (quizId, quizObj){

    console.log(quizObj)

    document.querySelector(".home").classList.toggle("escondido")
    document.querySelector(".page02").classList.toggle("escondido")

    document.querySelector(".page02").innerHTML = 
            `
            <div class="banner-quiz">
            <img src="${quizObj.image}" alt="">
            <span>${quizObj.title}</span>
            <div></div>
            </div>

            <div class="main-containner-quiz">
            </div>

            <button class="button-home-quiz" onclick="voltarHome()">Voltar pra home</button>
            `
    for ( let i = 0; i < quizObj.questions.length; i++){
            
        let respostas = quizObj.questions[i].answers
        console.log(respostas)
        respostas = Aleatorizar(respostas)
        console.log(respostas)

            document.querySelector(".main-containner-quiz").innerHTML += 

            `
            <div class="containner-quiz">

                <div class="question-quiz">${quizObj.questions[i].title}</div> 

                <div class="question-options">
                </div>

            </div>
            `
       
        for (let z = 0; z < quizObj.questions[i].answers.length; z++ ){

            document.querySelectorAll(".question-options")[document.querySelectorAll(".question-options").length - 1].innerHTML += `
            <div class="question" onclick="foiClicado(this)">
            <img src="${quizObj.questions[i].answers[z].image}" alt="">
            <span>${quizObj.questions[i].answers[z].text}</span>
            </div>
            `
        }
    }

}
function foiClicado (e) {
    e.childNodes[1].getAttribute('src')
    e.childNodes[3].innerHTML
    /*
    if(e.childNodes[1].getAttribute('src' === "certo" && e.childNodes[3].innerHTML === "certo"){
        
    }
    */
    
}
const voltarHome = () => {
document.querySelector(".home").classList.toggle("escondido")
document.querySelector(".page02").classList.toggle("escondido")
}

function Aleatorizar(lista) {

for (let i = lista.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [lista[i], lista[j]] = [lista[j], lista[i]];
}

return lista;
}


setQuizzes()
