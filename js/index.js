var productName = document.getElementById("productName");

var productPrice = document.getElementById("productPrice");

var productModel = document.getElementById("productModel");

var productDescription = document.getElementById("productDescription");

var prodcutList;

var addProductBtn = document.getElementById("addProductBtn");

var updateProductBtn = document.getElementById("updateProductBtn");

var productListName = "productList";

if (localStorage.getItem(productListName) == null) {
  prodcutList = [];
} else {
  prodcutList = JSON.parse(localStorage.getItem(productListName));
  displayProduct(prodcutList);
}

function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
    model: productModel.value,
  };
  prodcutList.push(product);
  displayProduct(prodcutList);
  localStorage.setItem(productListName, JSON.stringify(prodcutList));
  updateFormValue();
}

function displayProduct(products) {
  var cartona = ``;
  for (var i = 0; i < products.length; i++) {
    cartona += `<tr>
                    <td>${i + 1}</td>
                    <td>${
                      products[i].newName
                        ? products[i].newName
                        : products[i].name
                    }</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].model}</td>
                    <td>${products[i].description}</td>
                    <td>
                        <button onclick="getUpdatedProduct(${i})" class="btn btn-warning btn-sm">Update</button>
                    </td>
                    <td>
                        <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>`;
  }
  document.getElementById("tBody").innerHTML = cartona;
}
function updateFormValue(flag) {
  productName.value = flag ? flag.name : "";
  productPrice.value = flag ? flag.price : "";
  productModel.value = flag ? flag.model : "";
  productDescription.value = flag ? flag.description : "";
}

function getUpdatedProduct(index) {
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.replace("d-none", "d-block");
  updateFormValue(prodcutList[index]);
}

function deleteProduct(index) {
  prodcutList.splice(index, 1);
  localStorage.setItem(productListName, JSON.stringify(prodcutList));
  displayProduct(prodcutList);
}

function updateProduct() {
  addProductBtn.classList.replace("d-none", "d-block");
  updateProductBtn.classList.replace("d-block", "d-none");
}

function searchByName(term) {
  var foundedItems = [];
  for (var i = 0; i < prodcutList.length; i++) {
    if (
      prodcutList[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      prodcutList[i].newName = prodcutList[i].name
        .toLowerCase()
        .replace(
          term,
          `<span class="text-danger">${term.toLowerCase()}</span>`
        );
      foundedItems.push(prodcutList[i]);
    }
  }
  displayProduct(foundedItems);
}
