//Clase Product
class Product {

    //Funcion constructora de la clase Product 
    constructor(name, description, price, url) {
        this.id = generateId()
        this.name = name;
        this.description = description;
        this.price = price;
        this.urlImg = url;
    }

    //Funcion para agregar IVA al producto (21%)
    calculateIva() {
        return this.price + (this.price * 21) / 100;
    }
}

//Arrow function que genera un id unico e incremental para cada producto.
const generateId = (() => (id = 1, () => id++))();

const arrayProducts = [
    new Product("Idraet Breast Volume 95+", "TRATAMIENTO VOLUMINIZADOR IDRAET BREAST VOLUME 95+.", 3000.00, "./images/breastvolume95.png"),
    new Product("Gel Flat Abs", "Gel acuoso de rápida absorción, formulado para reducción de adiposidad abdominal.", 2000.00, "./images/gel_flat_abs.png"),
    new Product("Alpine Roses Mask", "Máscara reparadora y calmante. Revitaliza y regenera la piel mejorando su elasticidad y suavidad.", 2000.00, "./images/mask_alpineroses.png"),
    new Product("Serum PersonalTrainer", "Imita los efectos del ejercicio físico, reafirmando brazos, piernas y abdomen.", 4700.00, "./images/serum_personaltrainer.png"),
    new Product("Celulitis Cellu Control", "Quema grasa almacenada y reduce Celulitis, mejora la elasticidad y firmeza de la piel.", 2600.00, "./images/caps_cellucontrol.png")
];


//Funcion que toma dos argumentos, crea un producto y lo retorna.
function createProduct(name, desc, price) {
    return new Product(name, desc, price);
}

//Funcion que compra y elimina un producto de la lista de stock. Devuelve true si se compro y false si no.
function buyProductById(id) {
    p = findById(id);
    indexProd = arrayProducts.indexOf(p);
    if (arrayProducts.includes(p)) {
        arrayProducts.splice(indexProd, indexProd + 1);
        return true;
    }
    return false;
}

//Funcion para buscar productos por id. Devuelve un solo objeto ya que el id es unico e incremental.
function findById(idFind) {
    for (let i = 0; i < arrayProducts.length; i++) {
        if (arrayProducts[i].id == idFind) return arrayProducts[i];
    }
    return "Not found";
}

//Funcion para buscar productos por nombre. Esta funcion es diferente a buscar por id ya que pueden haber varios productos con el mismo nombre.
function findByName(n) {
    var products = [];
    for (let i = 0; i < arrayProducts.length; i++) {
        if (arrayProducts[i].name == n) products.push(arrayProducts[i]);
    }
    return products;
}

//Funciones que ordenan de mayor a menor precio y viceversa.Cada funcion retorna la lista ordenada;
function sortHighest() {
    return arrayProducts.sort(function (a, b) { return b.price - a.price });
}
function sortLowest() {
    return arrayProducts.sort(function (a, b) { return a.price - b.price });
}

//Funcion para validar el input del nombre del producto. (que la la longitud del nombre sea como minimo 3).
function inputNameValidation(inputName) {
    return (inputName.length > 2);
}

//Funcion para validar que el precio del producto sea mayor a 5$
function inputPriceValidation(inputPrice) {
    return (inputPrice > 5);
}

//Metodo para printear un parrafo rojo que nos indica que la longitud del nombre es muy corta.
function printShortNameValidation() {
    const divNameForm = document.getElementById("divName")
    let p = document.createElement("p");
    p.setAttribute("id", "pNameForm");
    p.innerHTML = "The name product is too short"
    divNameForm.append(p);
}

//Metodo para printear un parrafo rojo que nos indica que el precio debe ser mayor a 5.
function printLowPriceValidation() {
    const divPriceForm = document.getElementById("divPrice")
    let p = document.createElement("p");
    p.setAttribute("id", "pPriceForm");
    p.innerHTML = "The price product must be greather than '5'."
    divPriceForm.append(p);
}


//Funcion que se ejecuta cada vez que se toca el boton submit, guarda los datos de un producto, contiene varias validaciones y retorna un producto nuevo.
function submitResponse() {
    var nameForm = document.getElementById("nameProduct").value;
    var descForm = document.getElementById("descProduct").value;
    var priceForm = parseFloat(document.getElementById("priceProduct").value);
    return new Product(nameForm, descForm, priceForm);
}

//Funcion que se ejecuta cuando se cambia el input que se refiere al nombre del producto.
function eventInputNameForm() {
    const pName = document.getElementById("pNameForm")
    const inputNameForm = document.getElementById("nameProduct").value;
    if (!inputNameValidation(inputNameForm) && pName == null) printShortNameValidation();
    else if (inputNameValidation(inputNameForm) && pName != null) pName.remove()
}

function eventInputPriceForm() {
    const pPrice = document.getElementById("pPriceForm")
    const inputPriceForm = document.getElementById("priceProduct").value
    if (!inputPriceValidation(inputPriceForm) && pPrice == null) printLowPriceValidation()
    else if (inputPriceValidation(inputPriceForm) && pPrice != null) pPrice.remove()
}

//Evento listener que escucha cada vez que el submit se toca, usamos funcion submitResponse().
// const form = document.getElementById("form");

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     var nameForm = document.getElementById("nameProduct").value;
//     var priceForm = parseFloat(document.getElementById("priceProduct").value);
//     if (inputNameValidation(nameForm) && inputPriceValidation(priceForm)) {
//         arrayProducts.push(submitResponse())
//         if (document.getElementById("divValidation")!= null)document.getElementById("divValidation").remove()
//     }
//     else {
//         if (document.getElementById("divValidation") == null) {
//             const divValidation = document.createElement("div")
//             divValidation.setAttribute("id", "divValidation")
//             divValidation.innerHTML = "<p>Name or price product are incorrect</p>"
//             document.getElementById("form").append(divValidation)
//         }
//     }
// })

