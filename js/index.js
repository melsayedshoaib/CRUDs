var productName = document.getElementById("productName");

var productPrice = document.getElementById("productPrice");

var productModel = document.getElementById("productModel");

var productDescription = document.getElementById("productDescription");

var prodcutList;

var addProductBtn = document.getElementById("addProductBtn");

var updateProductBtn = document.getElementById("updateProductBtn");

if (localStorage.getItem("productList") == null) {
  prodcutList = [];
} else {
  prodcutList = JSON.parse(localStorage.getItem("productList"));
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
  localStorage.setItem("productList", JSON.stringify(prodcutList));
  clearForm();
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
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productModel.value = "";
  productDescription.value = "";
}

function getUpdatedProduct(index) {
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.replace("d-none", "d-block");
  productName.value = prodcutList[index].name;
  productPrice.value = prodcutList[index].price;
  productModel.value = prodcutList[index].model;
  productDescription.value = prodcutList[index].description;
}

function deleteProduct(index) {
  prodcutList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(prodcutList));
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
