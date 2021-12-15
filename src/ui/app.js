// const { ipcRenderer } = require('electron');
const { remote } = require('electron');
const main = remote.require('./main');

const productForm = document.getElementById('productForm');

const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productsList = document.getElementById('products');

let editStatus = false;
let editProductId = '';

productForm.addEventListener( 'submit', async (e) => {
    e.preventDefault();
    // console.log('hola'
    
    const newProduct = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value
    }
    // console.log(newProduct)
    // ipcRenderer.send('products', newProduct);

    if(!editStatus){
        await main.createProduct(newProduct);
        // console.log(result);
    } else {
        await main.updateProduct(editProductId, newProduct);
        editStatus = false;
        editProductId = '';
    }
    
    
    productForm.reset();
    productName.focus();
    await getProducts();
})

const deleteProduct = async (id) => {
    const response = confirm('¿Estas seguro de querer eliminar el dato?')
    if(response){
        await main.deleteProduct(id);
        await getProducts();
    }
    return;
}

const editProduct = async (id) => {
    const product = await main.getProductById(id);
    productName.value = product.name;
    productPrice.value = product.price;
    productDescription.value = product.description;

    editStatus = true;
    editProductId = product.idproduct;

}

const renderProducts = (products) => {
    productsList.innerHTML = '';
    products.forEach( product => {
        productsList.innerHTML += `
            <div class="card card-body my-2">
                <h4>${ product.name }</h4>    
                <p>${ product.description }</p>
                <h3>${ product.price }</h3>
                <p>
                    <button class="btn btn-danger" onclick="deleteProduct('${ product.idproduct }')">
                        Delete
                    </button>
                    <button class="btn btn-primary" onclick="editProduct('${ product.idproduct }')">
                        Edit
                    </button>
                </p>
            </div>
        `;
    })
}

const getProducts = async () => {
    let results = await main.getProducts();
    renderProducts(results);
}

const init = async () => {
    await getProducts();
}

init()