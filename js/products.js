//Obtengo el div de los botones
const divButtons = document.getElementById("buttonsProductsDiv")
const show = document.getElementById("showProducts");

function showProducts() {
    if(localStorage.length > 0){
        const div = document.createElement("div");
        div.setAttribute("id", "divProducts")
        div.innerHTML = "<h2>Productos</h2>";
        document.body.append(div);
    }
    for (let i = 0; i < localStorage.length; i++) {
        var p = document.createElement("p");
        var content = document.createTextNode(localStorage.getItem(i + 1));
        document.getElementById("divProducts").append(content);
    }
    document.body.append(div);

}

function hideProducts(){
    document.body.removeChild();
}
