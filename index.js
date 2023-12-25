//filter button



//database
var product = [{
    id: 1,
    img: 'https://media.istockphoto.com/id/1211524213/photo/cup-of-coffee-latte-isolated-on-white-background-with-clipping-path.webp?b=1&s=170667a&w=0&k=20&c=ZeCBTyCclEFJOGCkcW2EYAHGiQ6woXxviPtS8WAQWaU=',
    name: 'Latte',
    price: 35,
    description: 'Latte ipsum, dolor sit amet consectetur adipisicing elit. Soluta totam debitis voluptas corrupti. Facilis neque asperiores porro error. Vitae reiciendis autem a veniam esse totam perferendis iure vero dolorem cumque?',
    type: 'coffee'
}, {
    id: 2,
    img: 'https://media.istockphoto.com/id/1368507824/photo/chocolate-cake-with-hot-chocolate-dripping-with-fresh-strawberry-and-accompanied-by-milk.webp?b=1&s=170667a&w=0&k=20&c=QpqThdzVrjMPDCp0BdfYsn4sC1NXfZ-PmwkKxPitCew=',
    name: 'Chocolate Cake',
    price: 40,
    description: 'Chocolate Cake ipsum, dolor sit amet consectetur adipisicing elit. Soluta totam debitis voluptas corrupti. Facilis neque asperiores porro error. Vitae reiciendis autem a veniam esse totam perferendis iure vero dolorem cumque?',
    type: 'cake'
}, {
    id: 3,
    img: 'https://media.istockphoto.com/id/1421688556/photo/beef-shawarma-on-a-dark-background-shawarma-with-beef-in-pita-bread.webp?b=1&s=170667a&w=0&k=20&c=RfnUTO2hp6txl5R2bTNko4safsd4uF7MSQqML6lRwes=',
    name: 'K Bub',
    price: 50,
    description: 'K Bub ipsum, dolor sit amet consectetur adipisicing elit. Soluta totam debitis voluptas corrupti. Facilis neque asperiores porro error. Vitae reiciendis autem a veniam esse totam perferendis iure vero dolorem cumque?',
    type: 'kabub'
}];


//product card
$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div class="product ${product[i].type}">
                <img src="${product[i].img}" class="product-img" alt="">
                <p>${product[i].name} ${product[i].price} ฿</p>
                <h4>Size</h4>
                <div class="product-size">
                    <a href="#" class="style-button-1">Small</a>
                    <a href="#" class="style-button-1">Medium</a>
                    <a href="#" class="style-button-1">Large</a>
                </div>
                <div class="product-unit">
                    <a href="#" class="style-button" onclick="updateQuantity('-', ${i})">-</a>
                    <h3 class="quantity">0</h3>
                    <a href="#" class="style-button" onclick="updateQuantity('+', ${i})">+</a>
                    <a href="#" class="style-button" onclick="addToCart(${i})">Added to cart</a>
                </div>
            </div>`;
    }
    $("#productlist").html(html);
});

// ฟังก์ชั่นเพิ่มหรือลดจำนวนสินค้า
function updateQuantity(operator, index) {
    const quantityElement = document.querySelectorAll('.quantity')[index];
    let productQuantity = parseInt(quantityElement.innerText);

    if (operator === '+') {
        productQuantity++;
    } else if (operator === '-' && productQuantity > 0) {
        productQuantity--;
    }

    quantityElement.innerText = productQuantity;
}

// ฟังก์ชั่นเพิ่มลงในตะกร้า
function addToCart(index) {
    const quantity = parseInt(document.querySelectorAll('.quantity')[index].innerText);
    // ส่งค่า quantity ไปทำการเพิ่มลงในตะกร้า
    console.log('Added to cart: ' + quantity);

    // สามารถเพิ่มโค้ดเพิ่มเติมที่นี่ เช่น เรียก API เพื่อเพิ่มลงในตะกร้าจริง ๆ
}


//function การค้นหา
function searchproduct(name_Product) {
    // console.log(name_Product.id)
    var value = $('#' + name_Product.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if (product[i].name.includes(value)) {
            html += `<div class="product ${product[i].type}">
                <img src="${product[i].img}" class="product-img" alt="">
                <p>${product[i].name} ${product[i].price} ฿</p>
                <h4>Size</h4>
                <div class="product-size">
                    <a href="#" class="style-button-1">Small</a>
                    <a href="#" class="style-button-1">Medium</a>
                    <a href="#" class="style-button-1">Large</a>
                </div>
                <div class="product-unit">
                    <a href="#" class="style-button" onclick="updateQuantity('-', ${i})">-</a>
                    <h3 class="quantity">0</h3>
                    <a href="#" class="style-button" onclick="updateQuantity('+', ${i})">+</a>
                    <a href="#" class="style-button" onclick="addToCart(${i})">Added to cart</a>
                </div>
            </div>`;
        }
    }
    if (html == '') {
        $("#productlist").html(`<p>ขออภัย ไม่พบสิ้นค้า</p>`);
    } else {
        $("#productlist").html(html);
    }
}

function displayProducts(products) {
    var html = '';
    for (let i = 0; i < products.length; i++) {
        html += `<div class="product ${products[i].type}">
            <img src="${products[i].img}" class="product-img" alt="">
            <p>${products[i].name} ${products[i].price} ฿</p>
            <h4>Size</h4>
            <div class="product-size">
                <a href="#" class="style-button-1">Small</a>
                <a href="#" class="style-button-1">Medium</a>
                <a href="#" class="style-button-1">Large</a>
            </div>
            <div class="product-unit">
                <a href="#" class="style-button" onclick="updateQuantity('-', ${i})">-</a>
                <h3 class="quantity">0</h3>
                <a href="#" class="style-button" onclick="updateQuantity('+', ${i})">+</a>
                <a href="#" class="style-button" onclick="addToCart(${i})">Added to cart</a>
            </div>
        </div>`;
    }
    $("#productlist").html(html);
}

// Function to filter products
function filterProducts(filter) {
    var filteredProducts = [];

    if (filter === 'all') {
        filteredProducts = product;
    } else {
        filteredProducts = product.filter(p => p.type === filter);
    }

    displayProducts(filteredProducts);
}