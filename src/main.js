const { BrowserWindow, Notification } = require('electron');
const { getConnection } = require('./database');

const createProduct = async (product) => {
    try {
        const conn = await getConnection();
        parseFloat(product.price);
        // esto es asincrono
        const result = await conn.query('INSERT INTO product SET ?', product);
        // console.log(result);
        new Notification({
            title: 'Electron MySql',
            body: 'New Product Save Successfully'
        }).show();

        product.id = result.insertId;
        return product;

    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (id) => {
    const conn = await getConnection();
    await conn.query('DELETE FROM product WHERE idproduct = ?', id)
    // console.log(result);
}

const getProducts = async () => {
    const conn = await getConnection();
    const results = await conn.query('SELECT * FROM product ORDER BY idproduct DESC');
    // console.log(results);
    return results;
}

const updateProduct = async (id, product) => {
    try {
        const conn = await getConnection();
        await conn.query('UPDATE product SET ? WHERE idproduct = ?', [product, id])
        // console.log(result);
    } catch (error) {
        console.log(error)
    }
}

const getProductById = async (id) => {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM product WHERE idproduct = ?', id)
    // console.log(result);
    return result[0];
}

let window;

const createWindow = () => {
    window = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            // configurar asi y dara
            nodeIntegration: true,
            contextIsolation: false, // agregar esto para https://es.stackoverflow.com/questions/432445/electron-uncaught-referenceerror-require-is-not-defined
            nodeIntegrationInWorker: true,
            enableRemoteModule: true, 
        }
    })
    window.loadFile('src/ui/index.html');
}

/* ipcMain.on('products',(e, args) => {
    console.log(args);
}) */

module.exports = {
    createWindow,
    createProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct
}