//Evento que escucha los cambios en el input que se refiere al nombre del producto.
// const inputNameForm = document.getElementById("nameProduct")

// inputNameForm.addEventListener("change", (e) => {
//     eventInputNameForm();
// });

//Evento que se ejecuta cuando se recarga la pagina.
document.addEventListener('DOMContentLoaded', () => {
    printProducts()

})

//Evento que escucha los cambios en el input del precio.
// const inputPriceForm = document.getElementById("priceProduct")

// inputPriceForm.addEventListener("change", (e) => {
//     eventInputPriceForm();
// });

//Obtengo el div de los botones
const show = document.getElementById("showProducts")
const hide = document.getElementById("hideProducts")

//Evento click que muestra los productos solo si los productos no se mostraron anteriormente
show.addEventListener("click", (e) => {
    showProducts()
})

//Evento para eliminar los productos del dom
hide.addEventListener("click", (e) => {
    hideProducts()
})

//Funcion para printear productos
function printProducts() {
    for (let i = 0; i < arrayProducts.length; i++) {
        if (i == 0) {
            const div = document.createElement("div");
            div.setAttribute("id", "divProducts")
            div.setAttribute("class", "container")
            div.innerHTML = "<h2 id='h2Products'>Products</h2>";
            const products = document.createElement("div")
            products.setAttribute("id", "products")
            products.setAttribute("class", "container-fluid")
            div.append(products)
            document.getElementById("divContainerIndex").append(div)
        }
        const idProduct = arrayProducts[i].id
        const nameProduct = arrayProducts[i].name
        const descProduct = arrayProducts[i].description
        const priceProduct = arrayProducts[i].price
        const urlImg = arrayProducts[i].urlImg

        const appendProduct = document.createElement("div")
        appendProduct.setAttribute("id", "product" + idProduct)
        appendProduct.innerHTML = `<h4 class='nameProduct'>${nameProduct}</h4>
                                   <img class='imgProduct' src='${urlImg}'>
                                   <p>Description: ${descProduct}</p>
                                   <p>Price: $${priceProduct}</p>
                                   <button id='${idProduct}' class='addToCart btn btn-light' type='button'>Add to Cart</button>`
        document.getElementById("products").append(appendProduct)



    }
    addEventsCartButtons()

    const divButtonsForCart = document.createElement("div")
    divButtonsForCart.setAttribute("id", "buttonsForCart")
    divButtonsForCart.innerHTML = `<button type='button' class='btn btn-primary' id='buyButton'>Buy</button>
                                <button type='button' class='btn btn-danger' id='deleteAllButton'>Delete All</button>`

    document.getElementById("divProducts").append(divButtonsForCart)
    eventBuyButton()
    eventDeleteAllButton()
}

function eventDeleteAllButton() {
    document.getElementById("deleteAllButton").addEventListener("click", () => {
        if (localStorage.length == 0) {
            Swal.fire({
                icon: "error",
                title: "The cart are cleared",
                text: "You dont have a products in your cart"

            })
        } else {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You are going to eliminate all products of the cart!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete all products!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear()
                    swalWithBootstrapButtons.fire(
                        'All products deleted!',
                        'Your cart has been cleared.',
                        'success'
                    )
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your cart has not been cleared',
                        'error'
                    )
                }
            })
        }
    })
}

function eventBuyButton() {
    const buyButton = document.getElementById("buyButton")

    buyButton.addEventListener("click", () => {
        if (localStorage.length == 0) {
            Swal.fire({
                title: 'Error!',
                text: 'Yo need to add any product for buy',
                icon: 'error',
            })
        }
        else {
            let timerInterval
            Swal.fire({
                title: 'Auto close alert!',
                html: 'Wait... <b></b> .',
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    Swal.fire({
                        icon: "success",
                        text: "Buy successful"
                    })
                    localStorage.clear()
                    window.location.reload()
                }
            })
        }
    })
}


//Funcion que se ejecuta cuando se aprieta el boton "SHOW PRODUCTS". Muestra todos los productos del arraylist
function showProducts() {
    if (document.getElementById("divProducts") == null) {
        printProducts()
    }
}

//Funcion que se ejecuta cuando se aprieta el boton "HIDE PRODUCTS"
function hideProducts() {
    if (document.getElementById("divProducts") != null) document.getElementById("divProducts").remove()
}


function addEventsCartButtons() {
    //Eventos para cada uno de los botonees (add to cart).Agrega un producto al carrito (localstorage)
    const addToCartButtons = document.getElementsByClassName("addToCart")

    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", (e) => {
            const idProduct = e.target.id
            const product = findById(idProduct)

            if (localStorage.getItem(idProduct) == null) {
                localStorage.setItem(idProduct, JSON.stringify(product))

                const deletAnyProduct = document.createElement("div")
                deletAnyProduct.innerHTML = `<button id='delete${idProduct}' class='deleteProductButton btn btn-danger'>Delete</button>`
                document.getElementById("product" + idProduct).append(deletAnyProduct)

                document.getElementById("delete" + idProduct).addEventListener("click", () => {
                    localStorage.removeItem(idProduct)
                    deletAnyProduct.remove()
                })
            }

        })
    }
}






