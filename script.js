



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
    const recipePlaceholder = document.getElementById('recipePlaceholder');
    const recipeSuggestionsSection = document.getElementById('recipes');

    // Modal Elements
    const recipeModal = document.getElementById('recipeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalRecipeImage = document.getElementById('modalRecipeImage');
    const modalRecipeTitle = document.getElementById('recipeModalTitle');
    const modalRecipeDesc = document.getElementById('modalRecipeDesc');
    const modalIngredientsList = document.getElementById('modalIngredientsList');
    const modalInstructionsList = document.getElementById('modalInstructionsList');

    // --- Data ---
    const portionSizes = { small: 100, medium: 150, large: 200 };

    const recommendationsData = {
       pork: { cooking: "Roast, Grill, Pan-fry, Stew", time: "≈25m / 500g Roast", seasoning: "Garlic, Soy, Pepper, Paprika, Bay Leaf" },
       chicken: { cooking: "Roast, Grill, Stew, Fry", time: "≈20m / 500g Roast", seasoning: "Lemon, Herbs, Garlic, Onion, Ginger" },
       beef: { cooking: "Grill, Stew, Roast, Braise", time: "≈18m / 500g Grill (Med)", seasoning: "Salt, Pepper, Rosemary, Garlic, Thyme" },
       fish: { cooking: "Bake, Pan-fry, Steam, Grill", time: "≈10-15m / 500g Bake", seasoning: "Lemon, Dill, Parsley, White Wine, Garlic" },
       lamb: { cooking: "Roast, Grill, Slow-cook, Stew", time: "≈25m / 500g Roast", seasoning: "Rosemary, Garlic, Mint, Cumin, Thyme" }
    };

    // Recipes - Added ingredients & instructions
    const recipesData = {
        pork: [
            {
                name: " Classic Pork Adobo", time: "45 mins", difficulty: "Easy", icon: "fa-solid fa-pepper-hot",
                desc: "A savory and tangy Filipino staple, slow-braised to perfection with soy sauce, vinegar, garlic, and spices.",
                img: "https://salu-salo.com/wp-content/uploads/2015/04/Pork-Adobo-3.jpg",
                ingredients: ["1 kg Pork Belly or Shoulder, cut into 2-inch cubes", "1/2 cup Soy Sauce (adjust to taste)", "1/4 cup White Vinegar", "1 head Garlic, minced", "1 tsp Whole Peppercorns", "2-3 Bay Leaves", "1 cup Water or Broth", "2 tbsp Cooking Oil (optional, for browning)"],
                instructions: ["Combine pork, soy sauce, and garlic in a pot. Marinate for at least 15 minutes (optional but recommended).", "Add water/broth, whole peppercorns, and bay leaves.", "Bring to a boil, then lower heat, cover, and simmer for 30-40 minutes, or until pork is tender.", "Add vinegar. Do not stir for 5 minutes to let the vinegar cook off its sharpness.", "Simmer uncovered for another 10 minutes to thicken the sauce slightly.", "Optional: Remove pork from sauce, heat oil in a separate pan, and brown the pork pieces. Return to sauce.", "Serve hot with steamed rice."]
            },
            {
                name: " Crispy Lechon Kawali", time: "60 mins + Drying", difficulty: "Medium", icon: "fa-solid fa-bacon",
                desc: "Deep-fried pork belly boasting incredibly crunchy skin (crackling) and succulent, tender meat.",
                img: "https://static01.nyt.com/images/2023/11/28/multimedia/ND-Lechon-Kawali-bflv/ND-Lechon-Kawali-bflv-mediumSquareAt3X.jpg",
                ingredients: ["1 kg Pork Belly slab, skin-on", "Water for boiling", "1 tbsp Salt", "1 tsp Whole Peppercorns", "2-3 Bay Leaves", "Cooking Oil for deep frying"],
                instructions: ["Place pork belly in a pot, add enough water to cover. Add salt, peppercorns, and bay leaves.", "Bring to a boil, then simmer for 45-60 minutes or until the meat is tender.", "Remove pork from pot and let it cool. Pat the skin completely dry with paper towels. This is crucial for crispiness.", "Prick the skin all over with a fork or skewer (optional, helps rendering). Rub the skin with a little salt.", "Air dry the pork (uncovered) in the refrigerator for several hours or ideally overnight. The drier the skin, the crispier it gets.", "Heat enough oil in a deep pot for deep frying over medium-high heat (around 350°F or 175°C).", "Carefully lower the pork belly into the hot oil, skin-side down first. Be very cautious of oil splatters (use a splatter screen).", "Fry for 15-20 minutes, then carefully flip and fry the other side until golden brown and the skin is very crispy and blistered.", "Remove from oil and drain on a wire rack. Let it rest for 10 minutes before chopping.", "Chop into bite-sized pieces and serve immediately with lechon sauce or spiced vinegar."]
            },
            {
                name: " Pork Sinigang", time: "50 mins", difficulty: "Easy", icon: "fa-solid fa-bowl-food",
                desc: "A comforting sour and savory tamarind-based soup, loaded with tender pork ribs or belly and various vegetables.",
                img: "https://images.yummy.ph/yummy/uploads/2019/03/sinigangbaboysamiso-recipe-1.jpg",
                ingredients: ["500g Pork Ribs or Belly, cut", "1 packet Tamarind Soup Base (Sinigang Mix) or fresh tamarind pulp", "1 large Onion, quartered", "2 medium Tomatoes, quartered", "1 Daikon Radish (Labanos), peeled and sliced", "1 bundle String Beans (Sitaw), cut into 2-inch lengths", "5-6 pieces Okra", "1 bundle Water Spinach (Kangkong) or Spinach", "2-3 pcs Finger Chilies (Siling Pangsigang, optional)", "Fish Sauce (Patis) to taste", "8 cups Water"],
                instructions: ["In a pot, combine pork and water. Bring to a boil, skimming off any scum that rises to the surface.", "Add onion and tomatoes. Lower heat, cover, and simmer for 30-45 minutes, or until pork is tender.", "Add the tamarind soup base (or strained fresh tamarind pulp) and Daikon radish. Simmer for 5-7 minutes.", "Add string beans, okra, and finger chilies (if using). Cook for another 3-5 minutes until vegetables are tender-crisp.", "Stir in the water spinach (or spinach) and cook for 1 more minute until wilted.", "Season with fish sauce (patis) according to your preference.", "Serve steaming hot, usually with rice."]
            }
        ],
        chicken: [
            {
                name: " Chicken Tinola", time: "40 mins", difficulty: "Easy", icon: "fa-solid fa-drumstick-bite",
                desc: "A clear, gingery chicken soup with green papaya or chayote, and chili leaves, known for its clean and warming flavors.",
                img: "https://www.allrecipes.com/thmb/DffejbaV_BtbfcfuMfLZC5psayI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/212929-chicken-tinola-ddmfs-beauty-1x2-4792da9f161f41acb50bdd25b74c3d8e.jpg",
                ingredients: ["1 kg Chicken, cut into serving pieces", "1 thumb-sized Ginger, peeled and sliced thinly", "1 medium Onion, chopped", "3-4 cloves Garlic, minced", "1 small Green Papaya or Chayote (Sayote), peeled and sliced", "1 handful Chili Leaves (Dahon ng Sili) or Malunggay Leaves", "2 tbsp Fish Sauce (Patis), plus more to taste", "6-8 cups Water or Rice Washing", "2 tbsp Cooking Oil", "Black pepper to taste"],
                instructions: ["Heat oil in a pot over medium heat. Sauté ginger, onion, and garlic until fragrant.", "Add chicken pieces and cook, stirring occasionally, until lightly browned on all sides.", "Season with fish sauce (patis) and cook for 1-2 minutes.", "Pour in water or rice washing. Bring to a boil.", "Lower the heat, cover, and simmer for 20-25 minutes, or until the chicken is cooked through and tender.", "Add the green papaya or chayote slices. Simmer for 5-8 minutes until tender.", "Stir in the chili leaves or malunggay leaves. Cook for another minute until wilted.", "Season with black pepper and add more fish sauce if needed.", "Serve hot."]
            },
            {
                 name: " Chicken Inasal", time: "30 mins + Marinating", difficulty: "Medium", icon: "fa-solid fa-fire",
                 desc: "Smoky, vibrant grilled chicken from Bacolod, marinated in vinegar, calamansi, lemongrass, ginger, garlic, and brushed with achiote oil.",
                 img: "https://www.maggi.ph/sites/default/files/srh_recipes/fb57f76d3cd9b83f1509f030c7024b51.jpg", // Different chicken image
                 ingredients: ["1 kg Chicken Legs or Thighs", "Marinade:", "1/2 cup Coconut Vinegar", "1/4 cup Calamansi Juice (or lemon/lime)", "3 stalks Lemongrass, pounded and chopped", "1/4 cup Ginger, minced", "6 cloves Garlic, minced", "1 tsp Salt", "1/2 tsp Black Pepper", "Basting Sauce:", "1/4 cup Annatto/Achiote Oil", "2 tbsp Melted Butter or Margarine", "1 tbsp Vinegar from marinade", "Pinch of salt"],
                 instructions: ["Combine all marinade ingredients in a large bowl or ziplock bag.", "Add chicken pieces, ensuring they are well-coated. Marinate in the refrigerator for at least 2 hours, preferably 4 hours or overnight.", "Prepare the basting sauce by combining achiote oil, melted butter/margarine, vinegar, and salt.", "Preheat grill (charcoal preferred for authentic flavor) to medium heat.", "Remove chicken from marinade, letting excess drip off (reserve some vinegar from marinade for basting sauce).", "Grill chicken for 15-20 minutes per side, or until cooked through and juices run clear. Turn occasionally.", "Brush generously with the basting sauce during the last 10 minutes of grilling.", "Serve hot with steamed rice and a dipping sauce of soy sauce, vinegar, calamansi, and chili."]
            },
            {
                 name: " Pininyahang Manok", time: "45 mins", difficulty: "Easy", icon: "fa-solid fa-pineapple", // Pineapple icon
                 desc: "A delightful Filipino chicken stew simmered in a rich, creamy pineapple sauce with bell peppers and carrots.",
                 img: "https://images.aws.nestle.recipes/original/b42aab367ffbac6ba2c782e1dc316c8d_Pininyahang_Manok_main.jpg", // General food image
                 ingredients: ["1 kg Chicken, cut into serving pieces", "1 can (20 oz) Pineapple Chunks in syrup, reserve syrup", "1 cup All-Purpose Cream or Evaporated Milk", "1 medium Onion, chopped", "3 cloves Garlic, minced", "1 Red Bell Pepper, sliced", "1 Green Bell Pepper, sliced", "1 Carrot, sliced (optional)", "2 tbsp Fish Sauce (Patis) or Soy Sauce", "1 tbsp Cooking Oil", "Salt and Pepper to taste"],
                 instructions: ["Heat oil in a pot or large pan over medium heat. Sauté onion and garlic until fragrant.", "Add chicken pieces and cook until lightly browned.", "Pour in the reserved pineapple syrup and add fish sauce (or soy sauce). Bring to a boil.", "Lower the heat, cover, and simmer for 20-25 minutes or until chicken is tender.", "Add pineapple chunks, bell peppers, and carrots (if using). Cook for 5 minutes.", "Stir in the all-purpose cream or evaporated milk. Simmer gently for another 5 minutes, stirring occasionally, until the sauce slightly thickens. Do not boil rapidly after adding cream.", "Season with salt and pepper to taste.", "Serve hot with rice."]
             }
        ],
        beef: [
             {
                 name: " Beef Kaldereta", time: "90 mins+", difficulty: "Medium", icon: "fa-solid fa-spoon",
                 desc: "A hearty and flavorful Filipino beef stew, slow-simmered in a tomato-based sauce with liver spread, potatoes, carrots, bell peppers, and olives.",
                 img: "https://cdn.sanity.io/images/f3knbc2s/production/f74d8aed0419d87b41895136fede06b671ed0482-2500x1500.jpg",
                 ingredients: ["1 kg Beef Chuck or Brisket, cut into 2-inch cubes", "1 large Onion, chopped", "4 cloves Garlic, minced", "1 can (15 oz) Tomato Sauce", "1/2 cup Liver Spread or Pate", "2 medium Potatoes, peeled and cubed", "2 medium Carrots, peeled and sliced", "1 Red Bell Pepper, sliced", "1 Green Bell Pepper, sliced", "1/2 cup Green Olives (optional)", "3-4 Bay Leaves", "1 cup Beef Broth or Water", "2 tbsp Cooking Oil", "Salt and Pepper to taste", "Grated Cheese for topping (optional)"],
                 instructions: ["Heat oil in a large pot or Dutch oven over medium-high heat. Sear the beef cubes until browned on all sides. Remove beef and set aside.", "In the same pot, sauté onion and garlic until softened and fragrant.", "Return the beef to the pot. Add tomato sauce, liver spread, bay leaves, and beef broth/water.", "Bring to a boil, then reduce heat to low, cover, and simmer for 1.5 - 2 hours, or until the beef is very tender (add more water if it becomes too dry).", "Add potatoes and carrots. Cover and cook for 15-20 minutes more, or until vegetables are tender.", "Stir in bell peppers and olives (if using). Cook for another 5 minutes.", "Season with salt and pepper to taste.", "Remove bay leaves before serving. Top with grated cheese if desired.", "Serve hot with steamed rice."]
             },
             {
                 name: " Beef Mechado", time: "75 mins+", difficulty: "Medium", icon: "fa-solid fa-carrot",
                 desc: "Tender beef braised in soy sauce, calamansi juice, and tomato sauce, often characterized by a strip of pork fat inserted into the beef.",
                 img: "https://www.foxyfolksy.com/wp-content/uploads/2019/09/mechado-640.jpg",
                 ingredients: ["1 kg Beef Eye of Round or Chuck Roast", "Optional: Strips of Pork Fat (for larding)", "1/2 cup Soy Sauce", "1/4 cup Calamansi Juice (or Lemon Juice)", "1 can (8 oz) Tomato Sauce", "1 large Onion, sliced", "4 cloves Garlic, minced", "2 medium Potatoes, peeled and quartered", "1 medium Carrot, sliced thickly", "1 Red Bell Pepper, cut into squares", "2 Bay Leaves", "1 cup Beef Broth or Water", "2 tbsp Cooking Oil", "Salt and Pepper to taste"],
                 instructions: ["Optional Larding: Make small incisions in the beef roast and insert strips of pork fat.", "Marinate the beef in soy sauce and calamansi juice for at least 30 minutes.", "Heat oil in a pot. Sear the marinated beef on all sides until browned. Remove beef and set aside.", "Sauté onion and garlic in the same pot until fragrant.", "Return beef to the pot. Add the marinade, tomato sauce, beef broth/water, and bay leaves.", "Bring to a boil, then lower heat, cover, and simmer for 1.5 - 2 hours, or until beef is tender.", "Add potatoes and carrots. Cook covered for 15-20 minutes until tender.", "Add the bell pepper and cook for another 5 minutes.", "Season with salt and pepper to taste. Remove bay leaves.", "Slice the beef roast before serving with the sauce and vegetables over rice."]
             },
             {
                 name: " Filipino Beef Tapa", time: "30 mins + Marinating", difficulty: "Easy", icon: "fa-solid fa-egg",
                 desc: "Thinly sliced cured beef, pan-fried until caramelized and slightly crispy. A breakfast favorite often served as 'Tapsilog'.",
                 img: "https://www.foxyfolksy.com/wp-content/uploads/2017/09/beef-tapa-640.jpg",
                 ingredients: ["500g Beef Sirloin or Tenderloin, sliced very thinly against the grain", "Marinade:", "1/4 cup Soy Sauce", "2 tbsp Calamansi Juice or Vinegar", "4 cloves Garlic, minced", "1-2 tbsp Brown Sugar (adjust to sweetness preference)", "1/2 tsp Black Pepper", "Pinch of Salt", "2-3 tbsp Cooking Oil for frying"],
                 instructions: ["In a bowl, combine all marinade ingredients: soy sauce, calamansi/vinegar, garlic, brown sugar, pepper, and salt. Mix well.", "Add the thinly sliced beef to the marinade, ensuring all pieces are coated. Cover and refrigerate for at least 4 hours, or preferably overnight for best flavor.", "Heat cooking oil in a frying pan or skillet over medium-high heat.", "Remove beef from the marinade, letting excess drip off slightly.", "Place beef slices in the hot pan in a single layer (cook in batches if necessary to avoid overcrowding).", "Fry for 2-4 minutes per side, or until cooked through and slightly caramelized at the edges. Adjust cooking time based on desired doneness.", "Do not overcook, as it can become tough.", "Serve immediately, typically with garlic fried rice (sinangag) and a fried egg (itlog) for a classic Tapsilog meal."]
            }
        ],
         fish: [
             {
                 name: " Sinigang na Isda", time: "30 mins", difficulty: "Easy", icon: "fa-solid fa-fish-fins",
                 desc: "A light and sour Filipino fish soup using tamarind broth, typically with milkfish or tilapia, and various vegetables.",
                 img: "https://www.maggi.ph/sites/default/files/styles/image_744_x_419/public/srh_recipes/48ce3132d5a437e6977cd0c6df0f094d.jpg?h=561fe1eb&itok=1tOMxI7T",
                 ingredients: ["500g Fish Steaks or Whole Fish (Milkfish, Tilapia, Mackerel), cleaned", "1 packet Tamarind Soup Base (Sinigang Mix) or fresh tamarind pulp", "1 large Onion, quartered", "2 medium Tomatoes, quartered", "1 Daikon Radish (Labanos), sliced", "1 bundle String Beans (Sitaw), cut", "5-6 pieces Okra", "1 bundle Water Spinach (Kangkong) or Bok Choy", "2-3 pcs Finger Chilies (Siling Pangsigang, optional)", "Fish Sauce (Patis) to taste", "6-8 cups Water or Rice Washing"],
                 instructions: ["In a pot, combine water/rice washing, onion, and tomatoes. Bring to a boil.", "Add tamarind soup base (or fresh tamarind) and radish. Simmer for 5 minutes.", "Gently add the fish pieces. Lower heat and simmer for 8-10 minutes, or until fish is cooked through (do not overcook).", "Add string beans, okra, and finger chilies (if using). Cook for 3-5 minutes until tender-crisp.", "Add water spinach or bok choy and cook for 1 minute until wilted.", "Season carefully with fish sauce (patis) to taste.", "Serve immediately."]
            },
            {
                 name: " Paksiw na Isda", time: "25 mins", difficulty: "Easy", icon: "fa-solid fa-fish",
                 desc: "Fish simmered gently in vinegar, garlic, ginger, and peppercorns, often with vegetables like eggplant and bitter gourd.",
                 img: "https://www.maggi.ph/sites/default/files/styles/home_stage_1500_700/public/srh_recipes/41b263bf239ea5e6125956c96bca84a4.jpg?h=28121b77&itok=EZuzNQDe",
                 ingredients: ["500g Fish (Galunggong, Tilapia, Bangus), cleaned", "1 cup White Vinegar", "1/2 cup Water", "5 cloves Garlic, crushed", "1 thumb Ginger, sliced", "1 tsp Whole Peppercorns", "1-2 Finger Chilies (Siling Pangsigang)", "Salt to taste", "Optional Vegetables: Sliced Eggplant, Sliced Bitter Gourd (Ampalaya)"],
                 instructions: ["Arrange optional vegetables (if using) at the bottom of a pot.", "Place the fish on top of the vegetables.", "Add vinegar, water, garlic, ginger, peppercorns, and finger chilies.", "Bring the mixture to a boil without covering.", "Once boiling, lower the heat, cover the pot, and simmer gently for 15-20 minutes, or until the fish is cooked through and vegetables are tender.", "Season with salt to taste during the last few minutes of cooking.", "Serve hot with rice."]
            },
            {
                 name: " Fish Kinilaw", time: "20 mins + Marinating", difficulty: "Easy", icon: "fa-regular fa-lemon",
                 desc: "Filipino ceviche where fresh, sushi-grade fish is 'cooked' by the acidity of vinegar or citrus juice, mixed with ginger, onion, and chili.",
                 img: "https://nutriasia.com/wp-content/uploads/2018/10/kinilawThumb.jpg",
                 ingredients: ["500g Fresh Sushi-Grade Fish (Tuna, Tanigue/Spanish Mackerel), cubed", "1 cup Coconut Vinegar or Cane Vinegar", "1/4 cup Calamansi or Lime Juice (optional, for extra tang)", "1 large Red Onion, chopped finely", "2 thumbs Ginger, minced or grated", "2-4 pcs Red Chili Peppers (Siling Labuyo), chopped finely (adjust heat)", "1/2 tsp Salt (or to taste)", "1/4 tsp Black Pepper", "Optional additions: Chopped Cucumber, Chopped Bell Pepper, Coconut Milk (for Visayan style)"],
                 instructions: ["Wash the fish cubes gently and drain thoroughly.", "In a non-metallic bowl (glass or ceramic), combine the fish cubes, vinegar, calamansi/lime juice (if using), onion, ginger, and chili peppers.", "Mix gently but thoroughly.", "Season with salt and pepper.", "Cover the bowl and refrigerate for at least 15-30 minutes to allow the acids to 'cook' the fish and flavors to meld. The fish will become opaque.", "For Visayan style, you can drain some of the vinegar after initial marination and stir in a bit of fresh coconut milk just before serving.", "Taste and adjust seasoning if necessary.", "Serve chilled as an appetizer."]
            }
        ],
        
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
        const parentGroup = input.closest('.input-group'); // Find parent group for selects
        const targetErrorElement = parentGroup ? parentGroup.querySelector('.error-message') : errorElement;
        if (targetErrorElement) {
            targetErrorElement.textContent = message;
            targetErrorElement.style.opacity = '1';
        }
         // Add error class to select wrapper if it's a select
         if (input.tagName === 'SELECT') {
            input.closest('.select-wrapper')?.classList.add('input-error');
         }
    };

    const clearError = (input, errorElement) => {
        input.classList.remove('input-error');
        const parentGroup = input.closest('.input-group');
        const targetErrorElement = parentGroup ? parentGroup.querySelector('.error-message') : errorElement;
        if (targetErrorElement) {
             targetErrorElement.textContent = '';
             targetErrorElement.style.opacity = '0';
        }
         // Remove error class from select wrapper
         if (input.tagName === 'SELECT') {
             input.closest('.select-wrapper')?.classList.remove('input-error');
         }
    };

    const calculateServings = (totalWeight, portionPerPerson) => {
        if (portionPerPerson <= 0) return 0;
        return Math.floor(totalWeight / portionPerPerson);
    };

    const getRecommendations = (meatType) => {
        return recommendationsData[meatType] || { cooking: 'N/A', time: 'N/A', seasoning: 'N/A' };
    };

    // Global variable to store portion size used in calculation
    let portionGrams = 0; // Moved outside displayResults

    const displayResults = (servings, recommendations) => {
        resultPlaceholder.classList.add('hidden');
        resultList.innerHTML = '';

        const servingsText = servings + (servings === 1 ? " serving" : " servings");

        const items = [
            { icon: 'fa-solid fa-users', label: 'Approx. Servings', value: servingsText },
            { icon: 'fa-solid fa-utensils', label: 'Serving Size Used', value: `${portionGrams}g / person` },
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

        resultList.classList.remove('hidden');
        void resultList.offsetWidth;
        resultList.classList.add('visible');
    };

    // --- Modal Functions ---
    let lastFocusedElement; // To store focus before modal opens

    const openRecipeModal = (recipe) => {
        if (!recipe) return;

        lastFocusedElement = document.activeElement; // Store current focus

        // Populate Modal Content
        modalRecipeImage.src = recipe.img || 'placeholder-image.jpg'; // Provide a fallback image path if needed
        modalRecipeImage.alt = recipe.name || 'Recipe Image';
        modalRecipeTitle.textContent = recipe.name || 'Recipe Details';
        modalRecipeDesc.textContent = recipe.desc || 'No description available.';

        // Populate Ingredients
        modalIngredientsList.innerHTML = '';
        if (recipe.ingredients && recipe.ingredients.length > 0) {
            recipe.ingredients.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalIngredientsList.appendChild(li);
            });
        } else {
            modalIngredientsList.innerHTML = '<li>Ingredients not available.</li>';
        }

        // Populate Instructions
        modalInstructionsList.innerHTML = '';
        if (recipe.instructions && recipe.instructions.length > 0) {
            recipe.instructions.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                modalInstructionsList.appendChild(li);
            });
        } else {
            modalInstructionsList.innerHTML = '<li>Instructions not available.</li>';
        }

        // Show Modal
        recipeModal.classList.add('active');
        recipeModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        modalCloseBtn.focus(); // Focus the close button
    };

    const closeRecipeModal = () => {
        recipeModal.classList.remove('active');
        recipeModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        // Restore focus to the element that opened the modal
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    const displayRecipeSuggestions = (meatType) => {
        recipePlaceholder.classList.add('hidden');
        suggestionCardsContainer.innerHTML = '';
        suggestionCardsContainer.classList.remove('visible', 'hidden'); // Ensure it's ready to be shown

        const recipes = recipesData[meatType] || [];

        if (recipes.length === 0) {
             recipePlaceholder.textContent = "No specific recipe ideas found for this meat type yet.";
             recipePlaceholder.classList.remove('hidden');
             suggestionCardsContainer.classList.add('hidden'); // Hide the container too
             return;
        }

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View recipe details for ${recipe.name}`);

            const difficultyClass = `difficulty-${recipe.difficulty.toLowerCase()}`;

            card.innerHTML = `
              <div class="suggestion-img-container">
                 <img src="${recipe.img}" alt="${recipe.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"> <!-- Hide image on error, show icon -->
                 <i class="fa-solid fa-utensils" style="display: none; font-size: 4rem; color: var(--text-light); opacity: 0.5;"></i> <!-- Fallback Icon initially hidden -->
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

             const actionHandler = () => openRecipeModal(recipe);

            card.addEventListener('click', actionHandler);
            card.addEventListener('keypress', (e) => {
                 if (e.key === 'Enter' || e.key === ' ') {
                     e.preventDefault();
                     actionHandler();
                 }
            });

            suggestionCardsContainer.appendChild(card);
        });

        // Make cards visible after adding them
        // suggestionCardsContainer.classList.remove('hidden'); // Already done above
        void suggestionCardsContainer.offsetWidth;
        suggestionCardsContainer.classList.add('visible');
    };


    // --- Event Listeners ---

    portionSizeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customPortionGroup.classList.remove('hidden');
            customPortionInput.required = true;
            customPortionInput.focus();
        } else {
            customPortionGroup.classList.add('hidden');
            customPortionInput.required = false;
            customPortionInput.value = '';
            clearError(customPortionInput, customPortionError); // Clear potential errors
        }
    });

    meatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const originalButtonText = calculateBtn.innerHTML;
        calculateBtn.disabled = true;
        calculateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';

        // Reset previous results/suggestions visibility
        resultList.classList.remove('visible');
        resultList.classList.add('hidden');
        resultPlaceholder.classList.remove('hidden');
        suggestionCardsContainer.classList.remove('visible');
        suggestionCardsContainer.classList.add('hidden');
        recipePlaceholder.classList.remove('hidden');


        // --- Validation ---
        let isValid = true;
        // Clear previous errors before re-validating
        clearError(meatWeightInput, meatWeightError);
        if (portionSizeSelect.value === 'custom') {
            clearError(customPortionInput, customPortionError);
        }


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
            if (firstError) {
                firstError.focus();
                // Scroll to the first error field for better UX on mobile
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // --- Calculation & UI Update ---
        const meatType = meatTypeSelect.value;
        const meatWeight = parseFloat(meatWeightInput.value);

        setTimeout(() => {
            const servingsNum = calculateServings(meatWeight, portionGrams);
            const recommendations = getRecommendations(meatType);

            displayResults(servingsNum, recommendations);
            displayRecipeSuggestions(meatType);

            calculateBtn.disabled = false;
            calculateBtn.innerHTML = originalButtonText;

            // Scroll smoothly to the recipe suggestions section
            recipeSuggestionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        }, 300);
    });

    // Modal Close Listeners
    modalCloseBtn.addEventListener('click', closeRecipeModal);
    modalOverlay.addEventListener('click', closeRecipeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && recipeModal.classList.contains('active')) {
            closeRecipeModal();
        }
    });

    // --- Initial Setup ---
    recipePlaceholder.classList.remove('hidden');
    suggestionCardsContainer.classList.add('hidden');
    resultList.classList.add('hidden');
    resultPlaceholder.classList.remove('hidden');

     // Ensure custom portion is hidden initially
     if (portionSizeSelect.value !== 'custom') {
            customPortionGroup.classList.add('hidden');
            customPortionInput.required = false;
     }

}); // End DOMContentLoaded
