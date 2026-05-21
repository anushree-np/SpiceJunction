// Menu Data

const menuItems = [

  {
    name: "Paneer Tikka",
    price: 220,
    category: "Starters",
    description: "Grilled paneer cubes with Indian spices.",
    isVeg: true,
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name: "Chicken 65",
    price: 260,
    category: "Starters",
    description: "Crispy and spicy chicken bites.",
    isVeg: false,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name: "Butter Chicken",
    price: 320,
    category: "Main Course",
    description: "Creamy tomato chicken curry.",
    isVeg: false,
    image:
      "https://images.unsplash.com/photo-1603893662172-99ed0cea2a08?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name: "Veg Korma",
    price: 240,
    category: "Main Course",
    description: "Mixed vegetables in rich gravy.",
    isVeg: true,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name: "Hyderabadi Biryani",
    price: 350,
    category: "Biryani",
    description: "Authentic dum cooked biryani.",
    isVeg: false,
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name: "Paneer Biryani",
    price: 280,
    category: "Biryani",
    description: "Delicious paneer flavoured biryani.",
    isVeg: true,
    image:
      "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name: "Gulab Jamun",
    price: 120,
    category: "Desserts",
    description: "Soft milk dumplings in sugar syrup.",
    isVeg: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5uscY_Z_4NoYPGLbhDb2LYZmG1Boi9NV-xNHr5jnLC2_UDlMKZYmqHBgJoDSkq1TTPfoBM9WYanKRCi0JrMYrFeqFF4-qaZu2CsiXAKke&s=10"
  },

  {
    name: "Chocolate Brownie",
    price: 180,
    category: "Desserts",
    description: "Warm brownie with chocolate sauce.",
    isVeg: true,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name: "Mango Lassi",
    price: 140,
    category: "Beverages",
    description: "Refreshing mango yogurt drink.",
    isVeg: true,
    image:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name: "Cold Coffee",
    price: 160,
    category: "Beverages",
    description: "Chilled creamy cold coffee.",
    isVeg: true,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name: "Fish Fry",
    price: 300,
    category: "Starters",
    description: "Crispy fried spicy fish.",
    isVeg: false,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name: "Veg Fried Rice",
    price: 210,
    category: "Main Course",
    description: "Classic Indo-Chinese fried rice.",
    isVeg: true,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1000&auto=format&fit=crop"
  }

];


// DOM Elements

const menuContainer =
  document.getElementById("menuContainer");

const filterButtons =
  document.querySelectorAll(".filter-btn");

const cartCount =
  document.getElementById("cartCount");

const cartTotal =
  document.getElementById("cartTotal");


// Cart Data

const cart = {};


// Render Menu

function renderMenu(items){

  menuContainer.innerHTML = "";

  items.forEach((item)=>{

    const card =
      document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
        class="food-image"
      >

      <div class="card-content">

        <div class="title-row">

          <h3>${item.name}</h3>

          <div class="
            indicator
            ${item.isVeg ? "veg" : "nonveg"}
          "></div>

        </div>

        <p class="price">
          ₹${item.price}
        </p>

        <p class="description">
          ${item.description}
        </p>

        <button class="add-btn">
          Add to Cart
        </button>

      </div>

    `;

    menuContainer.appendChild(card);

    // Add To Cart

    const addButton =
      card.querySelector(".add-btn");

    addButton.addEventListener("click",()=>{

      if(cart[item.name]){

        cart[item.name].quantity += 1;

      }
      else{

        cart[item.name] = {
          price: item.price,
          quantity: 1
        };

      }

      updateCart();

      // Temporary Button Text

      addButton.innerText = "Added!";

      setTimeout(()=>{

        addButton.innerText = "Add to Cart";

      },1000);

    });

  });

}


// Update Cart

function updateCart(){

  let totalItems = 0;
  let totalAmount = 0;

  for(let item in cart){

    totalItems += cart[item].quantity;

    totalAmount +=
      cart[item].quantity *
      cart[item].price;

  }

  cartCount.innerText = totalItems;

  cartTotal.innerText = totalAmount;

}


// Filter Buttons

filterButtons.forEach((button)=>{

  button.addEventListener("click",()=>{

    document
      .querySelector(".active")
      .classList.remove("active");

    button.classList.add("active");

    const category =
      button.dataset.category;

    if(category === "All"){

      renderMenu(menuItems);

    }
    else{

      const filteredItems =
        menuItems.filter((item)=>{

          return item.category === category;

        });

      renderMenu(filteredItems);

    }

  });

});


// Initial Render

renderMenu(menuItems);