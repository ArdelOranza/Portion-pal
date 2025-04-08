document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const meatForm = document.getElementById('meatForm');
    const portionSizeSelect = document.getElementById('portionSize');
    const customPortionGroup = document.getElementById('customPortionGroup');
    const customPortionInput = document.getElementById('customPortion');
    const customPortionError = document.getElementById('customPortionError');
    const meatTypeSelect = document.getElementById('meatType');
    const meatWeightInput = document.getElementById('meatWeight');
    const meatWeightError = document.getElementById('meatWeightError');
    const calculateBtn = document.getElementById('calculateBtn');

    // Results Area
    const resultsWrapper = document.getElementById('resultsWrapper');
    const resultPlaceholder = document.getElementById('resultPlaceholder');
    const resultList = document.getElementById('resultList');

    // Recipe Area
    const suggestionCardsContainer = document.getElementById('suggestionCards');
    const recipePlaceholder = document.getElementById('recipePlaceholder'); // General placeholder text
    const recipeSuggestionsSection = document.getElementById('recipes'); // Section to scroll to


    // --- Data ---
    // Portion sizes remain the same
    const portionSizes = { small: 100, medium: 150, large: 200 };

    // Recommendations - Slightly more detailed
    const recommendationsData = {
       pork: { cooking: "Roast, Grill, Pan-fry", time: "≈25m / 500g Roast", seasoning: "Garlic, Soy, Pepper, Paprika" },
       chicken: { cooking: "Roast, Grill, Stew", time: "≈20m / 500g Roast", seasoning: "Lemon, Herbs, Garlic, Onion" },
       beef: { cooking: "Grill, Stew, Roast", time: "≈18m / 500g Grill (Med)", seasoning: "Salt, Pepper, Rosemary, Garlic" },
       fish: { cooking: "Bake, Pan-fry, Steam", time: "≈10-15m / 500g Bake", seasoning: "Lemon, Dill, Parsley, White Wine" },
       lamb: { cooking: "Roast, Grill, Slow-cook", time: "≈25m / 500g Roast", seasoning: "Rosemary, Garlic, Mint, Cumin" }
    };

    // Recipes - Added description, image placeholder URL, and simplified difficulty tag
    const recipesData = {
        pork: [
            { name: "Classic Pork Adobo", time: "45 mins", difficulty: "Easy", icon: "fa-solid fa-pepper-hot", desc: "A savory and tangy Filipino staple, slow-braised to perfection.", img: "https://images.unsplash.com/photo-1606078553491-5a9a4f4954f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { name: "Crispy Lechon Kawali", time: "60 mins", difficulty: "Medium", icon: "fa-solid fa-bacon", desc: "Deep-fried pork belly with incredibly crunchy skin and tender meat.", img: "https://images.unsplash.com/photo-1589841189894-76f0093a50ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { name: "Pork Sinigang", time: "50 mins", difficulty: "Easy", icon: "fa-solid fa-bowl-food", desc: "A comforting sour and savory tamarind broth with pork and vegetables.", img: "https://images.unsplash.com/photo-1598511809546-e109b3688e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
        ],
        chicken: [
            { name: "Comforting Chicken Tinola", time: "40 mins", difficulty: "Easy", icon: "fa-solid fa-drumstick-bite", desc: "A clear, gingery chicken soup with green papaya and chili leaves.", img: "https://images.unsplash.com/photo-1604909052399-f4a3b76c410c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { name: "Grilled Chicken Inasal", time: "60 mins", difficulty: "Medium", icon: "fa-solid fa-fire", desc: "Smoky grilled chicken marinated in vinegar, calamansi, lemongrass, and achiote oil.", img: "https://images.unsplash.com/photo-1598511809546-e109b3688e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }, // Re-use image if needed
            { name: "Creamy Pininyahang Manok", time: "45 mins", difficulty: "Easy", icon: "fa-solid fa-lemon", desc: "Chicken stewed in a rich, creamy pineapple sauce with bell peppers.", img: "https://images.unsplash.com/photo-1606078553491-5a9a4f4954f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" } // Re-use image if needed
        ],
        beef: [
            { name: "Rich Beef Kaldereta", time: "90 mins", difficulty: "Medium", icon: "fa-solid fa-spoon", desc: "Hearty beef stew simmered in tomato sauce with potatoes, carrots, and olives.", img: "https://images.unsplash.com/photo-1551028150-64b9f398f678?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { name: "Savory Beef Mechado", time: "75 mins", difficulty: "Medium", icon: "fa-solid fa-carrot", desc: "Tender beef braised in soy sauce and calamansi, enriched with tomato sauce.", img: "https://plus.unsplash.com/premium_photo-1670430438142-cc610fa8c61c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { name: "Filipino Beef Tapa", time: "Overnight Marinate", difficulty: "Easy", icon: "fa-solid fa-egg", desc: "Thinly sliced cured beef, pan-fried until caramelized, perfect with garlic rice.", img: "https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
        ],
         fish: [
            { name: "Tangy Sinigang na Isda", time: "30 mins", difficulty: "Easy", icon: "fa-solid fa-fish-fins", desc: "A light and sour fish soup using tamarind broth and various vegetables.", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { name: "Simple Paksiw na Isda", time: "35 mins", difficulty: "Easy", icon: "fa-solid fa-fish", desc: "Fish simmered gently in vinegar, garlic, ginger, and peppercorns.", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { name: "Refreshing Fish Kinilaw", time: "20 mins", difficulty: "Easy", icon: "fa-regular fa-lemon", desc: "Filipino ceviche where fresh fish is 'cooked' in vinegar or citrus juice.", img: "https://images.unsplash.com/photo-1559742811-82287ace5363?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
        ],
        lamb: [
            { name: "Hearty Lamb Caldereta", time: "100 mins", difficulty: "Hard", icon: "fa-solid fa-pepper-hot", desc: "A rich, spicy lamb stew similar to beef caldereta, slow-cooked until tender.", img: "https://images.unsplash.com/photo-1604011940196-83bba6a3c497?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { name: "Aromatic Lamb Adobo", time: "70 mins", difficulty: "Medium", icon: "fa-solid fa-leaf", desc: "Lamb braised in the classic adobo sauce of soy, vinegar, garlic, and spices.", img: "https://images.unsplash.com/photo-1598511809546-e109b3688e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }, // Re-use
            { name: "Spiced Lamb Shank Curry", time: "120 mins", difficulty: "Medium", icon: "fa-solid fa-bowl-rice", desc: "Slow-cooked lamb shanks in a fragrant, spiced curry sauce until fall-off-the-bone.", img: "https://images.unsplash.com/photo-1625937998966-1f48adda361f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
        ]
    };


    // --- Functions ---

    const validateInput = (input, errorElement, errorMessage) => {
        clearError(input, errorElement);
        if (!input.value || isNaN(input.value) || parseFloat(input.value) <= 0) {
            showError(input, errorElement, errorMessage);
            return false;
        }
        return true;
    };

    const showError = (input, errorElement, message) => {
        input.classList.add('input-error');
        if (errorElement) errorElement.textContent = message; // Display the message
        // Ensure error message is visible (needed if initially display: none)
        if (errorElement) errorElement.style.opacity = '1';
    };

    const clearError = (input, errorElement) => {
        input.classList.remove('input-error');
        if (errorElement) errorElement.textContent = ''; // Clear text
        if (errorElement) errorElement.style.opacity = '0'; // Hide message
    };

    const calculateServings = (totalWeight, portionPerPerson) => {
        if (portionPerPerson <= 0) return 0;
        return Math.floor(totalWeight / portionPerPerson);
    };

    const getRecommendations = (meatType) => {
        return recommendationsData[meatType] || { cooking: 'N/A', time: 'N/A', seasoning: 'N/A' };
    };

    const displayResults = (servings, recommendations) => {
        resultPlaceholder.classList.add('hidden'); // Hide placeholder
        resultList.innerHTML = ''; // Clear previous results

        const servingsText = servings + (servings === 1 ? " serving" : " servings"); // Use "serving"

        const items = [
            // Reordered to highlight servings first
            { icon: 'fa-solid fa-users', label: 'Approx. Servings', value: servingsText },
            { icon: 'fa-solid fa-utensils', label: 'Serving Size Used', value: `${portionGrams}g / person` }, // Show the portion size used
            { icon: 'fa-solid fa-fire-burner', label: 'Suggested Methods', value: recommendations.cooking },
            { icon: 'fa-solid fa-clock', label: 'Est. Cooking Time', value: recommendations.time },
            { icon: 'fa-solid fa-mortar-pestle', label: 'Seasoning Ideas', value: recommendations.seasoning },
        ];

        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'result-item';
            li.innerHTML = `
                <span class="result-label"><i class="${item.icon}"></i> ${item.label}</span>
                <span class="result-value">${item.value}</span>
            `;
            resultList.appendChild(li);
        });

        resultList.classList.remove('hidden'); // Make list visible
        // Trigger reflow for transition
        void resultList.offsetWidth;
        resultList.classList.add('visible');
    };

    const displayRecipeSuggestions = (meatType) => {
        recipePlaceholder.classList.add('hidden'); // Hide placeholder text
        suggestionCardsContainer.innerHTML = ''; // Clear previous cards
        suggestionCardsContainer.classList.remove('visible'); // Hide container before populating

        const recipes = recipesData[meatType] || [];

        if (recipes.length === 0) {
            // If no recipes, show the main placeholder message again
             recipePlaceholder.textContent = "No specific recipe ideas found for this meat type yet. Explore our general recipes!";
             recipePlaceholder.classList.remove('hidden');
             return; // Exit function
        }

        recipes.forEach(recipe => {
            const card = document.createElement('div'); // Or 'a' if linking
            card.className = 'suggestion-card';
            card.setAttribute('role', 'link'); // Indicate it acts like a link
            card.setAttribute('tabindex', '0');

            const difficultyClass = `difficulty-${recipe.difficulty.toLowerCase()}`;

            card.innerHTML = `
              <div class="suggestion-img-container">
                 <img src="${recipe.img}" alt="${recipe.name}" loading="lazy">
                 <!-- <i class="${recipe.icon || 'fa-solid fa-utensils'}"></i> Fallback Icon -->
              </div>
              <div class="suggestion-content">
                <h4 class="suggestion-name">${recipe.name}</h4>
                <p class="suggestion-desc">${recipe.desc}</p>
                <div class="suggestion-tags">
                    <span class="tag"><i class="fa-solid fa-stopwatch"></i> ${recipe.time}</span>
                    <span class="tag ${difficultyClass}"><i class="fa-solid fa-chart-simple"></i> ${recipe.difficulty}</span>
                </div>
                 <div class="suggestion-action">
                     <span class="view-recipe-link">View Recipe <i class="fa-solid fa-arrow-right"></i></span>
                </div>
              </div>
            `;

             // Add click/keypress listener (for demo)
            const viewLink = card.querySelector('.view-recipe-link');
             const actionHandler = () => alert(`Navigating to: ${recipe.name}\n(Full recipe page not implemented)`);

            card.addEventListener('click', actionHandler);
            card.addEventListener('keypress', (e) => {
                 if (e.key === 'Enter' || e.key === ' ') {
                     actionHandler();
                 }
            });

            suggestionCardsContainer.appendChild(card);
        });

        // Make cards visible after adding them
        suggestionCardsContainer.classList.remove('hidden');
        // Trigger reflow for transition
        void suggestionCardsContainer.offsetWidth;
        suggestionCardsContainer.classList.add('visible');

    };

    // --- Event Listeners ---

    portionSizeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customPortionGroup.classList.remove('hidden');
            customPortionInput.required = true;
            customPortionInput.focus(); // Focus the input when shown
        } else {
            customPortionGroup.classList.add('hidden');
            customPortionInput.required = false;
            customPortionInput.value = '';
            clearError(customPortionInput, customPortionError);
        }
    });

    // Global variable to store portion size used in calculation
    let portionGrams = 0;

    meatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const originalButtonText = calculateBtn.innerHTML; // Store original button content
        calculateBtn.disabled = true;
        calculateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';

        // Reset previous results visibility
        resultList.classList.remove('visible');
        resultList.classList.add('hidden');
        resultPlaceholder.classList.remove('hidden');


        // --- Validation ---
        let isValid = true;
        if (!validateInput(meatWeightInput, meatWeightError, 'Please enter a valid weight (e.g., 500).')) {
            isValid = false;
        }

        const selectedPortion = portionSizeSelect.value;
        portionGrams = 0; // Reset global portionGrams

        if (selectedPortion === 'custom') {
            if (!validateInput(customPortionInput, customPortionError, 'Enter a custom portion (e.g., 175).')) {
                isValid = false;
            } else {
                 portionGrams = parseFloat(customPortionInput.value);
            }
        } else {
            portionGrams = portionSizes[selectedPortion] || portionSizes.medium;
        }

        if (!isValid) {
            calculateBtn.disabled = false;
            calculateBtn.innerHTML = originalButtonText;
            const firstError = meatForm.querySelector('.input-error');
            if (firstError) firstError.focus();
            return;
        }

        // --- Calculation & UI Update ---
        const meatType = meatTypeSelect.value;
        const meatWeight = parseFloat(meatWeightInput.value);

        // Simulate a short delay for calculation feedback
        setTimeout(() => {
            const servingsNum = calculateServings(meatWeight, portionGrams);
            const recommendations = getRecommendations(meatType);

            displayResults(servingsNum, recommendations);
            displayRecipeSuggestions(meatType);

            calculateBtn.disabled = false;
            calculateBtn.innerHTML = originalButtonText;

            // Scroll to results/recipes smoothly
            recipeSuggestionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }, 300); // 300ms delay
    });

    // --- Initial Setup ---
    // Set initial state for recipe placeholder
    recipePlaceholder.classList.remove('hidden');
    suggestionCardsContainer.classList.add('hidden');
    // Hide results placeholder initially, show it until calculation
    resultList.classList.add('hidden');
    resultPlaceholder.classList.remove('hidden');

     // Ensure custom portion is hidden initially
     if (portionSizeSelect.value !== 'custom') {
            customPortionGroup.classList.add('hidden');
            customPortionInput.required = false;
     }

}); // End DOMContentLoaded