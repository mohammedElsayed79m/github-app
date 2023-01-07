function getRepoName(){
    let repoName = window.location.search.split("=")[1]
    console.log(repoName)

    if(repoName){
        getIssues(repoName)
    }
}
getRepoName()


function getIssues(repoName){
    let url = "https://api.github.com/repos/" + repoName + "/issues" 

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        drawIssues(data)
    })
    .catch(err=>console.log(err))
    .finally(console.log("operation is done"))

}


function drawIssues(data){

    data.forEach(element => {

        document.querySelector("#repos").innerHTML += 

        ` <a href='${element.html_url}'>

        <span>${element.title}</span>
         </a>
    `
    });
    }


