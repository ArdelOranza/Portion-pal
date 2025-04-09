document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const meatForm = document.getElementById('meatForm');
    const portionSizeSelect = document.getElementById('portionSize');
    const customPortionGroup = document.getElementById('customPortionGroup');
    const customPortionInput = document.getElementById('customPortion');
    const customPortionError = document.getElementById('customPortionError');
    const meatTypeSelect = document.getElementById('meatType');
    const meatWeightInput = document.getElementById('meatWeight');
    const meatWeightUnitSelect = document.getElementById('meatWeightUnit'); // Added
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

    // ========================================================================
    // == Recipe Section ========
    // == { text: "...", baseQty: ..., unit: "..." } and baseMeatWeight ======
    // ========================================================================
    const recipesData = {
        pork: [
            {
                name: "Classic Pork Adobo", time: "45 mins", difficulty: "Easy", icon: "fa-solid fa-pepper-hot",
                desc: "A savory and tangy Filipino staple, slow-braised to perfection with soy sauce, vinegar, garlic, and spices.",
                img: "https://salu-salo.com/wp-content/uploads/2015/04/Pork-Adobo-3.jpg",
                baseMeatWeight: 1000, // Base recipe is for 1000g (1kg) pork
                ingredients: [
                    { text: "Soy Sauce", baseQty: 120, unit: "ml" }, // Approx 1/2 cup
                    { text: "White Vinegar", baseQty: 60, unit: "ml" }, // Approx 1/4 cup
                    { text: "Garlic, minced", baseQty: 1, unit: "head" }, // Non-scalable unit
                    { text: "Whole Peppercorns", baseQty: 1, unit: "tsp" }, // Non-scalable unit
                    { text: "Bay Leaves", baseQty: 3, unit: "pcs" }, // Non-scalable unit
                    { text: "Water or Broth", baseQty: 240, unit: "ml" }, // Approx 1 cup
                    { text: "Cooking Oil (optional, for browning)", baseQty: 30, unit: "ml" } // Approx 2 tbsp
                ],
                instructions: ["Combine pork, soy sauce, and garlic in a pot. Marinate for at least 15 minutes (optional but recommended).", "Add water/broth, whole peppercorns, and bay leaves.", "Bring to a boil, then lower heat, cover, and simmer for 30-40 minutes, or until pork is tender.", "Add vinegar. Do not stir for 5 minutes to let the vinegar cook off its sharpness.", "Simmer uncovered for another 10 minutes to thicken the sauce slightly.", "Optional: Remove pork from sauce, heat oil in a separate pan, and brown the pork pieces. Return to sauce.", "Serve hot with steamed rice."]
            },
            {
                 name: "Crispy Lechon Kawali", time: "60 mins + Drying", difficulty: "Medium", icon: "fa-solid fa-bacon",
                 desc: "Deep-fried pork belly boasting incredibly crunchy skin (crackling) and succulent, tender meat.",
                 img: "https://static01.nyt.com/images/2023/11/28/multimedia/ND-Lechon-Kawali-bflv/ND-Lechon-Kawali-bflv-mediumSquareAt3X.jpg",
                 baseMeatWeight: 1000, // 1kg base
                 ingredients: [
                    { text: "Water for boiling", baseQty: null, unit: "enough to cover" }, // Non-scalable description
                    { text: "Salt (for boiling)", baseQty: 1, unit: "tbsp" }, // Technically scalable, but often to taste
                    { text: "Whole Peppercorns (for boiling)", baseQty: 1, unit: "tsp" },
                    { text: "Bay Leaves (for boiling)", baseQty: 3, unit: "pcs" },
                    { text: "Cooking Oil for deep frying", baseQty: null, unit: "enough for deep frying" }
                 ],
                 instructions: ["Place pork belly in a pot, add enough water to cover. Add salt, peppercorns, and bay leaves.", "Bring to a boil, then simmer for 45-60 minutes or until the meat is tender.", "Remove pork from pot and let it cool. Pat the skin completely dry with paper towels. This is crucial for crispiness.", "Prick the skin all over with a fork or skewer (optional, helps rendering). Rub the skin with a little salt.", "Air dry the pork (uncovered) in the refrigerator for several hours or ideally overnight. The drier the skin, the crispier it gets.", "Heat enough oil in a deep pot for deep frying over medium-high heat (around 350°F or 175°C).", "Carefully lower the pork belly into the hot oil, skin-side down first. Be very cautious of oil splatters (use a splatter screen).", "Fry for 15-20 minutes, then carefully flip and fry the other side until golden brown and the skin is very crispy and blistered.", "Remove from oil and drain on a wire rack. Let it rest for 10 minutes before chopping.", "Chop into bite-sized pieces and serve immediately with lechon sauce or spiced vinegar."]
             },
              {
                 name: "Pork Sinigang", time: "50 mins", difficulty: "Easy", icon: "fa-solid fa-bowl-food",
                 desc: "A comforting sour and savory tamarind-based soup, loaded with tender pork ribs or belly and various vegetables.",
                 img: "https://images.yummy.ph/yummy/uploads/2019/03/sinigangbaboysamiso-recipe-1.jpg",
                 baseMeatWeight: 500, // 500g base
                 ingredients: [
                    { text: "Tamarind Soup Base (Sinigang Mix)", baseQty: 1, unit: "packet" }, // Hard to scale packet
                    { text: "Large Onion, quartered", baseQty: 1, unit: "pcs" },
                    { text: "Medium Tomatoes, quartered", baseQty: 2, unit: "pcs" },
                    { text: "Daikon Radish (Labanos), peeled and sliced", baseQty: 1, unit: "pcs" },
                    { text: "String Beans (Sitaw), cut", baseQty: 1, unit: "bundle" }, // Hard to scale bundle
                    { text: "Okra", baseQty: 6, unit: "pcs" },
                    { text: "Water Spinach (Kangkong) or Spinach", baseQty: 1, unit: "bundle" },
                    { text: "Finger Chilies (Siling Pangsigang, optional)", baseQty: 3, unit: "pcs" },
                    { text: "Fish Sauce (Patis)", baseQty: null, unit: "to taste" },
                    { text: "Water", baseQty: 1920, unit: "ml" } // Approx 8 cups
                 ],
                 instructions: ["In a pot, combine pork and water. Bring to a boil, skimming off any scum that rises to the surface.", "Add onion and tomatoes. Lower heat, cover, and simmer for 30-45 minutes, or until pork is tender.", "Add the tamarind soup base (or strained fresh tamarind pulp) and Daikon radish. Simmer for 5-7 minutes.", "Add string beans, okra, and finger chilies (if using). Cook for another 3-5 minutes until vegetables are tender-crisp.", "Stir in the water spinach (or spinach) and cook for 1 more minute until wilted.", "Season with fish sauce (patis) according to your preference.", "Serve steaming hot, usually with rice."]
              }
        ],
        chicken: [
             {
                 name: "Chicken Tinola", time: "40 mins", difficulty: "Easy", icon: "fa-solid fa-drumstick-bite",
                 desc: "A clear, gingery chicken soup with green papaya or chayote, and chili leaves, known for its clean and warming flavors.",
                 img: "https://www.allrecipes.com/thmb/DffejbaV_BtbfcfuMfLZC5psayI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/212929-chicken-tinola-ddmfs-beauty-1x2-4792da9f161f41acb50bdd25b74c3d8e.jpg",
                 baseMeatWeight: 1000, // 1kg base
                 ingredients: [
                    { text: "Ginger, peeled and sliced thinly", baseQty: 1, unit: "thumb-sized" }, // Description based unit
                    { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" },
                    { text: "Garlic, minced", baseQty: 4, unit: "cloves" },
                    { text: "Small Green Papaya or Chayote (Sayote), peeled and sliced", baseQty: 1, unit: "pcs" },
                    { text: "Chili Leaves (Dahon ng Sili) or Malunggay Leaves", baseQty: 1, unit: "handful" }, // Description based unit
                    { text: "Fish Sauce (Patis)", baseQty: 30, unit: "ml" }, // Approx 2 tbsp
                    { text: "Water or Rice Washing", baseQty: 1600, unit: "ml" }, // Approx 6-8 cups -> ~7 cups avg
                    { text: "Cooking Oil", baseQty: 30, unit: "ml" }, // Approx 2 tbsp
                    { text: "Black pepper", baseQty: null, unit: "to taste" }
                 ],
                 instructions: ["Heat oil in a pot over medium heat. Sauté ginger, onion, and garlic until fragrant.", "Add chicken pieces and cook, stirring occasionally, until lightly browned on all sides.", "Season with fish sauce (patis) and cook for 1-2 minutes.", "Pour in water or rice washing. Bring to a boil.", "Lower the heat, cover, and simmer for 20-25 minutes, or until the chicken is cooked through and tender.", "Add the green papaya or chayote slices. Simmer for 5-8 minutes until tender.", "Stir in the chili leaves or malunggay leaves. Cook for another minute until wilted.", "Season with black pepper and add more fish sauce if needed.", "Serve hot."]
             },
            // --- ADD ALL OTHER CHICKEN RECIPES HERE IN THE NEW FORMAT ---
             {
                  name: "Chicken Inasal", time: "30 mins + Marinating", difficulty: "Medium", icon: "fa-solid fa-fire",
                  desc: "Smoky, vibrant grilled chicken from Bacolod, marinated and brushed with achiote oil.",
                  img: "https://www.maggi.ph/sites/default/files/srh_recipes/fb57f76d3cd9b83f1509f030c7024b51.jpg",
                  baseMeatWeight: 1000, // 1kg base
                  ingredients: [
                      { text: "Coconut Vinegar", baseQty: 120, unit: "ml" }, // 1/2 cup
                      { text: "Calamansi Juice (or lemon/lime)", baseQty: 60, unit: "ml" }, // 1/4 cup
                      { text: "Lemongrass, pounded and chopped", baseQty: 3, unit: "stalks" },
                      { text: "Ginger, minced", baseQty: 45, unit: "ml" }, // Approx 1/4 cup minced -> ~3 tbsp -> 45ml
                      { text: "Garlic, minced", baseQty: 6, unit: "cloves" },
                      { text: "Salt", baseQty: 1, unit: "tsp" },
                      { text: "Black Pepper", baseQty: 0.5, unit: "tsp" },
                      { text: "Annatto/Achiote Oil (for basting)", baseQty: 60, unit: "ml" }, // 1/4 cup
                      { text: "Melted Butter or Margarine (for basting)", baseQty: 30, unit: "ml" }, // 2 tbsp
                      { text: "Vinegar from marinade (for basting)", baseQty: 15, unit: "ml" }, // 1 tbsp
                      { text: "Salt (for basting)", baseQty: 1, unit: "pinch" } // Non-scalable description
                  ],
                  instructions: ["Combine marinade ingredients (vinegar, calamansi, lemongrass, ginger, garlic, salt, pepper) in a large bowl or ziplock bag.", "Add chicken pieces, ensuring they are well-coated. Marinate in the refrigerator for at least 2 hours, preferably 4 hours or overnight.", "Prepare the basting sauce by combining achiote oil, melted butter/margarine, reserved vinegar from marinade, and a pinch of salt.", "Preheat grill (charcoal preferred) to medium heat.", "Remove chicken from marinade, letting excess drip off.", "Grill chicken for 15-20 minutes per side, or until cooked through and juices run clear. Turn occasionally.", "Brush generously with the basting sauce during the last 10 minutes of grilling.", "Serve hot with steamed rice and dipping sauce (soy sauce, vinegar, calamansi, chili)."]
             },
             {
                  name: "Pininyahang Manok", time: "45 mins", difficulty: "Easy", icon: "fa-solid fa-pineapple",
                  desc: "A delightful Filipino chicken stew simmered in a rich, creamy pineapple sauce.",
                  img: "https://images.aws.nestle.recipes/original/b42aab367ffbac6ba2c782e1dc316c8d_Pininyahang_Manok_main.jpg",
                  baseMeatWeight: 1000, // 1kg base
                  ingredients: [
                      { text: "Pineapple Chunks in syrup (reserve syrup)", baseQty: 1, unit: "can (20 oz)" }, // Hard to scale can size
                      { text: "Pineapple Syrup (reserved from can)", baseQty: 1, unit: "can's worth" }, // Use description
                      { text: "All-Purpose Cream or Evaporated Milk", baseQty: 240, unit: "ml" }, // 1 cup
                      { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" },
                      { text: "Garlic, minced", baseQty: 3, unit: "cloves" },
                      { text: "Red Bell Pepper, sliced", baseQty: 1, unit: "pcs" },
                      { text: "Green Bell Pepper, sliced", baseQty: 1, unit: "pcs" },
                      { text: "Carrot, sliced (optional)", baseQty: 1, unit: "pcs" },
                      { text: "Fish Sauce (Patis) or Soy Sauce", baseQty: 30, unit: "ml" }, // 2 tbsp
                      { text: "Cooking Oil", baseQty: 15, unit: "ml" }, // 1 tbsp
                      { text: "Salt and Pepper", baseQty: null, unit: "to taste" }
                  ],
                  instructions: ["Heat oil in a pot or large pan over medium heat. Sauté onion and garlic until fragrant.", "Add chicken pieces and cook until lightly browned.", "Pour in the reserved pineapple syrup and add fish sauce (or soy sauce). Bring to a boil.", "Lower the heat, cover, and simmer for 20-25 minutes or until chicken is tender.", "Add pineapple chunks, bell peppers, and carrots (if using). Cook for 5 minutes.", "Stir in the all-purpose cream or evaporated milk. Simmer gently for another 5 minutes, stirring occasionally, until the sauce slightly thickens. Do not boil rapidly after adding cream.", "Season with salt and pepper to taste.", "Serve hot with rice."]
              }
        ],
        beef: [
            // --- ADD ALL BEEF RECIPES HERE IN THE NEW FORMAT ---
             {
                 name: "Beef Kaldereta", time: "90 mins+", difficulty: "Medium", icon: "fa-solid fa-spoon",
                 desc: "A hearty Filipino beef stew in a tomato-based sauce with liver spread and vegetables.",
                 img: "https://cdn.sanity.io/images/f3knbc2s/production/f74d8aed0419d87b41895136fede06b671ed0482-2500x1500.jpg",
                 baseMeatWeight: 1000, // 1kg base
                 ingredients: [
                     { text: "Onion, chopped", baseQty: 1, unit: "large pcs" },
                     { text: "Garlic, minced", baseQty: 4, unit: "cloves" },
                     { text: "Tomato Sauce", baseQty: 425, unit: "ml" }, // Approx 15 oz can
                     { text: "Liver Spread or Pate", baseQty: 120, unit: "ml" }, // Approx 1/2 cup
                     { text: "Potatoes, peeled and cubed", baseQty: 2, unit: "medium pcs" },
                     { text: "Carrots, peeled and sliced", baseQty: 2, unit: "medium pcs" },
                     { text: "Red Bell Pepper, sliced", baseQty: 1, unit: "pcs" },
                     { text: "Green Bell Pepper, sliced", baseQty: 1, unit: "pcs" },
                     { text: "Green Olives (optional)", baseQty: 80, unit: "ml" }, // Approx 1/2 cup
                     { text: "Bay Leaves", baseQty: 4, unit: "pcs" },
                     { text: "Beef Broth or Water", baseQty: 240, unit: "ml" }, // 1 cup
                     { text: "Cooking Oil", baseQty: 30, unit: "ml" }, // 2 tbsp
                     { text: "Salt and Pepper", baseQty: null, unit: "to taste" },
                     { text: "Grated Cheese for topping (optional)", baseQty: null, unit: "to taste"}
                 ],
                 instructions: ["Heat oil in a large pot or Dutch oven over medium-high heat. Sear the beef cubes until browned on all sides. Remove beef and set aside.", "In the same pot, sauté onion and garlic until softened and fragrant.", "Return the beef to the pot. Add tomato sauce, liver spread, bay leaves, and beef broth/water.", "Bring to a boil, then reduce heat to low, cover, and simmer for 1.5 - 2 hours, or until the beef is very tender (add more water if it becomes too dry).", "Add potatoes and carrots. Cover and cook for 15-20 minutes more, or until vegetables are tender.", "Stir in bell peppers and olives (if using). Cook for another 5 minutes.", "Season with salt and pepper to taste.", "Remove bay leaves before serving. Top with grated cheese if desired.", "Serve hot with steamed rice."]
             },
             {
                  name: "Beef Mechado", time: "75 mins+", difficulty: "Medium", icon: "fa-solid fa-carrot",
                  desc: "Tender beef braised in soy sauce, calamansi juice, and tomato sauce.",
                  img: "https://www.foxyfolksy.com/wp-content/uploads/2019/09/mechado-640.jpg",
                  baseMeatWeight: 1000, // 1kg base
                  ingredients: [
                      { text: "Pork Fat Strips (optional, for larding)", baseQty: null, unit: "few strips" },
                      { text: "Soy Sauce", baseQty: 120, unit: "ml" }, // 1/2 cup
                      { text: "Calamansi Juice (or Lemon Juice)", baseQty: 60, unit: "ml" }, // 1/4 cup
                      { text: "Tomato Sauce", baseQty: 225, unit: "ml" }, // Approx 8 oz can
                      { text: "Large Onion, sliced", baseQty: 1, unit: "pcs" },
                      { text: "Garlic, minced", baseQty: 4, unit: "cloves" },
                      { text: "Potatoes, peeled and quartered", baseQty: 2, unit: "medium pcs" },
                      { text: "Carrot, sliced thickly", baseQty: 1, unit: "medium pcs" },
                      { text: "Red Bell Pepper, cut into squares", baseQty: 1, unit: "pcs" },
                      { text: "Bay Leaves", baseQty: 2, unit: "pcs" },
                      { text: "Beef Broth or Water", baseQty: 240, unit: "ml" }, // 1 cup
                      { text: "Cooking Oil", baseQty: 30, unit: "ml" }, // 2 tbsp
                      { text: "Salt and Pepper", baseQty: null, unit: "to taste" }
                  ],
                  instructions: ["Optional Larding: Make small incisions in the beef roast and insert strips of pork fat.", "Marinate the beef in soy sauce and calamansi juice for at least 30 minutes.", "Heat oil in a pot. Sear the marinated beef on all sides until browned. Remove beef and set aside.", "Sauté onion and garlic in the same pot until fragrant.", "Return beef to the pot. Add the marinade, tomato sauce, beef broth/water, and bay leaves.", "Bring to a boil, then lower heat, cover, and simmer for 1.5 - 2 hours, or until beef is tender.", "Add potatoes and carrots. Cook covered for 15-20 minutes until tender.", "Add the bell pepper and cook for another 5 minutes.", "Season with salt and pepper to taste. Remove bay leaves.", "Slice the beef roast before serving with the sauce and vegetables over rice."]
              },
              {
                  name: "Filipino Beef Tapa", time: "30 mins + Marinating", difficulty: "Easy", icon: "fa-solid fa-egg",
                  desc: "Thinly sliced cured beef, pan-fried until caramelized. A breakfast favorite.",
                  img: "https://www.foxyfolksy.com/wp-content/uploads/2017/09/beef-tapa-640.jpg",
                  baseMeatWeight: 500, // 500g base
                  ingredients: [
                      { text: "Soy Sauce", baseQty: 60, unit: "ml" }, // 1/4 cup
                      { text: "Calamansi Juice or Vinegar", baseQty: 30, unit: "ml" }, // 2 tbsp
                      { text: "Garlic, minced", baseQty: 4, unit: "cloves" },
                      { text: "Brown Sugar", baseQty: 15, unit: "ml" }, // 1-2 tbsp -> use 1.5 avg
                      { text: "Black Pepper", baseQty: 0.5, unit: "tsp" },
                      { text: "Salt", baseQty: 1, unit: "pinch" }, // Non-scalable
                      { text: "Cooking Oil for frying", baseQty: 45, unit: "ml" } // 2-3 tbsp -> use 2.5 avg
                  ],
                  instructions: ["In a bowl, combine marinade ingredients: soy sauce, calamansi/vinegar, garlic, brown sugar, pepper, and salt. Mix well.", "Add the thinly sliced beef to the marinade, ensuring all pieces are coated. Cover and refrigerate for at least 4 hours, or preferably overnight.", "Heat cooking oil in a frying pan or skillet over medium-high heat.", "Remove beef from the marinade, letting excess drip off slightly.", "Place beef slices in the hot pan in a single layer (cook in batches if necessary).", "Fry for 2-4 minutes per side, or until cooked through and slightly caramelized at the edges. Adjust cooking time based on desired doneness.", "Do not overcook, as it can become tough.", "Serve immediately, typically with garlic fried rice (sinangag) and a fried egg (itlog) for Tapsilog."]
             }
        ],
         fish: [
            // --- ADD ALL FISH RECIPES HERE IN THE NEW FORMAT ---
            {
                  name: "Sinigang na Isda", time: "30 mins", difficulty: "Easy", icon: "fa-solid fa-fish-fins",
                  desc: "A light and sour Filipino fish soup using tamarind broth with vegetables.",
                  img: "https://www.maggi.ph/sites/default/files/styles/image_744_x_419/public/srh_recipes/48ce3132d5a437e6977cd0c6df0f094d.jpg?h=561fe1eb&itok=1tOMxI7T",
                  baseMeatWeight: 500, // 500g base
                  ingredients: [
                      { text: "Tamarind Soup Base (Sinigang Mix)", baseQty: 1, unit: "packet" },
                      { text: "Large Onion, quartered", baseQty: 1, unit: "pcs" },
                      { text: "Medium Tomatoes, quartered", baseQty: 2, unit: "pcs" },
                      { text: "Daikon Radish (Labanos), sliced", baseQty: 1, unit: "pcs" },
                      { text: "String Beans (Sitaw), cut", baseQty: 1, unit: "bundle" },
                      { text: "Okra", baseQty: 6, unit: "pcs" },
                      { text: "Water Spinach (Kangkong) or Bok Choy", baseQty: 1, unit: "bundle" },
                      { text: "Finger Chilies (Siling Pangsigang, optional)", baseQty: 3, unit: "pcs" },
                      { text: "Fish Sauce (Patis)", baseQty: null, unit: "to taste" },
                      { text: "Water or Rice Washing", baseQty: 1600, unit: "ml" } // Approx 6-8 cups -> 7 cups
                  ],
                  instructions: ["In a pot, combine water/rice washing, onion, and tomatoes. Bring to a boil.", "Add tamarind soup base (or fresh tamarind) and radish. Simmer for 5 minutes.", "Gently add the fish pieces. Lower heat and simmer for 8-10 minutes, or until fish is cooked through (do not overcook).", "Add string beans, okra, and finger chilies (if using). Cook for 3-5 minutes until tender-crisp.", "Add water spinach or bok choy and cook for 1 minute until wilted.", "Season carefully with fish sauce (patis) to taste.", "Serve immediately."]
             },
             {
                  name: "Paksiw na Isda", time: "25 mins", difficulty: "Easy", icon: "fa-solid fa-fish",
                  desc: "Fish simmered gently in vinegar, garlic, ginger, and peppercorns.",
                  img: "https://www.maggi.ph/sites/default/files/styles/home_stage_1500_700/public/srh_recipes/41b263bf239ea5e6125956c96bca84a4.jpg?h=28121b77&itok=EZuzNQDe",
                  baseMeatWeight: 500, // 500g base
                  ingredients: [
                      { text: "White Vinegar", baseQty: 240, unit: "ml" }, // 1 cup
                      { text: "Water", baseQty: 120, unit: "ml" }, // 1/2 cup
                      { text: "Garlic, crushed", baseQty: 5, unit: "cloves" },
                      { text: "Ginger, sliced", baseQty: 1, unit: "thumb" }, // Description based
                      { text: "Whole Peppercorns", baseQty: 1, unit: "tsp" },
                      { text: "Finger Chilies (Siling Pangsigang)", baseQty: 2, unit: "pcs" },
                      { text: "Salt", baseQty: null, unit: "to taste" },
                      { text: "Sliced Eggplant (Optional)", baseQty: 0.5, unit: "pcs" }, // Scalable pieces
                      { text: "Sliced Bitter Gourd (Ampalaya, Optional)", baseQty: 0.5, unit: "pcs" } // Scalable pieces
                  ],
                  instructions: ["Arrange optional vegetables (if using) at the bottom of a pot.", "Place the fish on top of the vegetables.", "Add vinegar, water, garlic, ginger, peppercorns, and finger chilies.", "Bring the mixture to a boil without covering.", "Once boiling, lower the heat, cover the pot, and simmer gently for 15-20 minutes, or until the fish is cooked through and vegetables are tender.", "Season with salt to taste during the last few minutes of cooking.", "Serve hot with rice."]
             },
             {
                  name: "Fish Kinilaw", time: "20 mins + Marinating", difficulty: "Easy", icon: "fa-regular fa-lemon",
                  desc: "Filipino ceviche where fresh fish is 'cooked' by vinegar or citrus juice.",
                  img: "https://nutriasia.com/wp-content/uploads/2018/10/kinilawThumb.jpg",
                  baseMeatWeight: 500, // 500g base (Sushi-Grade Tuna, Tanigue recommended)
                  ingredients: [
                      { text: "Coconut Vinegar or Cane Vinegar", baseQty: 240, unit: "ml" }, // 1 cup
                      { text: "Calamansi or Lime Juice (optional)", baseQty: 60, unit: "ml" }, // 1/4 cup
                      { text: "Red Onion, chopped finely", baseQty: 1, unit: "large pcs" },
                      { text: "Ginger, minced or grated", baseQty: 2, unit: "thumbs" }, // Description based
                      { text: "Red Chili Peppers (Siling Labuyo), chopped", baseQty: 3, unit: "pcs" }, // Adjust heat
                      { text: "Salt", baseQty: 0.5, unit: "tsp" }, // Adjust to taste
                      { text: "Black Pepper", baseQty: 0.25, unit: "tsp" },
                      { text: "Cucumber, chopped (Optional)", baseQty: 0.5, unit: "pcs" },
                      { text: "Bell Pepper, chopped (Optional)", baseQty: 0.5, unit: "pcs" },
                      { text: "Coconut Milk (Optional, Visayan style)", baseQty: 60, unit: "ml" } // Approx 1/4 cup, add at end
                  ],
                  instructions: ["Wash the fish cubes gently and drain thoroughly.", "In a non-metallic bowl (glass or ceramic), combine the fish cubes, vinegar, calamansi/lime juice (if using), onion, ginger, and chili peppers.", "Mix gently but thoroughly.", "Season with salt and pepper.", "Cover the bowl and refrigerate for at least 15-30 minutes to allow the acids to 'cook' the fish and flavors to meld. The fish will become opaque.", "For Visayan style, you can drain some of the vinegar after initial marination and stir in a bit of fresh coconut milk just before serving.", "Taste and adjust seasoning if necessary.", "Serve chilled as an appetizer."]
             }
        ]
        // Add other meat types (lamb, etc.) if needed
    };
    // ========================================================================
    // == END OF RECIPE DATA ==================================================
    // ========================================================================


    // --- Helper Functions ---
    const POUND_TO_GRAM = 453.592;
    // Define which ingredient units are numerically scalable
    const SCALABLE_UNITS = ['g', 'kg', 'ml', 'l', 'oz', 'cup', 'tbsp', 'tsp', 'pcs', 'cloves', 'can']; // Added 'can' as potentially scalable (though might be better as description)
    // Define units that need careful rounding (e.g., to nearest half or whole)
    const SMALL_UNITS = ['tsp', 'tbsp', 'cloves', 'pcs', 'leaves'];

    /**
     * Converts various weight units to grams.
     */
    const convertToGrams = (value, unit) => {
        if (isNaN(value) || value <= 0) return 0;
        switch (unit.toLowerCase()) {
            case 'kg':
                return value * 1000;
            case 'lbs':
                return value * POUND_TO_GRAM;
            case 'g':
            default:
                return value;
        }
    };

    /**
     * Formats a scaled quantity for display.
     */
    const formatQuantity = (quantity, unit) => {
        if (quantity === null || isNaN(quantity) || quantity <= 0) return ""; // Return empty string if not formattable

        const u = unit ? unit.toLowerCase() : "";

        if (SMALL_UNITS.includes(u)) {
            if (quantity < 0.25) return ""; // Too small, omit quantity for these units
            const rounded = Math.round(quantity * 2) / 2; // Round to nearest 0.5
            if (rounded === 0.5) return "½";
            return rounded % 1 === 0 ? rounded.toString() : `${Math.floor(rounded)}½`;
        } else if (u === 'can') {
             const rounded = Math.round(quantity * 2) / 2;
             if (rounded < 0.5) return ""; // Less than half a can might not make sense
             if (rounded === 0.5) return "½";
             return rounded % 1 === 0 ? rounded.toString() : `${Math.floor(rounded)}½`;
        } else if (quantity < 10 && quantity % 1 !== 0) {
            // Show one decimal place for small non-whole numbers (like 1.5 ml)
             return quantity.toFixed(1);
        } else if (quantity >= 1) {
            // Round larger numbers or whole numbers to nearest integer
            return Math.round(quantity).toString();
        } else {
            // Handle cases like 0.3g - show one decimal? Or omit?
             return quantity.toFixed(1); // Show one decimal for < 1 non-small units
        }
    };


    /**
     * Validates number input field.
     */
    const validateInput = (input, errorElement, errorMessage) => {
        clearError(input, errorElement); // Clear existing error first
        const value = parseFloat(input.value); // Use parseFloat for decimals
        if (input.value.trim() === '' || isNaN(value) || value <= 0) { // Check empty string too
            showError(input, errorElement, errorMessage);
            return false;
        }
        return true;
    };

    /**
     * Shows error message for an input field.
     */
    const showError = (input, errorElement, message) => {
        input.classList.add('input-error');
        // Handle combined weight input styling
        if (input.id === 'meatWeight') {
            input.closest('.weight-input-container')?.classList.add('input-error');
            meatWeightUnitSelect.classList.add('input-error'); // Also style the select
        } else if (input.tagName === 'SELECT') {
             input.closest('.select-wrapper')?.classList.add('input-error');
        }

        const parentGroup = input.closest('.input-group');
        const targetErrorElement = parentGroup ? parentGroup.querySelector('.error-message') : errorElement;
        if (targetErrorElement) {
            targetErrorElement.textContent = message;
            // Force opacity style for visibility
             targetErrorElement.style.opacity = '1';
        }
    };

    /**
     * Clears error message for an input field.
     */
    const clearError = (input, errorElement) => {
        input.classList.remove('input-error');
         // Handle combined weight input styling
         if (input.id === 'meatWeight') {
            input.closest('.weight-input-container')?.classList.remove('input-error');
             meatWeightUnitSelect.classList.remove('input-error'); // Clear error from select too
        } else if (input.tagName === 'SELECT') {
             input.closest('.select-wrapper')?.classList.remove('input-error');
        }

        const parentGroup = input.closest('.input-group');
        const targetErrorElement = parentGroup ? parentGroup.querySelector('.error-message') : errorElement;
        if (targetErrorElement) {
             targetErrorElement.textContent = '';
             targetErrorElement.style.opacity = '0'; // Hide error smoothly
        }
    };


    /**
     * Calculates the number of servings.
     */
    const calculateServings = (totalWeightInGrams, portionPerPersonInGrams) => {
        if (portionPerPersonInGrams <= 0 || totalWeightInGrams <=0 ) return 0;
        return Math.floor(totalWeightInGrams / portionPerPersonInGrams);
    };

    /**
     * Gets cooking recommendations for a meat type.
     */
    const getRecommendations = (meatType) => {
        return recommendationsData[meatType] || { cooking: 'N/A', time: 'N/A', seasoning: 'N/A' };
    };

    // Global variable to store portion size used in calculation
    let portionGrams = 0;

    /**
     * Displays calculation results.
     */
    const displayResults = (servings, recommendations) => {
        resultPlaceholder.classList.add('hidden');
        resultList.innerHTML = '';

        const servingsText = servings > 0 ? (servings + (servings === 1 ? " serving" : " servings")) : "Less than 1 serving";

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
        void resultList.offsetWidth; // Trigger reflow
        resultList.classList.add('visible');
    };


    // --- Modal Functions ---
    let lastFocusedElement;

    /**
     * Opens the recipe modal with scaled ingredients.
     */
    const openRecipeModal = (recipe, currentMeatWeightGrams) => {
        if (!recipe || !recipe.ingredients) {
             console.error("Recipe data missing or invalid for modal:", recipe);
             alert("Sorry, there was an error loading the recipe details."); // User-friendly message
             return;
        }

        lastFocusedElement = document.activeElement;

        // --- Ingredient Scaling Logic ---
        let scalingFactor = 1;
        const baseWeight = recipe.baseMeatWeight;

        if (baseWeight && baseWeight > 0 && currentMeatWeightGrams && currentMeatWeightGrams > 0) {
            scalingFactor = currentMeatWeightGrams / baseWeight;
        } else {
            console.warn("Could not calculate scaling factor. Using base recipe.", { baseWeight, currentMeatWeightGrams });
            // Optional: Inform the user that base amounts are shown?
        }
        // --- End Scaling Logic ---


        // Populate Modal Content
        modalRecipeImage.src = recipe.img || 'placeholder-image.jpg';
        modalRecipeImage.alt = recipe.name || 'Recipe Image';
        modalRecipeTitle.textContent = recipe.name || 'Recipe Details';
        modalRecipeDesc.textContent = recipe.desc || 'No description available.';

        // --- Populate Scaled Ingredients ---
        modalIngredientsList.innerHTML = ''; // Clear previous
        if (recipe.ingredients && recipe.ingredients.length > 0) {
             // Add the user's meat amount as the first item
            const meatLi = document.createElement('li');
            const meatName = recipe.name.split(" ")[1] || "Meat"; // Simple extraction
            meatLi.innerHTML = `<strong>${currentMeatWeightGrams.toFixed(0)}g</strong> ${meatName} (Your Amount)`;
            modalIngredientsList.appendChild(meatLi);

            // Add separator
            const separatorLi = document.createElement('li');
            separatorLi.innerHTML = `<hr style="border: none; border-top: 1px dashed var(--border-color); margin: 10px 0;">`;
            modalIngredientsList.appendChild(separatorLi);


            recipe.ingredients.forEach(item => {
                const li = document.createElement('li');
                let displayText = item.text || "";
                let displayQuantity = "";
                const unit = item.unit || "";

                // Check if the ingredient is scalable
                if (item.baseQty !== null && typeof item.baseQty === 'number' && unit && SCALABLE_UNITS.includes(unit.toLowerCase())) {
                    const scaledQty = item.baseQty * scalingFactor;
                    displayQuantity = formatQuantity(scaledQty, unit);
                    if (displayQuantity) {
                        // Add quantity and unit BEFORE the text
                        displayText = `<strong>${displayQuantity}${unit}</strong> ${displayText}`;
                    } else {
                    }
                } else if (item.baseQty && unit && !['to taste', 'enough to cover', 'pinch', 'handful', 'thumb-sized', 'stalks', 'thumb'].includes(unit.toLowerCase())) {
                     // For non-scalable items with quantity/unit (like '1 packet', '3 pcs') show base qty/unit
                     displayText = `<strong>${item.baseQty} ${unit}</strong> ${displayText}`;
                } else if (unit) {
                    // Handle descriptive units like "to taste", "pinch", "thumb-sized"
                     displayText = `${displayText} (${unit})`; // e.g. Salt (to taste)
                }
                // If only text, it remains as is.

                li.innerHTML = displayText; // Use innerHTML to render <strong>
                modalIngredientsList.appendChild(li);
            });
        } else {
            modalIngredientsList.innerHTML = '<li>Ingredients not available.</li>';
        }
        // --- End Scaled Ingredients ---


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
        recipeModal.querySelector('.modal-content').scrollTop = 0; // Scroll modal to top
        modalCloseBtn.focus();
    };

    /**
     * Closes the recipe modal.
     */
    const closeRecipeModal = () => {
        recipeModal.classList.remove('active');
        recipeModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    /**
     * Displays recipe suggestion cards.
     */
    const displayRecipeSuggestions = (meatType, currentMeatWeightGrams) => {
        recipePlaceholder.classList.add('hidden'); // Hide placeholder
        suggestionCardsContainer.innerHTML = ''; // Clear previous cards
        suggestionCardsContainer.classList.remove('visible', 'hidden'); // Reset visibility

        const recipes = recipesData[meatType] || [];

        if (recipes.length === 0) {
             recipePlaceholder.textContent = "No specific recipe ideas found for this meat type yet.";
             recipePlaceholder.classList.remove('hidden'); // Show placeholder
             suggestionCardsContainer.classList.add('hidden'); // Hide card container
             return;
        }

         suggestionCardsContainer.classList.remove('hidden'); // Ensure container is ready

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View recipe details for ${recipe.name}`);

            const difficultyClass = `difficulty-${recipe.difficulty.toLowerCase()}`;

            card.innerHTML = `
              <div class="suggestion-img-container">
                 <img src="${recipe.img}" alt="${recipe.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                 <i class="fa-solid fa-utensils" style="display: none; font-size: 4rem; color: var(--text-light); opacity: 0.5;"></i> <!-- Fallback Icon -->
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

            // Attach event listener to open modal with scaling
            const actionHandler = () => {
                openRecipeModal(recipe, currentMeatWeightGrams); // Pass weight here
            };

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
        void suggestionCardsContainer.offsetWidth; // Trigger reflow
        suggestionCardsContainer.classList.add('visible');
    };


    // --- Event Listeners ---

    // Toggle custom portion input visibility
    portionSizeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customPortionGroup.classList.remove('hidden');
            customPortionInput.required = true; // Make required only when visible
            customPortionInput.focus();
        } else {
            customPortionGroup.classList.add('hidden');
            customPortionInput.required = false;
            customPortionInput.value = '';
            clearError(customPortionInput, customPortionError);
        }
    });

    // Form submission handler
    meatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const originalButtonText = calculateBtn.innerHTML;
        calculateBtn.disabled = true;
        calculateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';

        // Reset UI state
        resultList.classList.remove('visible');
        resultList.classList.add('hidden');
        resultPlaceholder.classList.remove('hidden');
        suggestionCardsContainer.classList.remove('visible');
        suggestionCardsContainer.classList.add('hidden');
        recipePlaceholder.classList.remove('hidden'); // Show placeholder initially


        // --- Validation ---
        let isValid = true;
        // Clear errors before re-validating
        clearError(meatWeightInput, meatWeightError);
        // meatWeightUnitSelect doesn't have its own error span, uses meatWeightError
        if (portionSizeSelect.value === 'custom') {
            clearError(customPortionInput, customPortionError);
        }

        // Validate numerical weight input
        if (!validateInput(meatWeightInput, meatWeightError, 'Please enter a valid weight number.')) {
            isValid = false;
        }

        // Get weight and unit
        const rawWeightValue = parseFloat(meatWeightInput.value);
        const selectedUnit = meatWeightUnitSelect.value;
        const meatWeightInGrams = convertToGrams(rawWeightValue, selectedUnit);

        // Re-validate specifically for zero/negative grams after conversion
        // Only if the initial numeric validation passed
        if (isValid && meatWeightInGrams <= 0) {
             showError(meatWeightInput, meatWeightError, 'Weight must be a positive value.');
             isValid = false;
        }

        // Validate portion size
        const selectedPortionOption = portionSizeSelect.value;
        portionGrams = 0; // Reset global

        if (selectedPortionOption === 'custom') {
            if (!validateInput(customPortionInput, customPortionError, 'Enter a positive custom portion.')) {
                isValid = false;
            } else {
                 portionGrams = parseFloat(customPortionInput.value);
                 // Extra check if parsing failed or value is non-positive
                 if(isNaN(portionGrams) || portionGrams <= 0) {
                     showError(customPortionInput, customPortionError, 'Custom portion must be positive.');
                     isValid = false;
                 }
            }
        } else {
            portionGrams = portionSizes[selectedPortionOption] || portionSizes.medium;
        }

        // --- Handle Validation Fail ---
        if (!isValid) {
            calculateBtn.disabled = false;
            calculateBtn.innerHTML = originalButtonText;
            // Find first element with error for focus
            const firstErrorInput = meatForm.querySelector('.input-error');
            if (firstErrorInput) {
                firstErrorInput.focus();
                // Scroll the input's group into view smoothly
                firstErrorInput.closest('.input-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return; // Stop processing
        }

        // --- Calculation & UI Update ---
        const meatType = meatTypeSelect.value;
        const currentMeatWeightGrams = meatWeightInGrams; // Use for clarity

        // Use setTimeout to allow spinner to render
        setTimeout(() => {
            try { // Add try-catch for safety during calculation/display
                const servingsNum = calculateServings(currentMeatWeightGrams, portionGrams);
                const recommendations = getRecommendations(meatType);

                displayResults(servingsNum, recommendations);
                displayRecipeSuggestions(meatType, currentMeatWeightGrams); // Pass weight for scaling

                // Scroll to results/suggestions only after successful calculation
                 recipeSuggestionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } catch (error) {
                 console.error("Error during calculation or display:", error);
                 // Optionally show a user-friendly error message on the page
                 resultPlaceholder.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i><p>Sorry, an error occurred. Please try again.</p>`;
                 resultPlaceholder.classList.remove('hidden');

            } finally {
                 // Always re-enable the button
                 calculateBtn.disabled = false;
                 calculateBtn.innerHTML = originalButtonText;
            }

        }, 300); // Short delay
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
    // Hide results list, show placeholder
    resultList.classList.add('hidden');
    resultPlaceholder.classList.remove('hidden');
    // Hide suggestions, show placeholder
    suggestionCardsContainer.classList.add('hidden');
    recipePlaceholder.classList.remove('hidden');

    // Ensure custom portion is hidden initially if not selected
    if (portionSizeSelect.value !== 'custom') {
            customPortionGroup.classList.add('hidden');
            customPortionInput.required = false;
    }

}); // End DOMContentLoaded
