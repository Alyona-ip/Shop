//ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА

let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard']
let PRICES = [100, 120, 1000, 15, 18]
let IDS = [0, 1, 2, 3, 4]

//let products = [] //массив объектов

let catalog = {
    items: [],
    container: '.products',
    construct () {
        this._init () //_ - это обозначение инкапсулированного метода
    },
    _init () {
        this._handleData ()
        this.render ()
    },
    _handleData () {
        for (let i = 0; i < IDS.length; i++) {
            this.items.push (this._createNewProduct (i))
        }
    },
    _createNewProduct (index) {
        return {
            product_name: PRODUCTS_NAMES [index],
            price: PRICES [index],
            product_id: IDS [index]
        }
    },
    render () {
        let str = ''
        this.items.forEach (item => {
            str += `
                <div class="product">
                    <img src="https://placehold.it/225x215">
                    <span class="product_name">${item.product_name}</span>
                    <span class="product_price">${item.price}</span>
                    <button class="product_button">Купить</button>
                </div>
            `
        })
        document.querySelector(this.container).innerHTML = str
    }
}

let cart = {
    items: [],
    container: '.cart_items',
    total: 0,
    sum: 0,
    construct () {
        this._init () 
    },
    _init () {
        this.render ()
    },
    addProduct (product) {
        let id = product
        //нарушение инкапсуляции (Вообще так не делаем, но пока делаем)
        let prod = catalog._createNewProduct (product)
        
        let find = this.items.find (product => product.product_id === id)
        if (find) {
            find.quantity++
        } else {
            prod.quantity = 1
            this.items.push (prod)
        }
        
        this._checkTotal ()
        this.calculateSum ()
        // cart.items.push (Object.assign ({}, find, {quantity: 1}))
    },
    deleteProduct (product) {
        let id = product
        let prod = catalog._createNewProduct (product)
        
        let find = this.items.find (product => product.product_id === id)
        if (find.quantity > 1 ) {
            find.quantity--
        } else {
            this.items.pop (prod)
        }
        
        this._checkTotal ()
        this.calculateSum ()
    },
    calculateSum () {
        this.sum = 0
        let i = this.items.length
        let index = 0
        while( i > 0) {
            this.sum += this.items[index].price * this.items[index].quantity
            index++
            i--
        }
    },
    _checkTotal () {
       this.total = 0
        let index = 0
        while (index < this.items.length) {
            this.total += this.items[index].quantity
            index++
        }
    },
    render () {
        let str = ''
        this.items.forEach (item => {
            str += `
                <div class="cart_item">
                    <img class="cart_item_img"src="https://placehold.it/65x55">
                    <div class="cart_item_text">
                        <span class="cart_item_name">${item.product_name}</span>
                        <span class="cart_item_txt">Цена: ${item.price}</span>
                        <span class="cart_item_txt">Кол-во: ${item.quantity}</span>
                    </div>
                </div>
            `
        })
        str += `
        <div class="cart_total">
            <span class="cart_total_txt">Общее кол-во: ${this.total}</span>
            <span class="cart_total_txt">Итого: ${this.sum}</span>
        </div>
    `
        document.querySelector(this.container).innerHTML = str
    }
}
catalog.construct () //тут происходит создание объекта и вся прочая магия
cart.construct()
