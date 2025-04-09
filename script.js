document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const meatForm = document.getElementById('meatForm');
    const portionSizeSelect = document.getElementById('portionSize');
    const customPortionGroup = document.getElementById('customPortionGroup');
    const customPortionInput = document.getElementById('customPortion');
    const meatTypeSelect = document.getElementById('meatType');
    const meatWeightInput = document.getElementById('meatWeight');
    const meatWeightUnitSelect = document.getElementById('meatWeightUnit');
    const calculateBtn = document.getElementById('calculateBtn');

    const resultsWrapper = document.getElementById('resultsWrapper');
    const resultPlaceholder = document.getElementById('resultPlaceholder');
    const resultList = document.getElementById('resultList');
    const resultLoadingIndicator = document.getElementById('resultLoadingIndicator');

    const recipeSuggestionsSection = document.getElementById('recipes');
    const recipePlaceholder = document.getElementById('recipePlaceholder');
    const suggestionCarouselContainer = document.getElementById('suggestionCarouselContainer');
    const recipeSwiperWrapper = document.getElementById('recipeSwiperWrapper');
    const recipeLoadingIndicator = document.getElementById('recipeLoadingIndicator');

    const recipeModal = document.getElementById('recipeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalRecipeImage = document.getElementById('modalRecipeImage');
    const modalImagePlaceholder = document.querySelector('.modal-image-placeholder'); // Get placeholder SVG
    const modalRecipeTitle = document.getElementById('recipeModalTitle');
    const modalRecipeDesc = document.getElementById('modalRecipeDesc');
    const modalIngredientsList = document.getElementById('modalIngredientsList');
    const modalInstructionsList = document.getElementById('modalInstructionsList');

    const currentYearSpan = document.getElementById('currentYear');

    // --- Data ---
    const portionSizes = { small: 100, medium: 150, large: 200 };
    const recommendationsData = {
       pork: { cooking: "Roast, Grill, Pan-fry, Stew, Adobo", time: "≈25-30m / 500g Roast", seasoning: "Garlic, Soy, Vinegar, Pepper, Bay Leaf, Paprika" },
       chicken: { cooking: "Roast, Grill, Stew, Fry, Tinola, Inasal", time: "≈20-25m / 500g Roast", seasoning: "Lemon, Ginger, Garlic, Onion, Annatto, Lemongrass" },
       beef: { cooking: "Grill, Stew, Roast, Braise, Tapa, Bistek", time: "Varies (≈18m Grill, 90m+ Stew)", seasoning: "Salt, Pepper, Soy, Calamansi, Garlic, Onion, Tomato" },
       fish: { cooking: "Bake, Pan-fry, Steam, Grill, Sinigang, Paksiw", time: "≈10-20m (method dependent)", seasoning: "Lemon, Vinegar, Ginger, Garlic, Tomato, Tamarind, Patis" },
    };

    // ========================================================================
    // == Recipe Data  =====================================
    // ========================================================================
    const recipesData = {
        pork: [
            {
                name: "Classic Pork Adobo",
                time: "45 mins",
                difficulty: "Easy",
                icon: "fa-solid fa-pepper-hot",
                desc: "A savory and tangy Filipino staple, slow-braised to perfection with soy sauce, vinegar, garlic, and spices.",
                img: "https://salu-salo.com/wp-content/uploads/2015/04/Pork-Adobo-3.jpg", // Image present
                baseMeatWeight: 1000,
                ingredients: [
                    { text: "Soy Sauce", baseQty: 120, unit: "ml" },
                    { text: "White Vinegar (Cane or Coconut preferred)", baseQty: 60, unit: "ml" },
                    { text: "Garlic, crushed", baseQty: 1, unit: "head" },
                    { text: "Whole Peppercorns, lightly crushed", baseQty: 1, unit: "tsp" },
                    { text: "Dried Bay Leaves", baseQty: 3, unit: "pcs" },
                    { text: "Water or Broth", baseQty: 120, unit: "ml" },
                    { text: "Cooking Oil (optional, for browning)", baseQty: 30, unit: "ml" }
                ],
                instructions: ["Combine pork, soy sauce, and garlic in a pot. Marinate for at least 30 minutes (optional but recommended).", "Add water/broth, whole peppercorns, and bay leaves.", "Bring to a boil over medium-high heat.", "Lower heat, cover, and simmer for 30-40 minutes, or until pork is tender, adding a bit more water if it dries out too much.", "Add vinegar. Do not stir. Increase heat slightly and let it boil gently for 5 minutes to cook off the harshness.", "Simmer uncovered for another 10-15 minutes, stirring occasionally, to reduce and thicken the sauce.", "Optional: Remove pork from sauce, heat oil in a separate pan, and brown the pork pieces until slightly crisp. Return to sauce.", "Serve hot with steamed rice."]
            },
            {
                name: "Crispy Lechon Kawali",
                time: "60 mins + Drying",
                difficulty: "Medium",
                icon: "fa-solid fa-bacon",
                desc: "Deep-fried pork belly boasting incredibly crunchy skin (crackling) and succulent, tender meat.",
                img: "https://static01.nyt.com/images/2023/11/28/multimedia/ND-Lechon-Kawali-bflv/ND-Lechon-Kawali-bflv-mediumSquareAt3X.jpg", // Image present
                baseMeatWeight: 1000,
                ingredients: [
                    { text: "Water for boiling", baseQty: null, unit: "enough to cover pork" },
                    { text: "Salt (for boiling)", baseQty: 15, unit: "ml" },
                    { text: "Whole Peppercorns (for boiling)", baseQty: 1, unit: "tsp" },
                    { text: "Bay Leaves (for boiling)", baseQty: 3, unit: "pcs" },
                    { text: "Garlic cloves, crushed (for boiling, optional)", baseQty: 4, unit: "cloves" },
                    { text: "Salt (for rubbing skin)", baseQty: 1, unit: "tsp" },
                    { text: "Cooking Oil for deep frying", baseQty: null, unit: "enough for deep frying (at least 2-3 inches deep)" }
                ],
                instructions: ["Place pork belly in a pot. Add enough water to cover completely. Add salt (15ml), peppercorns, bay leaves, and optional garlic.", "Bring to a boil, skimming off any impurities that rise to the surface.", "Lower heat, cover loosely, and simmer for 45-60 minutes or until the meat is tender but not falling apart.", "Carefully remove pork from the pot and place on a wire rack to cool slightly.", "Pat the entire surface, especially the skin, completely dry with paper towels. This is CRUCIAL for crispiness.", "Prick the skin all over with a fork, skewer, or knife tip (avoid piercing the meat). Rub the skin evenly with salt (1 tsp).", "Air dry the pork belly, uncovered, on a wire rack set over a tray in the refrigerator for at least 4-6 hours, ideally overnight. The drier the skin, the crispier it will be.", "Heat oil in a deep, heavy-bottomed pot or wok to 350-375°F (175-190°C) over medium-high heat.", "Carefully lower the dried pork belly into the hot oil, skin-side down. Use a splatter screen as it will splatter violently.", "Fry for 15-25 minutes, maintaining the temperature, until the skin is golden brown, blistered, and very crispy.", "Carefully flip the pork belly using tongs and fry the meat side for another 5-10 minutes until golden brown.", "Remove from oil and drain on a wire rack. Let it rest for at least 10-15 minutes before chopping.", "Chop into bite-sized pieces and serve immediately with lechon sauce (Mang Tomas) or spiced vinegar."]
            },
            {
                name: "Pork Sinigang",
                time: "50 mins",
                difficulty: "Easy",
                icon: "fa-solid fa-bowl-food",
                desc: "A comforting sour and savory tamarind-based soup, loaded with tender pork ribs or belly and various vegetables.",
                img: "https://images.yummy.ph/yummy/uploads/2019/03/sinigangbaboysamiso-recipe-1.jpg", // Image present
                baseMeatWeight: 500,
                ingredients: [
                    { text: "Tamarind Soup Base (Sinigang Mix)", baseQty: 1, unit: "packet (approx 40g)" },
                    { text: "Large Onion, quartered", baseQty: 1, unit: "pcs" },
                    { text: "Medium Tomatoes, quartered", baseQty: 2, unit: "pcs" },
                    { text: "Daikon Radish (Labanos), peeled and sliced", baseQty: 1, unit: "medium pcs" },
                    { text: "String Beans (Sitaw), cut into 2-inch lengths", baseQty: 1, unit: "bundle (approx 150g)" },
                    { text: "Okra, ends trimmed", baseQty: 8, unit: "pcs" },
                    { text: "Water Spinach (Kangkong) or Bok Choy leaves", baseQty: 1, unit: "bundle (approx 200g)" },
                    { text: "Taro (Gabi), peeled and cubed (optional, for thickening)", baseQty: 2, unit: "small pcs" },
                    { text: "Finger Chilies (Siling Pangsigang, optional)", baseQty: 2, unit: "pcs" },
                    { text: "Fish Sauce (Patis)", baseQty: null, unit: "to taste" },
                    { text: "Water", baseQty: 1500, unit: "ml" }
                ],
                instructions: ["In a large pot, combine pork and water. Bring to a boil, skimming off any scum that rises to the surface.", "Add onion, tomatoes, and optional taro (gabi). Lower heat, cover, and simmer for 30-45 minutes, or until pork is tender (taro should also be soft if using).", "Add the tamarind soup base (Sinigang Mix) and Daikon radish. Stir well and simmer for 5-7 minutes.", "Add string beans, okra, and finger chilies (if using). Cook for another 3-5 minutes until vegetables are tender-crisp.", "Stir in the water spinach (or bok choy) and cook for 1 more minute until just wilted.", "Season with fish sauce (patis) according to your preference. Start with a tablespoon or two and add more as needed.", "Serve steaming hot, usually with rice."]
            },
            {
                name: "Pork Menudo",
                time: "60 mins",
                difficulty: "Medium",
                icon: "fa-solid fa-carrot",
                desc: "A popular Filipino stew with diced pork and liver in a rich tomato sauce with potatoes, carrots, and raisins.",
                img: "https://assets.unileversolutions.com/recipes-v2/214409.png", // Image present
                baseMeatWeight: 500, // + 250g Liver
                  ingredients: [
                    { text: "Pork Liver, diced", baseQty: 250, unit: "g" },
                    { text: "Soy Sauce (for marinade)", baseQty: 60, unit: "ml" },
                    { text: "Calamansi Juice or Lemon Juice (for marinade)", baseQty: 30, unit: "ml" },
                    { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" },
                    { text: "Garlic, minced", baseQty: 4, unit: "cloves" },
                    { text: "Tomato Sauce", baseQty: 225, unit: "ml" },
                    { text: "Water or Broth", baseQty: 240, unit: "ml" },
                    { text: "Potatoes, peeled and diced small", baseQty: 2, unit: "medium pcs" },
                    { text: "Carrots, peeled and diced small", baseQty: 1, unit: "large pcs" },
                    { text: "Red Bell Pepper, diced", baseQty: 1, unit: "medium pcs" },
                    { text: "Green Peas (frozen or canned)", baseQty: 80, unit: "ml" },
                    { text: "Raisins", baseQty: 80, unit: "ml" },
                    { text: "Bay Leaf", baseQty: 1, unit: "pcs" },
                    { text: "Cooking Oil", baseQty: 30, unit: "ml" },
                    { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" },
                    { text: "Sugar (optional, to balance acidity)", baseQty: 1, unit: "tsp" }
                ],
                instructions: ["In a bowl, marinate the diced pork (not the liver) in soy sauce and calamansi/lemon juice for at least 15-30 minutes.", "Heat half the oil in a pot or Dutch oven over medium-high heat. Lightly fry the diced potatoes and carrots until edges are slightly browned. Remove and set aside.", "Add the remaining oil. Sauté the diced liver quickly for 1-2 minutes until lightly browned (do not overcook). Remove and set aside.", "In the same pot, sauté onion and garlic until fragrant.", "Add the marinated pork (drain excess marinade but reserve it). Cook until lightly browned on all sides.", "Pour in the tomato sauce, reserved marinade, water/broth, and add the bay leaf. Bring to a boil.", "Lower heat, cover, and simmer for 20-30 minutes, or until the pork is tender.", "Add the pre-fried potatoes and carrots back into the pot. Simmer for 10-15 minutes until vegetables are fully cooked.", "Stir in the cooked liver, red bell pepper, green peas, and raisins. Cook for another 5 minutes.", "Season with salt, black pepper, and optional sugar to taste. Adjust sauce consistency with a little water if needed.", "Remove bay leaf before serving. Serve hot with steamed rice."]
            }
        ],
        chicken: [
            {
                name: "Chicken Tinola",
                time: "40 mins",
                difficulty: "Easy",
                icon: "fa-solid fa-drumstick-bite",
                desc: "A clear, gingery chicken soup with green papaya or chayote, and chili leaves, known for its clean and warming flavors.",
                img: "https://www.allrecipes.com/thmb/DffejbaV_BtbfcfuMfLZC5psayI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/212929-chicken-tinola-ddmfs-beauty-1x2-4792da9f161f41acb50bdd25b74c3d8e.jpg", // Image present
                baseMeatWeight: 1000,
                ingredients: [
                    { text: "Ginger, peeled and sliced thinly", baseQty: 2, unit: "thumb-sized pcs" },
                    { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" },
                    { text: "Garlic, minced", baseQty: 5, unit: "cloves" },
                    { text: "Small Green Papaya or Chayote (Sayote), peeled and sliced", baseQty: 1, unit: "pcs" },
                    { text: "Chili Leaves (Dahon ng Sili) or Malunggay Leaves", baseQty: 1, unit: "cup loosely packed" },
                    { text: "Fish Sauce (Patis)", baseQty: 45, unit: "ml" },
                    { text: "Water or Rice Washing (Hugas Bigas)", baseQty: 1600, unit: "ml" },
                    { text: "Cooking Oil", baseQty: 30, unit: "ml" },
                    { text: "Black pepper", baseQty: null, unit: "to taste" }
                ],
                instructions: ["Heat oil in a large pot over medium heat. Sauté ginger until fragrant (about 1-2 minutes).", "Add onion and garlic, sauté until onion is softened.", "Add chicken pieces and cook, stirring occasionally, until lightly browned on all sides.", "Season with fish sauce (patis) and cook, stirring, for 1-2 minutes.", "Pour in water or rice washing. Bring to a boil.", "Lower the heat, cover, and simmer for 20-25 minutes, or until the chicken is cooked through and tender.", "Add the green papaya or chayote slices. Simmer for 5-8 minutes until tender but not mushy.", "Stir in the chili leaves or malunggay leaves. Cook for another minute until wilted.", "Season with black pepper and add more fish sauce if needed, according to taste.", "Serve hot in bowls."]
            },
            {
                name: "Chicken Inasal",
                time: "30 mins + Marinating",
                difficulty: "Medium",
                icon: "fa-solid fa-fire",
                desc: "Smoky, vibrant grilled chicken from Bacolod, marinated and brushed with achiote oil.",
                img: "https://www.maggi.ph/sites/default/files/srh_recipes/fb57f76d3cd9b83f1509f030c7024b51.jpg", // Image present
                baseMeatWeight: 1000,
                ingredients: [
                    { text: "Coconut Vinegar", baseQty: 120, unit: "ml" },
                    { text: "Calamansi Juice (or 50/50 lemon/lime juice)", baseQty: 60, unit: "ml" },
                    { text: "Lemongrass, white part only, pounded and chopped", baseQty: 3, unit: "stalks" },
                    { text: "Ginger, minced", baseQty: 45, unit: "ml" },
                    { text: "Garlic, minced", baseQty: 8, unit: "cloves" },
                    { text: "Brown Sugar", baseQty: 15, unit: "ml" },
                    { text: "Salt", baseQty: 1, unit: "tsp" },
                    { text: "Black Pepper, freshly ground", baseQty: 0.5, unit: "tsp" },
                    { text: "Annatto/Achiote Oil", baseQty: 60, unit: "ml" },
                    { text: "Melted Butter or Margarine", baseQty: 60, unit: "ml" },
                    { text: "Garlic, minced (for basting)", baseQty: 2, unit: "cloves" },
                    { text: "Salt (for basting)", baseQty: 1, unit: "pinch" }
                ],
                instructions: ["In a large bowl or ziplock bag, combine all marinade ingredients: vinegar, calamansi juice, lemongrass, ginger, garlic, brown sugar, salt, and pepper. Mix well.", "Add chicken pieces (pierce skin/meat lightly with a fork if desired), ensuring they are well-coated. Marinate in the refrigerator for at least 2 hours, preferably 4 hours or overnight.", "Prepare the basting sauce: Gently heat the annatto oil with minced garlic until fragrant (do not burn). Remove from heat and stir in melted butter/margarine and a pinch of salt.", "Preheat grill (charcoal preferred for smoky flavor) to medium heat. Oil the grates.", "Remove chicken from marinade, letting excess drip off (reserve some marinade if making a dipping sauce). Thread onto skewers if using smaller pieces.", "Grill chicken for 15-25 minutes per side, depending on thickness, or until cooked through (internal temp 165°F/74°C) and juices run clear. Turn occasionally to prevent burning.", "Brush generously with the achiote basting sauce during the last 10 minutes of grilling, turning and basting each side.", "Serve hot with steamed rice and a dipping sauce (typically soy sauce, vinegar, calamansi, chopped chili - sometimes with a bit of reserved marinade added)."]
            },
            {
                name: "Pininyahang Manok",
                time: "45 mins",
                difficulty: "Easy",
                icon: "fa-solid fa-pineapple",
                desc: "A delightful Filipino chicken stew simmered in a rich, creamy pineapple sauce.",
                img: "https://images.aws.nestle.recipes/original/b42aab367ffbac6ba2c782e1dc316c8d_Pininyahang_Manok_main.jpg", // Image present
                baseMeatWeight: 1000,
                ingredients: [
                    { text: "Pineapple Chunks or Tidbits in heavy syrup", baseQty: 1, unit: "can (20 oz / 567g)" },
                    { text: "Pineapple Syrup (reserved from can)", baseQty: 1, unit: "can's worth" },
                    { text: "Evaporated Milk or All-Purpose Cream", baseQty: 240, unit: "ml" },
                    { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" },
                    { text: "Garlic, minced", baseQty: 4, unit: "cloves" },
                    { text: "Red Bell Pepper, sliced", baseQty: 1, unit: "pcs" },
                    { text: "Green Bell Pepper, sliced (optional)", baseQty: 0.5, unit: "pcs" },
                    { text: "Carrot, sliced (optional)", baseQty: 1, unit: "medium pcs" },
                    { text: "Fish Sauce (Patis)", baseQty: 30, unit: "ml" },
                    { text: "Cooking Oil", baseQty: 30, unit: "ml" },
                    { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" }
                ],
                instructions: ["Drain pineapple chunks, reserving the syrup. Set pineapple chunks aside.", "Heat oil in a large pot or Dutch oven over medium heat. Sauté onion and garlic until fragrant.", "Add chicken pieces and cook, stirring occasionally, until lightly browned on all sides.", "Pour in the reserved pineapple syrup and add fish sauce (patis). Bring to a simmer.", "Lower the heat, cover, and cook for 20-25 minutes or until chicken is tender and cooked through.", "Add pineapple chunks, bell peppers, and carrots (if using). Stir and cook for 5 minutes until vegetables are tender-crisp.", "Pour in the evaporated milk or cream. Stir gently and heat through for another 3-5 minutes. Do not bring to a rolling boil after adding milk/cream.", "Season with salt and black pepper to taste. Add a pinch more fish sauce if desired.", "Serve hot with steamed rice."]
            },
            {
                name: "Chicken Afritada",
                time: "50 mins",
                difficulty: "Easy",
                icon: "fa-solid fa-bell",
                desc: "A classic Filipino chicken stew cooked in tomato sauce with potatoes, carrots, and bell peppers.",
                img: "https://www.mysugarfreekitchen.com/wp-content/uploads/2020/03/Chicken-Afritada-14.jpg", // Image present
                baseMeatWeight: 1000,
                ingredients: [
                    { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" },
                    { text: "Garlic, minced", baseQty: 4, unit: "cloves" },
                    { text: "Tomato Sauce", baseQty: 425, unit: "ml" },
                    { text: "Water or Chicken Broth", baseQty: 240, unit: "ml" },
                    { text: "Potatoes, peeled and cubed", baseQty: 2, unit: "large pcs" },
                    { text: "Carrots, peeled and sliced or cubed", baseQty: 2, unit: "medium pcs" },
                    { text: "Red Bell Pepper, sliced", baseQty: 1, unit: "pcs" },
                    { text: "Green Bell Pepper, sliced", baseQty: 1, unit: "pcs" },
                    { text: "Green Peas (optional, frozen or canned)", baseQty: 80, unit: "ml" },
                    { text: "Bay Leaf", baseQty: 1, unit: "pcs" },
                    { text: "Fish Sauce (Patis) or Soy Sauce", baseQty: 30, unit: "ml" },
                    { text: "Cooking Oil", baseQty: 30, unit: "ml" },
                    { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" },
                    { text: "Sugar (optional)", baseQty: 0.5, unit: "tsp" }
                ],
                instructions: ["Optional: Lightly fry potato and carrot cubes in oil until edges are slightly browned. Remove and set aside (helps them hold shape).", "Heat oil in a large pot or Dutch oven over medium heat. Sauté onion and garlic until fragrant.", "Add chicken pieces and cook until lightly browned on all sides.", "Pour in tomato sauce, water/broth, fish sauce/soy sauce, and add the bay leaf. Bring to a simmer.", "Lower heat, cover, and cook for 15-20 minutes.", "Add potatoes and carrots (raw or pre-fried). Cover and simmer for another 15-20 minutes, or until chicken and vegetables are tender.", "Stir in bell peppers and green peas (if using). Cook for 5 more minutes until bell peppers are tender-crisp.", "Season with salt, black pepper, and optional sugar to taste. Remove bay leaf.", "Serve hot with steamed rice."]
            }
        ],
        beef: [
            {
                name: "Beef Kaldereta",
                time: "90 mins+",
                difficulty: "Medium",
                icon: "fa-solid fa-spoon",
                desc: "A hearty Filipino beef stew in a rich, savory tomato-based sauce, often thickened with liver spread and garnished with olives and cheese.",
                img: "https://cdn.sanity.io/images/f3knbc2s/production/f74d8aed0419d87b41895136fede06b671ed0482-2500x1500.jpg", // Image present
                baseMeatWeight: 1000,
                ingredients: [
                    { text: "Large Onion, chopped", baseQty: 1, unit: "pcs" },
                    { text: "Garlic, minced", baseQty: 6, unit: "cloves" },
                    { text: "Tomato Sauce", baseQty: 425, unit: "ml" },
                    { text: "Liver Spread or Pate (Reno brand is common)", baseQty: 120, unit: "ml" },
                    { text: "Potatoes, peeled and cubed", baseQty: 2, unit: "large pcs" },
                    { text: "Carrots, peeled and sliced thickly", baseQty: 2, unit: "medium pcs" },
                    { text: "Red Bell Pepper, cut into squares", baseQty: 1, unit: "pcs" },
                    { text: "Green Bell Pepper, cut into squares", baseQty: 1, unit: "pcs" },
                    { text: "Green Olives, pitted (optional)", baseQty: 80, unit: "ml" },
                    { text: "Bay Leaves", baseQty: 2, unit: "pcs" },
                    { text: "Beef Broth or Water", baseQty: 480, unit: "ml" },
                    { text: "Cooking Oil", baseQty: 45, unit: "ml" },
                    { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" },
                    { text: "Red Pepper Flakes or chopped Chili (optional, for heat)", baseQty: 0.5, unit: "tsp" },
                    { text: "Grated Cheese (Cheddar or Edam, for topping)", baseQty: null, unit: "to taste" }
                ],
                instructions: ["Pat beef cubes dry and season with salt and pepper.", "Heat oil in a large, heavy-bottomed pot or Dutch oven over medium-high heat. Sear the beef cubes in batches until browned on all sides. Remove beef and set aside.", "In the same pot, lower heat to medium. Sauté onion until softened (about 5 minutes). Add garlic and optional red pepper flakes, cook for 1 minute until fragrant.", "Stir in the liver spread and cook for 1 minute.", "Return the beef to the pot. Add tomato sauce, beef broth/water, and bay leaves. Stir well.", "Bring to a boil, then reduce heat to low, cover tightly, and simmer for 1.5 - 2.5 hours, or until the beef is very tender (check periodically and add more water/broth if it becomes too dry).", "Optional: While beef simmers, lightly fry potato and carrot cubes until edges brown. Set aside.", "Once beef is tender, add potatoes and carrots (raw or pre-fried). Cover and cook for 15-20 minutes more, or until vegetables are tender.", "Stir in bell peppers and olives (if using). Cook uncovered for another 5-7 minutes, allowing the sauce to thicken slightly.", "Remove bay leaves. Season with salt and pepper to taste. Adjust thickness if needed (can mash some potatoes or add a cornstarch slurry).", "Serve hot, topped with grated cheese if desired, with steamed rice."]
            },
            {
                name: "Beef Mechado",
                time: "90 mins+",
                difficulty: "Medium",
                icon: "fa-solid fa-carrot",
                desc: "Tender beef braised in soy sauce, calamansi juice, and tomato sauce, traditionally with pork fat larding.",
                img: "https://www.foxyfolksy.com/wp-content/uploads/2019/09/mechado-640.jpg", // Image present
                baseMeatWeight: 1000,
                ingredients: [
                    { text: "Pork Fat Strips (optional, for larding)", baseQty: null, unit: "few strips (~1/4 inch thick)" },
                    { text: "Soy Sauce", baseQty: 120, unit: "ml" },
                    { text: "Calamansi Juice (or 50/50 Lemon/Lime Juice)", baseQty: 60, unit: "ml" },
                    { text: "Tomato Sauce", baseQty: 225, unit: "ml" },
                    { text: "Large Onion, sliced into rings", baseQty: 1, unit: "pcs" },
                    { text: "Garlic, minced", baseQty: 5, unit: "cloves" },
                    { text: "Potatoes, peeled and quartered or cut into wedges", baseQty: 2, unit: "large pcs" },
                    { text: "Carrot, peeled and sliced thickly", baseQty: 1, unit: "large pcs" },
                    { text: "Red Bell Pepper, cut into thick strips or squares", baseQty: 1, unit: "pcs" },
                    { text: "Bay Leaves", baseQty: 2, unit: "pcs" },
                    { text: "Beef Broth or Water", baseQty: 480, unit: "ml" },
                    { text: "Cooking Oil", baseQty: 30, unit: "ml" },
                    { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" },
                    { text: "Sugar (optional)", baseQty: 1, unit: "tsp" }
                ],
                instructions: ["Optional Larding: Using a sharp knife, make small incisions into the beef roast and insert strips of pork fat throughout.", "In a bowl, combine soy sauce and calamansi juice. Marinate the beef (whole or chunked) for at least 30 minutes, turning occasionally.", "Heat oil in a large pot or Dutch oven over medium-high heat. Remove beef from marinade (reserve marinade) and sear on all sides until well browned.", "Remove beef and set aside. Add onion slices to the pot and cook until softened and lightly caramelized.", "Add garlic and cook for 1 minute until fragrant.", "Return beef to the pot. Pour in the reserved marinade, tomato sauce, beef broth/water, and add bay leaves. Add optional sugar.", "Bring to a boil, then reduce heat to low, cover tightly, and simmer for 1.5 - 2.5 hours, or until beef is fork-tender. Add more water/broth if needed.", "Optional: Lightly fry potato wedges and carrot slices until edges brown. Set aside.", "Add potatoes and carrots (raw or pre-fried) to the pot. Cover and cook for 15-20 minutes until tender.", "Add the bell pepper strips and cook uncovered for another 5-7 minutes until tender-crisp and sauce has slightly thickened.", "Remove bay leaves. Season with salt and pepper to taste.", "If using a whole roast, remove and slice before serving. Spoon sauce and vegetables over the beef slices. Serve hot with steamed rice."]
            },
            {
                name: "Filipino Beef Tapa",
                time: "20 mins + Marinating",
                difficulty: "Easy",
                icon: "fa-solid fa-egg",
                desc: "Thinly sliced cured beef, pan-fried until slightly crisp and caramelized. A breakfast favorite (Tapsilog).",
                img: "https://www.foxyfolksy.com/wp-content/uploads/2017/09/beef-tapa-640.jpg", // Image present
                baseMeatWeight: 500,
                ingredients: [
                    { text: "Soy Sauce", baseQty: 60, unit: "ml" },
                    { text: "Calamansi Juice or White Vinegar", baseQty: 30, unit: "ml" },
                    { text: "Garlic, minced", baseQty: 5, unit: "cloves" },
                    { text: "Brown Sugar", baseQty: 15, unit: "ml" },
                    { text: "Black Pepper, freshly ground", baseQty: 1, unit: "tsp" },
                    { text: "Salt", baseQty: 0.5, unit: "tsp" },
                    { text: "Cooking Oil for frying", baseQty: 45, unit: "ml" }
                ],
                instructions: ["In a bowl, combine marinade ingredients: soy sauce, calamansi/vinegar, garlic, brown sugar, pepper, and salt. Mix well until sugar dissolves.", "Add the thinly sliced beef to the marinade, ensuring all pieces are coated. Massage the marinade into the meat.", "Cover and refrigerate for at least 4 hours, or preferably overnight for best flavor.", "Heat cooking oil in a large frying pan or skillet over medium-high heat.", "Remove beef from the marinade, letting excess drip off slightly (don't discard marinade completely if you want saucier tapa).", "Place beef slices in the hot pan in a single layer (cook in batches if necessary to avoid overcrowding).", "Fry for 2-4 minutes per side, or until cooked through and slightly caramelized and crispy at the edges. Add a splash of leftover marinade during the last minute if desired.", "Adjust cooking time based on desired doneness (less time for rarer, more for well-done and crispier). Do not overcook, as thin slices can become tough quickly.", "Serve immediately, typically as part of 'Tapsilog' - with garlic fried rice (sinangag) and a fried egg (itlog). A side of vinegar dipping sauce or pickled papaya (atchara) is common."]
            },
            {
                name: "Bistek Tagalog",
                time: "30 mins + Marinating",
                difficulty: "Easy",
                icon: "fa-solid fa-lemon",
                desc: "Thinly sliced beef braised in soy sauce and calamansi juice, smothered with onions.",
                img: "https://www.simplyrecipes.com/thmb/0QQ-9_OkQRJOKJKDUDSCzuoI7WQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Bistek-LEAD-01-f04a082d4a2d4474a0cdb8dec5f06b1d.jpg", // Image present
                baseMeatWeight: 500,
                ingredients: [
                    { text: "Soy Sauce", baseQty: 120, unit: "ml" },
                    { text: "Calamansi Juice (or 50/50 Lemon/Lime Juice)", baseQty: 60, unit: "ml" },
                    { text: "Large Onions, sliced into thick rings", baseQty: 2, unit: "pcs" },
                    { text: "Garlic, minced (optional)", baseQty: 3, unit: "cloves" },
                    { text: "Black Pepper, freshly ground", baseQty: 0.5, unit: "tsp" },
                    { text: "Water or Beef Broth (optional, for more sauce)", baseQty: 60, unit: "ml" },
                    { text: "Cooking Oil", baseQty: 45, unit: "ml" },
                    { text: "Sugar (optional, to balance flavor)", baseQty: 0.5, unit: "tsp" }
                ],
                instructions: ["In a bowl, combine soy sauce, calamansi juice, and black pepper. Add the beef slices and marinate for at least 30 minutes (or up to 2 hours) in the refrigerator.", "Heat about 2 tbsp of oil in a large pan or skillet over medium-high heat. Pan-fry the onion rings until lightly browned and softened, but still slightly crisp. Remove from pan and set aside.", "Add the remaining 1 tbsp oil to the pan. Remove beef slices from the marinade, reserving the marinade.", "Sear the beef slices in the hot pan (in batches if needed) for 1-2 minutes per side until browned. Remove beef and set aside.", "Optional: Sauté minced garlic in the same pan for 30 seconds until fragrant.", "Pour the reserved marinade into the pan. Add optional water/broth and sugar. Bring to a simmer, scraping up any browned bits from the bottom of the pan.", "Return the seared beef slices to the pan. Lower heat, cover, and simmer gently for 5-10 minutes, or until beef is tender (cooking time depends on the cut and thickness).", "Return most of the cooked onion rings to the pan and stir gently to combine.", "Taste and adjust seasoning if needed.", "Transfer to a serving plate, top with the remaining reserved onion rings.", "Serve immediately with hot steamed rice."]
            }
        ],
         fish: [
            {
                name: "Sinigang na Isda",
                time: "30 mins",
                difficulty: "Easy",
                icon: "fa-solid fa-fish-fins",
                desc: "A light and sour Filipino fish soup using tamarind broth with vegetables.",
                img: "https://www.maggi.ph/sites/default/files/styles/image_744_x_419/public/srh_recipes/48ce3132d5a437e6977cd0c6df0f094d.jpg?h=561fe1eb&itok=1tOMxI7T", // Image present
                baseMeatWeight: 500,
                ingredients: [
                    { text: "Tamarind Soup Base (Sinigang Mix)", baseQty: 1, unit: "packet (approx 20-30g)" },
                    { text: "Large Onion, quartered", baseQty: 1, unit: "pcs" },
                    { text: "Medium Tomatoes, quartered", baseQty: 2, unit: "pcs" },
                    { text: "Daikon Radish (Labanos), peeled and sliced", baseQty: 1, unit: "medium pcs" },
                    { text: "String Beans (Sitaw), cut into 2-inch lengths", baseQty: 1, unit: "bundle (approx 150g)" },
                    { text: "Okra, ends trimmed", baseQty: 8, unit: "pcs" },
                    { text: "Water Spinach (Kangkong) or Bok Choy leaves", baseQty: 1, unit: "bundle (approx 200g)" },
                    { text: "Finger Chilies (Siling Pangsigang, optional)", baseQty: 2, unit: "pcs" },
                    { text: "Fish Sauce (Patis)", baseQty: null, unit: "to taste" },
                    { text: "Water or Rice Washing (Hugas Bigas)", baseQty: 1200, unit: "ml" }
                ],
                instructions: ["In a pot, combine water/rice washing, onion, and tomatoes. Bring to a boil.", "Add tamarind soup base (start with less if unsure, add more later) and radish. Simmer for 5 minutes.", "Gently add the fish pieces (steaks or whole). Lower heat and simmer gently for 8-10 minutes, or until fish is just cooked through (opaque). Do not over-stir or overcook the fish.", "Add string beans, okra, and finger chilies (if using). Cook for 3-5 minutes until vegetables are tender-crisp.", "Add water spinach or bok choy and cook for 1 minute until just wilted.", "Season carefully with fish sauce (patis) to taste. Be gentle when stirring.", "Serve immediately in bowls, ensuring each serving gets fish, broth, and vegetables."]
            },
            {
                name: "Paksiw na Isda",
                time: "25 mins",
                difficulty: "Easy",
                icon: "fa-solid fa-fish",
                desc: "Fish simmered gently in vinegar, garlic, ginger, and peppercorns, often with vegetables like eggplant or bitter gourd.",
                img: "https://www.maggi.ph/sites/default/files/styles/home_stage_1500_700/public/srh_recipes/41b263bf239ea5e6125956c96bca84a4.jpg?h=28121b77&itok=EZuzNQDe", // Image present
                baseMeatWeight: 500,
                ingredients: [
                    { text: "White Vinegar (Cane or Coconut)", baseQty: 180, unit: "ml" },
                    { text: "Water", baseQty: 120, unit: "ml" },
                    { text: "Garlic, crushed", baseQty: 6, unit: "cloves" },
                    { text: "Ginger, sliced", baseQty: 1, unit: "thumb-sized pc" },
                    { text: "Whole Peppercorns", baseQty: 1, unit: "tsp" },
                    { text: "Finger Chilies (Siling Pangsigang)", baseQty: 3, unit: "pcs" },
                    { text: "Fish Sauce (Patis) or Salt", baseQty: null, unit: "to taste" },
                    { text: "Eggplant (Talbos), sliced (Optional)", baseQty: 1, unit: "small pcs" },
                    { text: "Bitter Gourd (Ampalaya), sliced (Optional)", baseQty: 0.5, unit: "small pcs" }
                ],
                instructions: ["Arrange optional vegetables (eggplant, bitter gourd) at the bottom of a pot if using.", "Place the fish on top of the vegetables (or directly in the pot).", "Add vinegar, water, garlic, ginger, peppercorns, and finger chilies.", "Bring the mixture to a boil over medium-high heat *without covering* the pot (allows sharp vinegar smell to dissipate).", "Once boiling, lower the heat, cover the pot, and simmer gently for 15-20 minutes, or until the fish is cooked through and vegetables (if used) are tender.", "Season with fish sauce (patis) or salt to taste during the last few minutes of cooking. Adjust liquid if needed (some prefer more sauce, some less).", "Serve hot with steamed rice."]
            },
            {
                name: "Fish Kinilaw",
                time: "20 mins + Marinating",
                difficulty: "Easy",
                icon: "fa-regular fa-lemon",
                desc: "Filipino ceviche where fresh, raw fish is 'cooked' (denatured) by the acidity of vinegar or citrus juice.",
                img: "https://nutriasia.com/wp-content/uploads/2018/10/kinilawThumb.jpg", // Image present
                baseMeatWeight: 500,
                ingredients: [
                    { text: "Coconut Vinegar or Cane Vinegar (Sukang Tuba or Paombong preferred)", baseQty: 180, unit: "ml" },
                    { text: "Calamansi or Lime Juice (optional, adds brightness)", baseQty: 30, unit: "ml" },
                    { text: "Red Onion, chopped finely", baseQty: 1, unit: "medium pcs" },
                    { text: "Ginger, minced or julienned finely", baseQty: 1.5, unit: "thumb-sized pcs" },
                    { text: "Red Chili Peppers (Siling Labuyo), chopped finely", baseQty: 3, unit: "pcs" },
                    { text: "Salt", baseQty: 1, unit: "tsp" },
                    { text: "Black Pepper, freshly ground", baseQty: 0.5, unit: "tsp" },
                    { text: "Cucumber, seeded and chopped small (Optional)", baseQty: 0.5, unit: "medium pcs" },
                    { text: "Green Bell Pepper, chopped small (Optional)", baseQty: 0.5, unit: "pcs" },
                    { text: "Coconut Milk or Cream (Optional, Visayan style 'Sinuglaw' often includes it)", baseQty: 60, unit: "ml" }
                ],
                instructions: ["Ensure fish is very fresh and suitable for raw consumption. Cut into uniform bite-sized cubes (approx 1/2 to 3/4 inch).", "Wash the fish cubes gently in cold water and drain very thoroughly. Pat dry gently if needed.", "In a non-metallic bowl (glass or ceramic), combine the fish cubes, vinegar, calamansi/lime juice (if using), red onion, ginger, and chili peppers.", "Mix gently but thoroughly to ensure all fish pieces are coated with the acidic liquid.", "Season with salt and pepper. Mix again gently.", "Cover the bowl and refrigerate for at least 30 minutes, or up to 1 hour. The acid will 'cook' the fish, turning it opaque.", "Check fish after 30 mins - it should be opaque on the outside and slightly translucent inside (adjust time based on preference, longer time 'cooks' it more).", "Just before serving, stir in optional cucumber and/or bell pepper.", "For Visayan style: You can drain *some* (not all) of the initial vinegar marinade after 'cooking' and stir in fresh coconut milk or cream. Mix gently.", "Taste and adjust seasoning (salt, pepper, maybe more chili or calamansi) if necessary.", "Serve chilled as an appetizer or main dish."]
            },
            {
                name: "Sweet and Sour Fish (Escabeche)",
                time: "35 mins",
                difficulty: "Medium",
                icon: "fa-solid fa-fish-fins",
                desc: "Whole fried fish smothered in a colorful sweet and sour sauce with bell peppers, onions, and carrots.",
                img: "https://www.foxyfolksy.com/wp-content/uploads/2014/04/escabeche-640.jpg", // Image present
                baseMeatWeight: 750,
                ingredients: [
                    { text: "Whole Fish, cleaned, scaled, scored", baseQty: 1, unit: "pcs (~750g)" },
                    { text: "Salt and Pepper (for seasoning fish)", baseQty: null, unit: "to taste" },
                    { text: "All-Purpose Flour or Cornstarch (for dredging)", baseQty: 60, unit: "ml" },
                    { text: "Cooking Oil for frying", baseQty: null, unit: "enough for shallow or deep frying" },
                    { text: "White Vinegar", baseQty: 120, unit: "ml" },
                    { text: "Water", baseQty: 120, unit: "ml" },
                    { text: "Brown Sugar", baseQty: 120, unit: "ml" },
                    { text: "Ketchup (optional, for color and tang)", baseQty: 30, unit: "ml" },
                    { text: "Soy Sauce or Fish Sauce (optional, for umami)", baseQty: 15, unit: "ml" },
                    { text: "Medium Onion, sliced", baseQty: 1, unit: "pcs" },
                    { text: "Garlic, minced", baseQty: 3, unit: "cloves" },
                    { text: "Ginger, julienned", baseQty: 1, unit: "thumb-sized pc" },
                    { text: "Carrot, julienned", baseQty: 1, unit: "small pcs" },
                    { text: "Red Bell Pepper, julienned", baseQty: 0.5, unit: "pcs" },
                    { text: "Green Bell Pepper, julienned", baseQty: 0.5, unit: "pcs" },
                    { text: "Cornstarch Slurry (1 tbsp cornstarch + 2 tbsp water)", baseQty: 1, unit: "batch" },
                    { text: "Cooking Oil (for sauce)", baseQty: 15, unit: "ml" }
                ],
                instructions: ["Pat the whole fish completely dry. Season inside and out with salt and pepper.", "Lightly dredge the fish in flour or cornstarch, shaking off excess.", "Heat enough oil in a large frying pan or wok for shallow or deep frying over medium-high heat.", "Carefully fry the fish until golden brown, crispy, and cooked through (about 5-8 minutes per side, depending on size).", "Remove fish from pan and drain on paper towels or a wire rack. Place on a serving platter.", "Prepare the sauce: In a separate saucepan or wok, heat 1 tbsp oil over medium heat.", "Sauté ginger, garlic, and onion until fragrant.", "Add julienned carrots and bell peppers. Stir-fry for 1-2 minutes until slightly softened but still crisp.", "In a small bowl, whisk together vinegar, water, brown sugar, optional ketchup, and optional soy/fish sauce.", "Pour the mixture into the saucepan with the vegetables. Bring to a simmer.", "Give the cornstarch slurry a quick stir and pour it into the simmering sauce, whisking constantly until the sauce thickens slightly (cook for about 1 minute).", "Taste the sauce and adjust sweetness, sourness, or saltiness if needed.", "Pour the hot sweet and sour sauce generously over the fried fish on the serving platter.", "Garnish with extra fresh onion rings or chopped green onions if desired.", "Serve immediately with steamed rice."]
            }
        ]
    };
    // ========================================================================
    // == END OF RECIPE DATA ==================================================
    // ========================================================================

    // --- Helper Functions & State ---
    const POUND_TO_GRAM = 453.592;
    const SCALABLE_UNITS = ['g', 'kg', 'ml', 'l', 'oz', 'cup', 'tbsp', 'tsp', 'pcs', 'cloves', 'can'];
    const SMALL_UNITS = ['tsp', 'tbsp'];
    const COUNT_UNITS = ['pcs', 'cloves', 'leaves', 'stalks'];
    const NON_SCALABLE_UNITS_STRICT = ['head', 'bundle', 'packet', 'pinch', 'handful', 'thumb-sized', 'thumb', 'batch'];
    const DESCRIPTIVE_UNITS = ['to taste', 'enough to cover', 'enough for deep frying', "can's worth", "few strips", 'loosely packed'];

    let recipeSwiperInstance = null;
    let portionGrams = 0;
    let currentMeatWeightGrams = 0;
    let lastFocusedElement;

    /** Calculates scrollbar width and sets CSS variable */
    const calculateScrollbarWidth = () => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    };

    const convertToGrams = (value, unit) => {
        if (isNaN(value) || value <= 0) return 0;
        switch (unit.toLowerCase()) {
            case 'kg': return value * 1000;
            case 'lbs': return value * POUND_TO_GRAM;
            case 'g': default: return value;
        }
    };

    const formatQuantity = (quantity, unit) => {
        if (quantity === null || isNaN(quantity) || quantity <= 0) return "";
        const u = unit ? unit.toLowerCase() : "";

        if (DESCRIPTIVE_UNITS.includes(u)) return "";
        if (quantity < 0.1) return "";

        if (SMALL_UNITS.includes(u)) {
            const fractions = { '0.25': '¼', '0.5': '½', '0.75': '¾' };
            const whole = Math.floor(quantity);
            const decimal = quantity - whole;
            let fractionStr = "";
            if (decimal >= 0.18 && decimal < 0.4) fractionStr = fractions['0.25']; // ~1/4
            else if (decimal >= 0.4 && decimal < 0.65) fractionStr = fractions['0.5']; // ~1/2
            else if (decimal >= 0.65 && decimal < 0.87) fractionStr = fractions['0.75']; // ~3/4
            else if (decimal >= 0.87) { // Round up near whole
                 return (whole + 1).toString();
            }
            const wholeStr = whole > 0 ? whole.toString() : "";
            return `${wholeStr}${wholeStr && fractionStr ? ' ' : ''}${fractionStr}`.trim() || "";
        }

        if (COUNT_UNITS.includes(u)) {
             if (quantity < 1) {
                 if (quantity < 0.4) return ""; // Less than ~half
                 return "½"; // Round to half
             }
             const rounded = Math.round(quantity);
             return rounded > 0 ? rounded.toString() : "";
        }

        if (u === 'can') {
             const rounded = Math.round(quantity * 2) / 2;
             if (rounded < 0.5) return "";
             if (rounded === 0.5) return "½";
             return rounded % 1 === 0 ? rounded.toString() : `${Math.floor(rounded)}½`;
        }

        if (quantity < 1) return quantity.toFixed(1);
        if (quantity < 10 && quantity % 1 !== 0) return quantity.toFixed(1);
        return Math.round(quantity).toString();
    };

    /** Validates number input field. */
    const validateInput = (input, errorMessage) => {
        clearError(input);
        const value = parseFloat(input.value);
        if (input.value.trim() === '' || isNaN(value) || value <= 0) {
            showError(input, errorMessage);
            return false;
        }
        return true;
    };

    /** Shows error message for an input field. */
    const showError = (input, message) => {
        input.classList.add('input-error');
        const parentGroup = input.closest('.input-group');
        const errorElement = parentGroup?.querySelector('.error-message');
        if (input.id === 'meatWeight') { input.closest('.weight-input-container')?.classList.add('input-error'); meatWeightUnitSelect.classList.add('input-error'); }
        else if (input.tagName === 'SELECT') { input.closest('.select-wrapper')?.classList.add('input-error'); }
        if (errorElement) { errorElement.textContent = message; errorElement.style.opacity = '1'; }
    };

    const clearError = (input) => {
        input.classList.remove('input-error');
        const parentGroup = input.closest('.input-group');
        const errorElement = parentGroup?.querySelector('.error-message');
        if (input.id === 'meatWeight') { input.closest('.weight-input-container')?.classList.remove('input-error'); meatWeightUnitSelect.classList.remove('input-error'); }
        else if (input.tagName === 'SELECT') { input.closest('.select-wrapper')?.classList.remove('input-error'); }
        if (errorElement) { errorElement.textContent = ''; errorElement.style.opacity = '0'; }
    };

    const calculateServings = (totalGrams, portionGrams) => {
        if (portionGrams <= 0 || totalGrams <=0 ) return 0;
        return Math.floor(totalGrams / portionGrams);
    };

    const getRecommendations = (meatType) => recommendationsData[meatType] || { cooking: 'N/A', time: 'N/A', seasoning: 'N/A' };
    const displayResults = (servings, recommendations) => {
        resultLoadingIndicator.classList.add('hidden');
        resultPlaceholder.classList.add('hidden');
        resultList.innerHTML = '';

        const servingsText = servings > 0 ? `${servings} ${servings === 1 ? "serving" : "servings"}` : "Less than 1 serving";
        const formattedPortion = portionGrams % 1 === 0 ? portionGrams.toString() : portionGrams.toFixed(1);

        const items = [
            { icon: 'fa-solid fa-users', label: 'Approx. Servings', value: servingsText },
            { icon: 'fa-solid fa-utensils', label: 'Serving Size Used', value: `${formattedPortion}g / person` },
            { icon: 'fa-solid fa-fire-burner', label: 'Suggested Methods', value: recommendations.cooking },
            { icon: 'fa-solid fa-clock', label: 'Est. Cooking Time', value: recommendations.time },
            { icon: 'fa-solid fa-mortar-pestle', label: 'Seasoning Ideas', value: recommendations.seasoning },
        ];

        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'result-item';
            li.innerHTML = `<span class="result-label"><i class="${item.icon}"></i> ${item.label}</span> <span class="result-value">${item.value}</span>`;
            resultList.appendChild(li);
        });

        resultList.classList.remove('hidden');
        resultsWrapper.style.minHeight = 'auto';
        void resultList.offsetWidth;
        resultList.classList.add('visible');
    };

    // --- Modal Functions ---
    const openRecipeModal = (recipe) => {
        if (!recipe || !recipe.ingredients) {
             console.error("Recipe data missing for modal:", recipe);
             alert("Sorry, recipe details could not be loaded.");
             return;
        }
        lastFocusedElement = document.activeElement;

        let scalingFactor = 1;
        const baseWeight = recipe.baseMeatWeight;
        if (baseWeight && baseWeight > 0 && currentMeatWeightGrams && currentMeatWeightGrams > 0) {
            scalingFactor = currentMeatWeightGrams / baseWeight;
        } else {
             console.warn("Using base recipe amounts due to missing weights.");
        }

        modalRecipeImage.src = ''; // Clear previous src
        modalRecipeImage.style.opacity = '0'; // Hide image initially
        modalImagePlaceholder.style.display = 'none'; // Hide placeholder initially

        modalRecipeImage.alt = recipe.name || 'Recipe Image';
        modalRecipeImage.onerror = () => {
             modalRecipeImage.style.opacity = '0'; // Keep hidden on error
             modalImagePlaceholder.style.display = 'block'; // Show placeholder SVG
        };
        modalRecipeImage.onload = () => {
             modalImagePlaceholder.style.display = 'none'; // Hide placeholder on success
             modalRecipeImage.style.opacity = '1'; // Show image
        };
        // Set src AFTER handlers are attached
        modalRecipeImage.src = recipe.img || ''; // Let onerror handle empty src


        modalRecipeTitle.textContent = recipe.name || 'Recipe Details';
        modalRecipeDesc.textContent = recipe.desc || 'No description available.';

        // Populate Ingredients
        modalIngredientsList.innerHTML = '';
        let hasIngredients = false;
        if (recipe.ingredients && recipe.ingredients.length > 0) {
            hasIngredients = true;
            let meatName = 'Meat'; // Default
            const lowerCaseName = recipe.name.toLowerCase();
            if (lowerCaseName.includes('pork')) meatName = 'Pork';
            else if (lowerCaseName.includes('chicken')) meatName = 'Chicken';
            else if (lowerCaseName.includes('beef')) meatName = 'Beef';
            else if (lowerCaseName.includes('fish')) meatName = 'Fish';
            modalIngredientsList.innerHTML += `<li><strong>${currentMeatWeightGrams.toFixed(0)}g</strong> ${meatName} (Your Amount)</li><li><hr></li>`;

            recipe.ingredients.forEach(item => {
                const li = document.createElement('li');
                let baseText = item.text || "";
                let quantityPart = "";
                const unit = item.unit || "";
                const u = unit.toLowerCase();

                if (item.baseQty !== null && typeof item.baseQty === 'number' && item.baseQty > 0 && SCALABLE_UNITS.includes(u)) {
                    const scaledQty = item.baseQty * scalingFactor;
                    const formattedQty = formatQuantity(scaledQty, unit);
                    if (formattedQty) quantityPart = `<strong>${formattedQty}${unit && !DESCRIPTIVE_UNITS.includes(u) ? unit : ''}</strong>`;
                } else if (item.baseQty && unit && !DESCRIPTIVE_UNITS.includes(u) && !NON_SCALABLE_UNITS_STRICT.includes(u) && !COUNT_UNITS.includes(u)) {
                    quantityPart = `<strong>${item.baseQty} ${unit}</strong>`;
                } else if (item.baseQty && (NON_SCALABLE_UNITS_STRICT.includes(u) || COUNT_UNITS.includes(u))) {
                    quantityPart = `<strong>${item.baseQty} ${unit}</strong>`;
                } else if (DESCRIPTIVE_UNITS.includes(u)) {
                    baseText = `${baseText} <em>(${unit})</em>`;
                }

                li.innerHTML = `${quantityPart} ${baseText}`.trim();
                if (li.innerHTML) modalIngredientsList.appendChild(li);
            });
        }
        if (!hasIngredients) modalIngredientsList.innerHTML = '<li>Ingredients not specified.</li>';

        // Populate Instructions
        modalInstructionsList.innerHTML = '';
        if (recipe.instructions && recipe.instructions.length > 0) {
            recipe.instructions.forEach(step => {
                modalInstructionsList.innerHTML += `<li>${step}</li>`;
            });
        } else {
            modalInstructionsList.innerHTML = '<li>Instructions not provided.</li>';
        }

        // Show Modal
        recipeModal.classList.add('active');
        recipeModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        recipeModal.querySelector('.modal-content').scrollTop = 0;
        modalCloseBtn.focus();
    };

    /** Closes the recipe modal. */
    const closeRecipeModal = () => {
        recipeModal.classList.remove('active');
        recipeModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedElement) lastFocusedElement.focus();
    };

    const displayRecipeSuggestions = (meatType) => {
        recipeLoadingIndicator.classList.add('hidden');
        recipeSwiperWrapper.innerHTML = '';

        const recipes = recipesData[meatType] || [];

        if (recipes.length === 0) {
            suggestionCarouselContainer.classList.add('hidden');
            recipePlaceholder.textContent = `No specific recipe ideas found for "${meatType}" yet.`;
            recipePlaceholder.classList.remove('hidden');
            if (recipeSwiperInstance) {
                recipeSwiperInstance.destroy(true, true);
                recipeSwiperInstance = null;
            }
            return;
        }

        recipePlaceholder.classList.add('hidden');
        suggestionCarouselContainer.classList.remove('hidden');

        recipes.forEach(recipe => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View recipe details for ${recipe.name}`);
            const difficultyClass = `difficulty-${recipe.difficulty.toLowerCase()}`;

            card.innerHTML = `
              <div class="suggestion-img-container">
                 <img src="${recipe.img || ''}" alt="${recipe.name}" loading="lazy" onerror="this.style.visibility='hidden'; this.parentElement.style.backgroundColor='var(--border-color)';">
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
            card.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); actionHandler(); } });

            slide.appendChild(card);
            recipeSwiperWrapper.appendChild(slide);
        });

        if (recipeSwiperInstance) {
            recipeSwiperInstance.destroy(true, true);
        }

        recipeSwiperInstance = new Swiper('.recipe-swiper', {
            slidesPerView: 1,
            spaceBetween: 15,
            loop: recipes.length > 3, // Sensible looping condition
            autoplay: {
              delay: 3500, // Adjust speed
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            pagination: {
              el: '.recipe-swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.recipe-swiper-next',
              prevEl: '.recipe-swiper-prev',
            },
            breakpoints: {
              576: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1200: { slidesPerView: 3.5, spaceBetween: 30 }
            },
            grabCursor: true, // Add grab cursor
          });

        void suggestionCarouselContainer.offsetWidth;
        suggestionCarouselContainer.classList.add('visible');
    };

    // --- Event Listeners ---

    // Toggle custom portion input
    portionSizeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customPortionGroup.classList.remove('hidden');
            customPortionInput.required = true; customPortionInput.focus();
        } else {
            customPortionGroup.classList.add('hidden');
            customPortionInput.required = false; customPortionInput.value = '';
            clearError(customPortionInput);
        }
    });

    // Form submission
    meatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const originalButtonText = calculateBtn.innerHTML;
        calculateBtn.disabled = true;
        calculateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';

        resultList.classList.add('hidden');
        resultList.classList.remove('visible');
        resultPlaceholder.classList.add('hidden');
        resultLoadingIndicator.classList.remove('hidden');
        recipeLoadingIndicator.classList.remove('hidden');
        suggestionCarouselContainer.classList.add('hidden');
        suggestionCarouselContainer.classList.remove('visible');
        recipePlaceholder.classList.add('hidden');

        let isValid = true;
        clearError(meatWeightInput);
        if (portionSizeSelect.value === 'custom') clearError(customPortionInput);

        if (!validateInput(meatWeightInput, 'Please enter a valid weight.')) isValid = false;

        const rawWeightValue = parseFloat(meatWeightInput.value);
        const selectedUnit = meatWeightUnitSelect.value;
        currentMeatWeightGrams = convertToGrams(rawWeightValue, selectedUnit);

        if (isValid && currentMeatWeightGrams <= 0) {
             showError(meatWeightInput, 'Weight must be positive.'); isValid = false;
        }

        const selectedPortionOption = portionSizeSelect.value;
        portionGrams = 0;

        if (selectedPortionOption === 'custom') {
            if (!validateInput(customPortionInput, 'Enter valid custom portion.')) {
                isValid = false;
            } else {
                 portionGrams = parseFloat(customPortionInput.value);
                 if(isNaN(portionGrams) || portionGrams <= 0) {
                     showError(customPortionInput, 'Custom portion must be positive.'); isValid = false;
                 }
            }
        } else {
            portionGrams = portionSizes[selectedPortionOption] || portionSizes.medium;
        }

        if (!isValid) {
            calculateBtn.disabled = false; calculateBtn.innerHTML = originalButtonText;
            resultLoadingIndicator.classList.add('hidden');
            recipeLoadingIndicator.classList.add('hidden');
            resultPlaceholder.classList.remove('hidden');
            recipePlaceholder.classList.remove('hidden');
            const firstErrorInput = meatForm.querySelector('.input-error');
            if (firstErrorInput) {
                firstErrorInput.focus();
                firstErrorInput.closest('.input-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const meatType = meatTypeSelect.value;

        setTimeout(() => {
            try {
                const servingsNum = calculateServings(currentMeatWeightGrams, portionGrams);
                const recommendations = getRecommendations(meatType);
                displayResults(servingsNum, recommendations);
                displayRecipeSuggestions(meatType);

                // Scroll to results after calculation
                const resultsCard = document.querySelector('.result-card');
                if (resultsCard) {
                    // Adding slight delay before scroll to ensure layout is stable after results render
                    setTimeout(() => {
                        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                    }, 100); // 100ms delay
                }

            } catch (error) {
                 console.error("Error during calculation/display:", error);
                 resultPlaceholder.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i><p>Oops! Something went wrong. Please try again.</p>`;
                 resultPlaceholder.classList.remove('hidden');
                 recipePlaceholder.textContent = "Could not load recipes due to an error.";
                 recipePlaceholder.classList.remove('hidden');
                 resultLoadingIndicator.classList.add('hidden');
                 recipeLoadingIndicator.classList.add('hidden');

            } finally {
                 calculateBtn.disabled = false; calculateBtn.innerHTML = originalButtonText;
            }

        }, 500); 
    });

    // Modal Close Listeners
    modalCloseBtn.addEventListener('click', closeRecipeModal);
    modalOverlay.addEventListener('click', closeRecipeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && recipeModal.classList.contains('active')) closeRecipeModal(); });

    // --- Initial Setup ---
    calculateScrollbarWidth(); // Set CSS variable for scrollbar width
    window.addEventListener('resize', calculateScrollbarWidth); // Recalculate on resize

    resultList.classList.add('hidden');
    resultPlaceholder.classList.remove('hidden');
    suggestionCarouselContainer.classList.add('hidden');
    recipePlaceholder.classList.remove('hidden');
    if (portionSizeSelect.value !== 'custom') { customPortionGroup.classList.add('hidden'); customPortionInput.required = false; }
    if(currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

}); // End DOMContentLoaded
