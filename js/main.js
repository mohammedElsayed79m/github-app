let form = document.getElementById("form")

let formInput = document.getElementById("user-input")

let languages = document.querySelector(".languages")


form.addEventListener("submit" , getReposUser)

languages.addEventListener("click" , handleClick)

function handleClick(e){
    let lang = e.target.dataset.lang
    let url = `https://api.github.com/search/repositories?q=${lang}`

    fetch(url).then(res=>res.json())
    .then(data=>{
        console.log(data)
        drowReposLang(data , lang)
    })
    .catch(()=>{
        document.querySelector(".search-item").innerHTML = "No Results"

    })
    .finally(console.log("opration is dane"))
}

function getReposUser(e){
    
    e.preventDefault()
    
    let user = formInput.value

    if(user){
        document.querySelector("#repos").innerHTML = ""
        getDataUser(user)
    }else{
        alert("enter data")
    }
}

function getDataUser(user){

    let url = `https://api.github.com/users/${user}/repos`

    fetch(url).then(res=>res.json())
    .then(data=>{
        console.log(data)
        drowReposUser(data , user)
    })
    .catch(err=>{
        console.log(err)
        document.querySelector(".search-item").innerHTML = "No Results"

    })
    .finally(console.log("opration is dane"))
}

function drowReposUser(data , searchItem){

    if(data.length === 0){

    document.querySelector(".search-item").classList.add("show")

    document.querySelector(".search-item").innerHTML = "No Results"

    }else{

    document.querySelector(".search-item").innerHTML = searchItem 

    document.querySelector(".search-item").classList.add("show")

    
    data.forEach(element => {
        let repo = element.owner.login +"/" + element.name

        document.querySelector("#repos").innerHTML += 

        ` <a href="./repo.html?repo=${repo}" class="repo-item">

        <span>${element.owner.login}/${element.full_name}</span>

        <span>${element.open_issues_count > 0 ?'<i class="fa fa-times"></i>':'<i class="fa fa-check-square"></i>'}</span>
         </a>
    `
    });
    }
    
}

function drowReposLang(data , lang){

    if(data.length === 0){

        document.querySelector(".search-item").classList.add("show")

        document.querySelector(".search-item").innerHTML = "No Results"
        
        }else{

        document.querySelector(".search-item").innerHTML = lang 

        document.querySelector(".search-item").classList.add("show")

        document.querySelector("#repos").innerHTML = ""

        data.items.forEach(element => {
            let repo = element.owner.login +"/" + element.name

            document.querySelector("#repos").innerHTML += 

            ` <a href="./repo.html?repo=${repo}" class="repo-item">

            <span>${element.owner.login}/${element.name}</span>

            <span>${element.open_issues_count > 0 ?'<i class="fa fa-times"></i>':'<i class="fa fa-check-square"></i>'}</span>
             </a>
        `
        });
        }
}