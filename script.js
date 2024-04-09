document.addEventListener("DOMContentLoaded", function () {
    // Function to handle adding item to the cart
    var addCartButtons = document.querySelectorAll(".add-cart");
  
    addCartButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var item = this.closest(".food-menu-item");
        var itemName = item.querySelector(".food-title").textContent;
        var itemPrice = item.querySelector(".food-price").textContent;
  
        // Create a new cart item element
        var cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML =
          '<div class="cart-item-details">' +
          '<div class="cart-item-info">' +
          '<p class="cart-item-name">' +
          itemName +
          "</p>" +
          '<p class="cart-item-price">' +
          itemPrice +
          "</p>" +
          "</div>" +
          '<button class="delete-item">Delete</button>' +
          "</div>" +
          "<hr></hr>"; // Add delete button
  
        // Append the new cart item to the cart section
        document.querySelector(".cart-items").appendChild(cartItem);
  
        // Update total price
        updateTotalPrice();
      });
    });
  
    // Function to handle deleting item from the cart
    document
      .querySelector(".cart-items")
      .addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-item")) {
          event.target.closest(".cart-item").remove(); // Remove the closest cart item
          updateTotalPrice();
        }
      });
  
    // Function to update total price
    function updateTotalPrice() {
      var totalPrice = 0;
      var cartItems = document.querySelectorAll(".cart-item");
      cartItems.forEach(function (cartItem) {
        var price = parseFloat(
          cartItem
            .querySelector(".cart-item-price")
            .textContent.replace("Price: ₹ ", "")
        );
        totalPrice += price;
      });
      document.querySelector(".cart-total-price").textContent =
        "₹ " + totalPrice.toFixed(2);
    }
  });
  