import { promises as fs } from 'fs'
import { v4 as uuidv4 } from 'uuid'


//Clase ProductManager con todos los metodos que se necesita
export class ProductManager {
    constructor(){
        this.path = './src/products.json'
        this.products = []
    }

    //Agregar un producto
    addProduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
        const id = uuidv4()

        let newProduct = { id,title, description, price, thumbnail, code, stock, status, category }

        this.products = await this.getProducts()
        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct
    }

    //Obtener los productos
    getProducts = async () => {
        const response = await fs.readFile(this.path, 'utf8')
        const responseJSON = JSON.parse(response)
        return responseJSON
    }

    //Obtener un producto en especifico
    getProductById = async (id) => {
        const response = await this.getProducts()

        const product = response.find(product => product.id === id)

        if(product) {
            return product
        } else {
            console.log('Producto no encontrado')
        }
    }

    //Actualizar un  producto en especifico
    updateProduct =  async (id, {...data}) => {
        const response = await this.getProducts()

        const index = response.findIndex(product => product.id === id)

        if(index !== -1){
            response[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(response))
            return response[index]
        } else {
            console.log('Producto no encontrado')
        }
    }

    //Eliminar un producto en especifico
    deleteProduct = async (id) => {
        const products = await this.getProducts()
        const index = products.findIndex(product=> product.id === id)

        if(index !== -1) {
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
        } else {
            console.log('Producto no encontrado')
        }
    }
}