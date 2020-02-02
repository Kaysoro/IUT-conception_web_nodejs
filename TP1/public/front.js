var elem = document.querySelector('.tabs');
var options = {}
var instance = M.Tabs.init(elem, options);

async function callAddServer() {
    console.log("coucou");
    let title = document.querySelector("#title").value;
    let priority = document.querySelector("#priority").value;
    console.log(title + ", " + priority);
    let response = await fetch(`/addAsync?title=${title}&priority=${priority}`);
    let data = await response.json()
    // Décommentez ce code pour mieux comprendre les promesses ! La log "au revoir" va s'afficher 2s après l'appel.
    //await sleep(2000); 
    return data;
}

function add(){
    callAddServer().then(data => {
        console.log("au revoir");
        M.toast({html: 'Votre ticket a bien été pris en compte!',classes: 'green'})
        document.querySelector("#title").value = "";
        document.querySelector("#priority").value ="";

        // Possible, mais pas très propre.

        document.querySelector("#tickets tbody tr:last-child").insertAdjacentHTML('afterend', "<tr>"
            + "<td>" + data.id + "</td>" 
            + "<td>" + data.title + "</td>" 
            + "<td>" + data.priority + "</td>"
            + "<td><a href='/ticket/" + data.id + "' class='waves-effect waves-light btn blue blueen-4'><i class='material-icons'>description</i></a></td>"
            + "<td><a href='/ticket/delete/" + data.id + "' class='waves-effect waves-light btn red darken-4'><i class='material-icons'>delete_forever</i></a></td>"
            + "</tr>");
    });
    console.log("çava?")
    return true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}