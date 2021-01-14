document.addEventListener('DOMContentLoaded', () => {
    const createMonsterFormContainer = document.querySelector("#create-monster")
    const monstersContainer = document.querySelector("#monster-container")
    const backButton = document.querySelector("#back")
    const forwardButton = document.querySelector("#forward")
    let pageNumber = 1
    const monsterCountPerPage = 50
    createForm()

    fetchMonsters(monsterCountPerPage, pageNumber);
    
    forwardButton.addEventListener('click', () => {
        pageNumber++;
        monstersContainer.innerHTML = ""
        fetchMonsters(monsterCountPerPage, pageNumber);


    });
    backButton.addEventListener('click', () => {
        pageNumber--;
        monstersContainer.innerHTML = ""
        pageNumber = pageNumber <= 0 ? 1 : pageNumber 
        fetchMonsters(monsterCountPerPage, pageNumber);
    })
    createMonsterFormContainer.children[0].addEventListener('submit', (event)=>{
        const newMonster = {}
        for (const child of event.target.children) {
            if (child.type != 'submit'){
                newMonster[child.getAttribute('id')] = child.value
            }
        }
        createMonster(newMonster)
        event.preventDefault()
    }, false)
    console.log(createMonsterFormContainer.children[0])
    function createForm() {
        createMonsterFormContainer.innerHTML = `<form id=create-form action=# method=POST>
        <input id=name type=text placeholder=name...>
        <input id=age type=text placeholder=age...>
        <input id=description type=text placeholder=description...>
        <input type=submit value=Create>
        </form>`
    }

    function displayMonster(obj){
        return `<h2> ${obj.name} </h2>
        <h3> ${obj.age} </h3>
        <p> ${obj.description}</p>`
    }

    function fetchMonsters(count, pageNumber) {
        fetch(`http://localhost:3000/monsters?_limit=${count}&_page=${pageNumber}`)
        .then(resp => resp.json())
        .then(monsterObjs => {
            monsterObjs.forEach(monsterObj => {
                monstersContainer.innerHTML += displayMonster(monsterObj)
            })
    });
    } 

    function createMonster(dataObj){
        fetch("http://localhost:3000/monsters", {
            method: 'POST',
            headers: 
                    {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                    },
            body: JSON.stringify(dataObj)
            
        })
        .then(resp => resp.json())
        .then(json => console.log(json))
    }
})

