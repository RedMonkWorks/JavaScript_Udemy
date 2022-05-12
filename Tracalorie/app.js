// Storage Controller

// Item Controller
const MealCtrl = (function () {
  // Item Contructor
  const Meal = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    meals: [
      { id: 0, name: "Steak Dinner", calories: 1200 },
      { id: 1, name: "Cookies", calories: 400 },
      { id: 2, name: "Eggs", calories: 600 },
    ],
    currentMeal: null,
    totalCalories: 0,
  };

  return {
    getMeals: function () {
      return data.meals;
    },

    addMeal: function (name, calories) {
      let ID;
      // Create ID
      if (data.meals.length > 0) {
        ID = data.meals[data.meals.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new meal
      const newMeal = new Meal(ID, name, calories);

      data.meals.push(newMeal);

      return newMeal;
    },

    getMealById: function (id) {
      let found = null;

      data.meals.forEach((meal) => {
        if (meal.id === id) {
          found = meal;
        }
      });

      return found;
    },

    updateMeal: (name, calories) => {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.meals.forEach((meal) => {
        if (meal.id === data.currentMeal.id) {
          meal.name = name;
          meal.calories = calories;
          found = meal;
        }
      });

      return found;
    },

    deleteMeal: (mealID) => {
      // Get ID
      let ids = data.meals.map((meal) => {
        return meal.id;
      });

      const index = ids.indexOf(mealID);

      data.meals.splice(index, 1);
    },

    clearAllMeals: () => {
      data.meals = [];
    },

    setCurrentMeal: (meal) => {
      data.currentMeal = meal;
    },

    getCurrentMeal: () => {
      return data.currentMeal;
    },

    getTotalCalories: function () {
      let total = 0;

      data.meals.forEach((meal) => {
        total += meal.calories;
      });

      data.totalCalories = total;

      return data.totalCalories;
    },

    logData: function () {
      return data;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    clearBtn: ".clear-btn",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    mealNameInput: "#item-name",
    mealCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };

  return {
    populateMealsList: function (meals) {
      let html = ``;

      meals.forEach((meal) => {
        html += `
        <li class="collection-item" id="item-${meal.id}">
          <strong>${meal.name}: </strong> <em>${meal.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>`;
      });

      // Insert List items
      document.querySelector(UISelectors.itemList).innerHTML = html;

      // Update Total Calories
      const totalCalories = MealCtrl.getTotalCalories();
      document.querySelector(UISelectors.totalCalories).innerHTML =
        totalCalories;
    },

    getMealInput: function () {
      return {
        name: document.querySelector(UISelectors.mealNameInput).value,
        calories: document.querySelector(UISelectors.mealCaloriesInput).value,
      };
    },

    addListMeal: function (meal) {
      // Show list
      document.querySelector(UISelectors.itemList).style.display = "block";

      const li = document.createElement("li");
      li.className = "collection-item";
      // Add props
      li.id = `item-${meal.id}`;
      // Add Html
      li.innerHTML = `
        <strong>${meal.name}: </strong> <em>${meal.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;
      // Insert element
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);

      // Update Total Calories
      const totalCalories = MealCtrl.getTotalCalories();
      document.querySelector(UISelectors.totalCalories).innerHTML =
        totalCalories;
    },

    updateListMeal: (meal) => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list to array
      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${meal.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
            <strong>${meal.name}: </strong> <em>${meal.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          `;

          // Update Total Calories
          const totalCalories = MealCtrl.getTotalCalories();
          document.querySelector(UISelectors.totalCalories).innerHTML =
            totalCalories;
        }
      });
    },

    deleteListMeal: (id) => {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();

      // Update Total Calories
      const totalCalories = MealCtrl.getTotalCalories();
      document.querySelector(UISelectors.totalCalories).innerHTML =
        totalCalories;
    },

    removeMeals: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list to array
      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        listItem.remove();
      });

      // Update Total Calories
      const totalCalories = MealCtrl.getTotalCalories();
      document.querySelector(UISelectors.totalCalories).innerHTML =
        totalCalories;
    },

    clearInput: function () {
      // Clear Input
      const input = this.getMealInput();
      document.querySelector(UISelectors.mealNameInput).value = "";
      document.querySelector(UISelectors.mealCaloriesInput).value = "";
      input.calories.value = "";
    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },

    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },

    addMealToForm: () => {
      document.querySelector(UISelectors.mealNameInput).value =
        MealCtrl.getCurrentMeal().name;
      document.querySelector(UISelectors.mealCaloriesInput).value =
        MealCtrl.getCurrentMeal().calories;

      UICtrl.showEditState();
    },

    getSelectors: function () {
      return UISelectors;
    },
  };
})();

// App Controller
const AppCtrl = (function (MealCtrl, UICtrl) {
  // Load event listners
  const loadEventListners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Disable submit on pressing enter
    document.addEventListener("keypress", (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", addMealSubmit);

    // Edit icon Clicking
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", updateMealClick);

    // Update Btn Click / submit
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", updateMealSubmit);

    // Delete Btn Click / submit
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", deleteMealSubmit);

    // Back Btn Click / submit
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", () => {
        UICtrl.clearEditState();
      });

    // Navbar Clear all Btn Click / submit
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", () => {
        clearAllMealsClick();
      });
  };

  // Add meal submit
  const addMealSubmit = function (e) {
    const input = UICtrl.getMealInput();

    if (input.name !== "" || input.calories !== "") {
      // Add to Data Structure
      const newMeal = MealCtrl.addMeal(input.name, input.calories);

      // Add to UI
      UICtrl.addListMeal(newMeal);

      // Clear Inputs
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Edit Btn Click
  const updateMealClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      // Get list tem id
      const listID = e.target.parentNode.parentNode.id;

      const id = parseInt(listID.split("-")[1]);

      // Get item
      const mealToEdit = MealCtrl.getMealById(id);

      // Set current meal in data structure
      MealCtrl.setCurrentMeal(mealToEdit);

      // Add meal to form fields
      UICtrl.addMealToForm();
    }

    e.preventDefault();
  };

  // Update btn submit
  const updateMealSubmit = (e) => {
    const input = UICtrl.getMealInput();

    const updatedMeal = MealCtrl.updateMeal(input.name, input.calories);

    UICtrl.updateListMeal(updatedMeal);

    UICtrl.clearEditState();

    console.log("updated");

    e.preventDefault();
  };

  // Delete btn submit
  const deleteMealSubmit = (e) => {
    const currentMeal = MealCtrl.getCurrentMeal();

    MealCtrl.deleteMeal(currentMeal.id);

    UICtrl.deleteListMeal(currentMeal.id);

    UICtrl.clearEditState();

    console.log("deleted");
  };

  // Clear all items
  const clearAllMealsClick = (e) => {
    // Delete all meals from data
    MealCtrl.clearAllMeals();

    UICtrl.removeMeals();

    UICtrl.hideList();
  };

  return {
    init: function () {
      // Clear init state
      UICtrl.clearEditState();

      // Fetch Items from Data Structure
      const meals = MealCtrl.getMeals();

      // Check if any items
      if (meals.length === 0) {
        UICtrl.hideList();
      } else {
        // populate list with meals
        UICtrl.populateMealsList(meals);
      }

      // Call eventlistners
      loadEventListners();
    },
  };
})(MealCtrl, UICtrl);

// Initialize App
AppCtrl.init();
