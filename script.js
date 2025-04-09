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

    // --- Recipe Suggestion Swiper Elements ---
    const recipeSuggestionsSection = document.getElementById('recipes');
    const recipePlaceholder = document.getElementById('recipePlaceholder');
    const suggestionSwiperWrapperEl = document.getElementById('suggestionSwiperWrapper');
    const recipeSwiperSlidesContainer = document.getElementById('recipeSwiperSlides');
    const recipeLoadingIndicator = document.getElementById('recipeLoadingIndicator');

    // --- Modal Elements ---
    const recipeModal = document.getElementById('recipeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalRecipeImage = document.getElementById('modalRecipeImage');
    const modalImagePlaceholder = document.querySelector('.modal-image-placeholder');
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
    const recipesData = {
        pork: [
            { name: "Classic Pork Adobo", time: "45 mins", difficulty: "Easy", icon: "fa-solid fa-pepper-hot", desc: "A savory and tangy Filipino staple, slow-braised to perfection with soy sauce, vinegar, garlic, and spices.", img: "https://salu-salo.com/wp-content/uploads/2015/04/Pork-Adobo-3.jpg", baseMeatWeight: 1000, ingredients: [ { text: "Soy Sauce", baseQty: 120, unit: "ml" }, { text: "White Vinegar (Cane or Coconut preferred)", baseQty: 60, unit: "ml" }, { text: "Garlic, crushed", baseQty: 1, unit: "head" }, { text: "Whole Peppercorns, lightly crushed", baseQty: 1, unit: "tsp" }, { text: "Dried Bay Leaves", baseQty: 3, unit: "pcs" }, { text: "Water or Broth", baseQty: 120, unit: "ml" }, { text: "Cooking Oil (optional, for browning)", baseQty: 30, unit: "ml" } ], instructions: ["Combine pork, soy sauce, and garlic in a pot. Marinate for at least 30 minutes (optional but recommended).", "Add water/broth, whole peppercorns, and bay leaves.", "Bring to a boil over medium-high heat.", "Lower heat, cover, and simmer for 30-40 minutes, or until pork is tender, adding a bit more water if it dries out too much.", "Add vinegar. Do not stir. Increase heat slightly and let it boil gently for 5 minutes to cook off the harshness.", "Simmer uncovered for another 10-15 minutes, stirring occasionally, to reduce and thicken the sauce.", "Optional: Remove pork from sauce, heat oil in a separate pan, and brown the pork pieces until slightly crisp. Return to sauce.", "Serve hot with steamed rice."] },
            { name: "Crispy Lechon Kawali", time: "60 mins + Drying", difficulty: "Medium", icon: "fa-solid fa-bacon", desc: "Deep-fried pork belly boasting incredibly crunchy skin (crackling) and succulent, tender meat.", img: "https://static01.nyt.com/images/2023/11/28/multimedia/ND-Lechon-Kawali-bflv/ND-Lechon-Kawali-bflv-mediumSquareAt3X.jpg", baseMeatWeight: 1000, ingredients: [ { text: "Water for boiling", baseQty: null, unit: "enough to cover pork" }, { text: "Salt (for boiling)", baseQty: 15, unit: "ml" }, { text: "Whole Peppercorns (for boiling)", baseQty: 1, unit: "tsp" }, { text: "Bay Leaves (for boiling)", baseQty: 3, unit: "pcs" }, { text: "Garlic cloves, crushed (for boiling, optional)", baseQty: 4, unit: "cloves" }, { text: "Salt (for rubbing skin)", baseQty: 1, unit: "tsp" }, { text: "Cooking Oil for deep frying", baseQty: null, unit: "enough for deep frying (at least 2-3 inches deep)" } ], instructions: ["Place pork belly in a pot. Add enough water to cover completely. Add salt (15ml), peppercorns, bay leaves, and optional garlic.", "Bring to a boil, skimming off any impurities that rise to the surface.", "Lower heat, cover loosely, and simmer for 45-60 minutes or until the meat is tender but not falling apart.", "Carefully remove pork from the pot and place on a wire rack to cool slightly.", "Pat the entire surface, especially the skin, completely dry with paper towels. This is CRUCIAL for crispiness.", "Prick the skin all over with a fork, skewer, or knife tip (avoid piercing the meat). Rub the skin evenly with salt (1 tsp).", "Air dry the pork belly, uncovered, on a wire rack set over a tray in the refrigerator for at least 4-6 hours, ideally overnight. The drier the skin, the crispier it will be.", "Heat oil in a deep, heavy-bottomed pot or wok to 350-375°F (175-190°C) over medium-high heat.", "Carefully lower the dried pork belly into the hot oil, skin-side down. Use a splatter screen as it will splatter violently.", "Fry for 15-25 minutes, maintaining the temperature, until the skin is golden brown, blistered, and very crispy.", "Carefully flip the pork belly using tongs and fry the meat side for another 5-10 minutes until golden brown.", "Remove from oil and drain on a wire rack. Let it rest for at least 10-15 minutes before chopping.", "Chop into bite-sized pieces and serve immediately with lechon sauce (Mang Tomas) or spiced vinegar."] },
            { name: "Pork Sinigang", time: "50 mins", difficulty: "Easy", icon: "fa-solid fa-bowl-food", desc: "A comforting sour and savory tamarind-based soup, loaded with tender pork ribs or belly and various vegetables.", img: "https://images.yummy.ph/yummy/uploads/2019/03/sinigangbaboysamiso-recipe-1.jpg", baseMeatWeight: 500, ingredients: [ { text: "Tamarind Soup Base (Sinigang Mix)", baseQty: 1, unit: "packet (approx 40g)" }, { text: "Large Onion, quartered", baseQty: 1, unit: "pcs" }, { text: "Medium Tomatoes, quartered", baseQty: 2, unit: "pcs" }, { text: "Daikon Radish (Labanos), peeled and sliced", baseQty: 1, unit: "medium pcs" }, { text: "String Beans (Sitaw), cut into 2-inch lengths", baseQty: 1, unit: "bundle (approx 150g)" }, { text: "Okra, ends trimmed", baseQty: 8, unit: "pcs" }, { text: "Water Spinach (Kangkong) or Bok Choy leaves", baseQty: 1, unit: "bundle (approx 200g)" }, { text: "Taro (Gabi), peeled and cubed (optional, for thickening)", baseQty: 2, unit: "small pcs" }, { text: "Finger Chilies (Siling Pangsigang, optional)", baseQty: 2, unit: "pcs" }, { text: "Fish Sauce (Patis)", baseQty: null, unit: "to taste" }, { text: "Water", baseQty: 1500, unit: "ml" } ], instructions: ["In a large pot, combine pork and water. Bring to a boil, skimming off any scum that rises to the surface.", "Add onion, tomatoes, and optional taro (gabi). Lower heat, cover, and simmer for 30-45 minutes, or until pork is tender (taro should also be soft if using).", "Add the tamarind soup base (Sinigang Mix) and Daikon radish. Stir well and simmer for 5-7 minutes.", "Add string beans, okra, and finger chilies (if using). Cook for another 3-5 minutes until vegetables are tender-crisp.", "Stir in the water spinach (or bok choy) and cook for 1 more minute until just wilted.", "Season with fish sauce (patis) according to your preference. Start with a tablespoon or two and add more as needed.", "Serve steaming hot, usually with rice."] },
            { name: "Pork Menudo", time: "60 mins", difficulty: "Medium", icon: "fa-solid fa-carrot", desc: "A popular Filipino stew with diced pork and liver in a rich tomato sauce with potatoes, carrots, and raisins.", img: "https://assets.unileversolutions.com/recipes-v2/214409.png", baseMeatWeight: 500, ingredients: [ { text: "Pork Liver, diced", baseQty: 250, unit: "g" }, { text: "Soy Sauce (for marinade)", baseQty: 60, unit: "ml" }, { text: "Calamansi Juice or Lemon Juice (for marinade)", baseQty: 30, unit: "ml" }, { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" }, { text: "Garlic, minced", baseQty: 4, unit: "cloves" }, { text: "Tomato Sauce", baseQty: 225, unit: "ml" }, { text: "Water or Broth", baseQty: 240, unit: "ml" }, { text: "Potatoes, peeled and diced small", baseQty: 2, unit: "medium pcs" }, { text: "Carrots, peeled and diced small", baseQty: 1, unit: "large pcs" }, { text: "Red Bell Pepper, diced", baseQty: 1, unit: "medium pcs" }, { text: "Green Peas (frozen or canned)", baseQty: 80, unit: "ml" }, { text: "Raisins", baseQty: 80, unit: "ml" }, { text: "Bay Leaf", baseQty: 1, unit: "pcs" }, { text: "Cooking Oil", baseQty: 30, unit: "ml" }, { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" }, { text: "Sugar (optional, to balance acidity)", baseQty: 1, unit: "tsp" } ], instructions: ["In a bowl, marinate the diced pork (not the liver) in soy sauce and calamansi/lemon juice for at least 15-30 minutes.", "Heat half the oil in a pot or Dutch oven over medium-high heat. Lightly fry the diced potatoes and carrots until edges are slightly browned. Remove and set aside.", "Add the remaining oil. Sauté the diced liver quickly for 1-2 minutes until lightly browned (do not overcook). Remove and set aside.", "In the same pot, sauté onion and garlic until fragrant.", "Add the marinated pork (drain excess marinade but reserve it). Cook until lightly browned on all sides.", "Pour in the tomato sauce, reserved marinade, water/broth, and add the bay leaf. Bring to a boil.", "Lower heat, cover, and simmer for 20-30 minutes, or until the pork is tender.", "Add the pre-fried potatoes and carrots back into the pot. Simmer for 10-15 minutes until vegetables are fully cooked.", "Stir in the cooked liver, red bell pepper, green peas, and raisins. Cook for another 5 minutes.", "Season with salt, black pepper, and optional sugar to taste. Adjust sauce consistency with a little water if needed.", "Remove bay leaf before serving. Serve hot with steamed rice."] },
            { name: "Bicol Express", time: "45 mins", difficulty: "Medium", icon: "fa-solid fa-pepper-hot", desc: "A creamy and spicy pork dish cooked in coconut milk, shrimp paste, and plenty of chilies, originating from the Bicol region.", img: "https://assets.unileversolutions.com/recipes-v2/243019.jpg", baseMeatWeight: 500, ingredients: [ { text: "Garlic, minced", baseQty: 5, unit: "cloves" }, { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" }, { text: "Ginger, minced", baseQty: 1, unit: "thumb-sized pc" }, { text: "Shrimp Paste (Bagoong Alamang)", baseQty: 30, unit: "ml" }, { text: "Long Green Chilies (Siling Pangsigang), sliced diagonally", baseQty: 5, unit: "pcs" }, { text: "Red Bird's Eye Chilies (Siling Labuyo), chopped (adjust to heat preference)", baseQty: 3, unit: "pcs" }, { text: "Coconut Milk (Gata)", baseQty: 400, unit: "ml" }, { text: "Coconut Cream (Kakang Gata)", baseQty: 120, unit: "ml" }, { text: "Water", baseQty: 60, unit: "ml" }, { text: "Cooking Oil", baseQty: 15, unit: "ml" }, { text: "Fish Sauce (Patis) or Salt (optional)", baseQty: null, unit: "to taste" } ], instructions: ["Heat oil in a pot or wok over medium heat. Sauté garlic, onion, and ginger until fragrant.", "Add the pork pieces and cook until lightly browned.", "Add the shrimp paste (bagoong) and cook, stirring, for about 2 minutes.", "Pour in the coconut milk and water. Add about half of the long green chilies.", "Bring to a simmer, then lower the heat, cover, and cook for 20-30 minutes, or until the pork is tender and the sauce has slightly thickened.", "Add the remaining long green chilies and the chopped red chilies (siling labuyo).", "Pour in the coconut cream. Stir gently and simmer for another 5-7 minutes, allowing the sauce to thicken further. Do not boil rapidly after adding coconut cream.", "Taste and season with fish sauce or salt if needed (bagoong is already salty).", "Serve hot with plenty of steamed rice."] },
            { name: "Filipino Pork BBQ Skewers", time: "30 mins grilling + Marinating", difficulty: "Medium", icon: "fa-solid fa-hotdog", desc: "Sweet, savory, and slightly smoky grilled pork skewers marinated in a popular blend of soy sauce, banana ketchup, and calamansi.", img: "https://salu-salo.com/wp-content/uploads/2017/02/Filipino-Pork-BBQ-4.jpg", baseMeatWeight: 1000, ingredients: [ { text: "Soy Sauce", baseQty: 180, unit: "ml" }, { text: "Banana Ketchup", baseQty: 240, unit: "ml" }, { text: "Calamansi Juice (or Lemon/Lime Juice)", baseQty: 60, unit: "ml" }, { text: "Garlic, minced", baseQty: 1, unit: "head" }, { text: "Brown Sugar", baseQty: 120, unit: "ml" }, { text: "Lemon-Lime Soda (like Sprite or 7-Up)", baseQty: 120, unit: "ml" }, { text: "Black Pepper, freshly ground", baseQty: 1, unit: "tsp" }, { text: "Cooking Oil (for basting)", baseQty: 60, unit: "ml" }, { text: "Extra Banana Ketchup (for basting)", baseQty: 60, unit: "ml" }, { text: "Bamboo Skewers, soaked in water for 30 mins", baseQty: null, unit: "enough for pork" } ], instructions: ["In a large bowl, combine marinade ingredients: soy sauce, banana ketchup (reserve some for basting), calamansi juice, garlic, brown sugar, soda, and black pepper. Mix well until sugar is dissolved.", "Add the sliced pork to the marinade, ensuring all pieces are well-coated. Massage the marinade into the meat.", "Cover and refrigerate for at least 4 hours, preferably overnight.", "Thread the marinated pork pieces onto the soaked bamboo skewers. Don't pack too tightly.", "Prepare the basting sauce: Combine the reserved banana ketchup (~60ml) with cooking oil (~60ml) and a few tablespoons of the leftover marinade. Mix well.", "Preheat grill (charcoal preferred) to medium-high heat.", "Grill the skewers for about 3-5 minutes per side, turning frequently.", "Start basting the skewers generously with the prepared sauce during the last few minutes of grilling. Continue grilling and basting until the pork is cooked through, slightly charred, and caramelized.", "Be careful not to burn the sugars in the marinade/basting sauce.", "Serve hot, often with a spiced vinegar dipping sauce."] }
        ],
        chicken: [
             { name: "Chicken Tinola", time: "40 mins", difficulty: "Easy", icon: "fa-solid fa-drumstick-bite", desc: "A clear, gingery chicken soup with green papaya or chayote, and chili leaves, known for its clean and warming flavors.", img: "https://www.allrecipes.com/thmb/DffejbaV_BtbfcfuMfLZC5psayI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/212929-chicken-tinola-ddmfs-beauty-1x2-4792da9f161f41acb50bdd25b74c3d8e.jpg", baseMeatWeight: 1000, ingredients: [ { text: "Ginger, peeled and sliced thinly", baseQty: 2, unit: "thumb-sized pcs" }, { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" }, { text: "Garlic, minced", baseQty: 5, unit: "cloves" }, { text: "Small Green Papaya or Chayote (Sayote), peeled and sliced", baseQty: 1, unit: "pcs" }, { text: "Chili Leaves (Dahon ng Sili) or Malunggay Leaves", baseQty: 1, unit: "cup loosely packed" }, { text: "Fish Sauce (Patis)", baseQty: 45, unit: "ml" }, { text: "Water or Rice Washing (Hugas Bigas)", baseQty: 1600, unit: "ml" }, { text: "Cooking Oil", baseQty: 30, unit: "ml" }, { text: "Black pepper", baseQty: null, unit: "to taste" } ], instructions: ["Heat oil in a large pot over medium heat. Sauté ginger until fragrant (about 1-2 minutes).", "Add onion and garlic, sauté until onion is softened.", "Add chicken pieces and cook, stirring occasionally, until lightly browned on all sides.", "Season with fish sauce (patis) and cook, stirring, for 1-2 minutes.", "Pour in water or rice washing. Bring to a boil.", "Lower the heat, cover, and simmer for 20-25 minutes, or until the chicken is cooked through and tender.", "Add the green papaya or chayote slices. Simmer for 5-8 minutes until tender but not mushy.", "Stir in the chili leaves or malunggay leaves. Cook for another minute until wilted.", "Season with black pepper and add more fish sauce if needed, according to taste.", "Serve hot in bowls."] },
             { name: "Chicken Inasal", time: "30 mins + Marinating", difficulty: "Medium", icon: "fa-solid fa-fire", desc: "Smoky, vibrant grilled chicken from Bacolod, marinated and brushed with achiote oil.", img: "https://www.maggi.ph/sites/default/files/srh_recipes/fb57f76d3cd9b83f1509f030c7024b51.jpg", baseMeatWeight: 1000, ingredients: [ { text: "Coconut Vinegar", baseQty: 120, unit: "ml" }, { text: "Calamansi Juice (or 50/50 lemon/lime juice)", baseQty: 60, unit: "ml" }, { text: "Lemongrass, white part only, pounded and chopped", baseQty: 3, unit: "stalks" }, { text: "Ginger, minced", baseQty: 1.5, unit: "tbsp" }, { text: "Garlic, minced", baseQty: 8, unit: "cloves" }, { text: "Brown Sugar", baseQty: 1, unit: "tbsp" }, { text: "Salt", baseQty: 1, unit: "tsp" }, { text: "Black Pepper, freshly ground", baseQty: 0.5, unit: "tsp" }, { text: "Annatto/Achiote Oil", baseQty: 60, unit: "ml" }, { text: "Melted Butter or Margarine", baseQty: 60, unit: "ml" }, { text: "Garlic, minced (for basting)", baseQty: 2, unit: "cloves" }, { text: "Salt (for basting)", baseQty: 1, unit: "pinch" } ], instructions: ["In a large bowl or ziplock bag, combine all marinade ingredients: vinegar, calamansi juice, lemongrass, ginger, garlic, brown sugar, salt, and pepper. Mix well.", "Add chicken pieces (pierce skin/meat lightly with a fork if desired), ensuring they are well-coated. Marinate in the refrigerator for at least 2 hours, preferably 4 hours or overnight.", "Prepare the basting sauce: Gently heat the annatto oil with minced garlic until fragrant (do not burn). Remove from heat and stir in melted butter/margarine and a pinch of salt.", "Preheat grill (charcoal preferred for smoky flavor) to medium heat. Oil the grates.", "Remove chicken from marinade, letting excess drip off (reserve some marinade if making a dipping sauce). Thread onto skewers if using smaller pieces.", "Grill chicken for 15-25 minutes per side, depending on thickness, or until cooked through (internal temp 165°F/74°C) and juices run clear. Turn occasionally to prevent burning.", "Brush generously with the achiote basting sauce during the last 10 minutes of grilling, turning and basting each side.", "Serve hot with steamed rice and a dipping sauce (typically soy sauce, vinegar, calamansi, chopped chili - sometimes with a bit of reserved marinade added)."] },
             { name: "Chicken Afritada", time: "50 mins", difficulty: "Easy", icon: "fa-solid fa-bell", desc: "A classic Filipino chicken stew cooked in tomato sauce with potatoes, carrots, and bell peppers.", img: "https://www.mysugarfreekitchen.com/wp-content/uploads/2020/03/Chicken-Afritada-14.jpg", baseMeatWeight: 1000, ingredients: [ { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" }, { text: "Garlic, minced", baseQty: 4, unit: "cloves" }, { text: "Tomato Sauce", baseQty: 425, unit: "ml" }, { text: "Water or Chicken Broth", baseQty: 240, unit: "ml" }, { text: "Potatoes, peeled and cubed", baseQty: 2, unit: "large pcs" }, { text: "Carrots, peeled and sliced or cubed", baseQty: 2, unit: "medium pcs" }, { text: "Red Bell Pepper, sliced", baseQty: 1, unit: "pcs" }, { text: "Green Bell Pepper, sliced", baseQty: 1, unit: "pcs" }, { text: "Green Peas (optional, frozen or canned)", baseQty: 80, unit: "ml" }, { text: "Bay Leaf", baseQty: 1, unit: "pcs" }, { text: "Fish Sauce (Patis) or Soy Sauce", baseQty: 30, unit: "ml" }, { text: "Cooking Oil", baseQty: 30, unit: "ml" }, { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" }, { text: "Sugar (optional)", baseQty: 0.5, unit: "tsp" } ], instructions: ["Optional: Lightly fry potato and carrot cubes in oil until edges are slightly browned. Remove and set aside (helps them hold shape).", "Heat oil in a large pot or Dutch oven over medium heat. Sauté onion and garlic until fragrant.", "Add chicken pieces and cook until lightly browned on all sides.", "Pour in tomato sauce, water/broth, fish sauce/soy sauce, and add the bay leaf. Bring to a simmer.", "Lower heat, cover, and cook for 15-20 minutes.", "Add potatoes and carrots (raw or pre-fried). Cover and simmer for another 15-20 minutes, or until chicken and vegetables are tender.", "Stir in bell peppers and green peas (if using). Cook for 5 more minutes until bell peppers are tender-crisp.", "Season with salt, black pepper, and optional sugar to taste. Remove bay leaf.", "Serve hot with steamed rice."] },
             { name: "Arroz Caldo", time: "50 mins", difficulty: "Easy", icon: "fa-solid fa-bowl-rice", desc: "A comforting Filipino rice porridge (congee) cooked with chicken, ginger, garlic, and often colored with kasubha (safflower) or turmeric.", img: "https://www.simplyrecipes.com/thmb/QMEW21Sftap3jjTbrpy8-rNlTn4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/simply-recipes-arroz-caldo-lead-3-2f54dd82b469432a9b644ea012cf2dbd.jpg", baseMeatWeight: 500, ingredients: [ { text: "Glutinous Rice (Malagkit)", baseQty: 100, unit: "ml" }, { text: "Jasmine Rice or regular white rice", baseQty: 100, unit: "ml" }, { text: "Ginger, peeled and julienned", baseQty: 3, unit: "thumb-sized pcs" }, { text: "Large Onion, chopped", baseQty: 1, unit: "pcs" }, { text: "Garlic, minced", baseQty: 6, unit: "cloves" }, { text: "Fish Sauce (Patis)", baseQty: 45, unit: "ml" }, { text: "Water or Chicken Broth", baseQty: 1800, unit: "ml" }, { text: "Kasubha (Safflower threads) or pinch of Turmeric powder", baseQty: 1, unit: "pinch" }, { text: "Cooking Oil", baseQty: 30, unit: "ml" }, { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" }, { text: "Toppings: Fried Garlic bits, Chopped Green Onions, Hard-boiled Egg wedges, Calamansi halves", baseQty: null, unit: "as desired" } ], instructions: ["Rinse glutinous and regular rice together until water runs clearer. Drain well.", "Heat oil in a large pot over medium heat. Sauté a large portion of the ginger until fragrant.", "Add onion and garlic, sauté until softened.", "Add chicken pieces and cook until lightly browned.", "Season with fish sauce (patis) and stir for 1-2 minutes.", "Add the rinsed rice to the pot and stir for a minute to coat the grains.", "Pour in the water or chicken broth. Add the kasubha/turmeric. Bring to a boil, stirring occasionally.", "Once boiling, lower the heat, cover partially (leave a small gap for steam), and simmer for 30-40 minutes, or until the rice is fully cooked and the porridge has thickened to your desired consistency. Stir periodically to prevent sticking.", "If porridge becomes too thick, add more hot water or broth.", "Season with salt, black pepper, and more fish sauce if needed.", "Serve hot in bowls, garnished generously with fried garlic, green onions, hard-boiled egg, and a squeeze of calamansi juice."] },
             { name: "Filipino Chicken Curry", time: "50 mins", difficulty: "Easy", icon: "fa-solid fa-pepper-hot", desc: "A mild and creamy Filipino version of chicken curry, simmered in coconut milk with potatoes, carrots, and bell peppers.", img: "https://cdn.sanity.io/images/f3knbc2s/production/120be357fc8541587d05dcfcfa347e1942684287-2500x1500.jpg", baseMeatWeight: 1000, ingredients: [ { text: "Medium Onion, chopped", baseQty: 1, unit: "pcs" }, { text: "Garlic, minced", baseQty: 4, unit: "cloves" }, { text: "Ginger, minced", baseQty: 1, unit: "thumb-sized pc" }, { text: "Curry Powder (Filipino style or Madras)", baseQty: 2, unit: "tbsp" }, { text: "Coconut Milk", baseQty: 400, unit: "ml" }, { text: "Water or Chicken Broth", baseQty: 240, unit: "ml" }, { text: "Potatoes, peeled and cubed", baseQty: 2, unit: "large pcs" }, { text: "Carrots, peeled and cubed or sliced", baseQty: 2, unit: "medium pcs" }, { text: "Red Bell Pepper, cut into squares", baseQty: 1, unit: "pcs" }, { text: "Green Bell Pepper, cut into squares", baseQty: 1, unit: "pcs" }, { text: "Fish Sauce (Patis)", baseQty: 30, unit: "ml" }, { text: "Cooking Oil", baseQty: 30, unit: "ml" }, { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" }, { text: "Celery stalks, sliced (Optional)", baseQty: 2, unit: "stalks"} ], instructions: ["Heat oil in a large pot or Dutch oven over medium heat. Sauté onion, garlic, and ginger until fragrant.", "Add chicken pieces and cook until lightly browned on all sides.", "Stir in the curry powder and cook for 1 minute until fragrant.", "Pour in the coconut milk and water/broth. Add fish sauce. Bring to a simmer.", "Add potatoes and carrots (and optional celery). Lower heat, cover, and simmer for 20-25 minutes, or until chicken and vegetables are tender.", "Stir in the bell peppers. Cook uncovered for another 5-7 minutes, or until bell peppers are tender-crisp and the sauce has slightly thickened.", "Season with salt and black pepper to taste. Add more fish sauce if desired.", "Serve hot with steamed rice."] }
        ],
        beef: [
             { name: "Beef Kaldereta", time: "90 mins+", difficulty: "Medium", icon: "fa-solid fa-spoon", desc: "A hearty Filipino beef stew in a rich, savory tomato-based sauce, often thickened with liver spread and garnished with olives and cheese.", img: "https://cdn.sanity.io/images/f3knbc2s/production/f74d8aed0419d87b41895136fede06b671ed0482-2500x1500.jpg", baseMeatWeight: 1000, ingredients: [ { text: "Large Onion, chopped", baseQty: 1, unit: "pcs" }, { text: "Garlic, minced", baseQty: 6, unit: "cloves" }, { text: "Tomato Sauce", baseQty: 425, unit: "ml" }, { text: "Liver Spread or Pate (Reno brand is common)", baseQty: 120, unit: "ml" }, { text: "Potatoes, peeled and cubed", baseQty: 2, unit: "large pcs" }, { text: "Carrots, peeled and sliced thickly", baseQty: 2, unit: "medium pcs" }, { text: "Red Bell Pepper, cut into squares", baseQty: 1, unit: "pcs" }, { text: "Green Bell Pepper, cut into squares", baseQty: 1, unit: "pcs" }, { text: "Green Olives, pitted (optional)", baseQty: 80, unit: "ml" }, { text: "Bay Leaves", baseQty: 2, unit: "pcs" }, { text: "Beef Broth or Water", baseQty: 480, unit: "ml" }, { text: "Cooking Oil", baseQty: 45, unit: "ml" }, { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" }, { text: "Red Pepper Flakes or chopped Chili (optional, for heat)", baseQty: 0.5, unit: "tsp" }, { text: "Grated Cheese (Cheddar or Edam, for topping)", baseQty: null, unit: "to taste" } ], instructions: ["Pat beef cubes dry and season with salt and pepper.", "Heat oil in a large, heavy-bottomed pot or Dutch oven over medium-high heat. Sear the beef cubes in batches until browned on all sides. Remove beef and set aside.", "In the same pot, lower heat to medium. Sauté onion until softened (about 5 minutes). Add garlic and optional red pepper flakes, cook for 1 minute until fragrant.", "Stir in the liver spread and cook for 1 minute.", "Return the beef to the pot. Add tomato sauce, beef broth/water, and bay leaves. Stir well.", "Bring to a boil, then reduce heat to low, cover tightly, and simmer for 1.5 - 2.5 hours, or until the beef is very tender (check periodically and add more water/broth if it becomes too dry).", "Optional: While beef simmers, lightly fry potato and carrot cubes until edges brown. Set aside.", "Once beef is tender, add potatoes and carrots (raw or pre-fried). Cover and cook for 15-20 minutes more, or until vegetables are tender.", "Stir in bell peppers and olives (if using). Cook uncovered for another 5-7 minutes, allowing the sauce to thicken slightly.", "Remove bay leaves. Season with salt and pepper to taste. Adjust thickness if needed (can mash some potatoes or add a cornstarch slurry).", "Serve hot, topped with grated cheese if desired, with steamed rice."] },
             { name: "Beef Mechado", time: "90 mins+", difficulty: "Medium", icon: "fa-solid fa-carrot", desc: "Tender beef braised in soy sauce, calamansi juice, and tomato sauce, traditionally with pork fat larding.", img: "https://www.foxyfolksy.com/wp-content/uploads/2019/09/mechado-640.jpg", baseMeatWeight: 1000, ingredients: [ { text: "Pork Fat Strips (optional, for larding)", baseQty: null, unit: "few strips (~1/4 inch thick)" }, { text: "Soy Sauce", baseQty: 120, unit: "ml" }, { text: "Calamansi Juice (or 50/50 Lemon/Lime Juice)", baseQty: 60, unit: "ml" }, { text: "Tomato Sauce", baseQty: 225, unit: "ml" }, { text: "Large Onion, sliced into rings", baseQty: 1, unit: "pcs" }, { text: "Garlic, minced", baseQty: 5, unit: "cloves" }, { text: "Potatoes, peeled and quartered or cut into wedges", baseQty: 2, unit: "large pcs" }, { text: "Carrot, peeled and sliced thickly", baseQty: 1, unit: "large pcs" }, { text: "Red Bell Pepper, cut into thick strips or squares", baseQty: 1, unit: "pcs" }, { text: "Bay Leaves", baseQty: 2, unit: "pcs" }, { text: "Beef Broth or Water", baseQty: 480, unit: "ml" }, { text: "Cooking Oil", baseQty: 30, unit: "ml" }, { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" }, { text: "Sugar (optional)", baseQty: 1, unit: "tsp" } ], instructions: ["Optional Larding: Using a sharp knife, make small incisions into the beef roast and insert strips of pork fat throughout.", "In a bowl, combine soy sauce and calamansi juice. Marinate the beef (whole or chunked) for at least 30 minutes, turning occasionally.", "Heat oil in a large pot or Dutch oven over medium-high heat. Remove beef from marinade (reserve marinade) and sear on all sides until well browned.", "Remove beef and set aside. Add onion slices to the pot and cook until softened and lightly caramelized.", "Add garlic and cook for 1 minute until fragrant.", "Return beef to the pot. Pour in the reserved marinade, tomato sauce, beef broth/water, and add bay leaves. Add optional sugar.", "Bring to a boil, then reduce heat to low, cover tightly, and simmer for 1.5 - 2.5 hours, or until beef is fork-tender. Add more water/broth if needed.", "Optional: Lightly fry potato wedges and carrot slices until edges brown. Set aside.", "Add potatoes and carrots (raw or pre-fried) to the pot. Cover and cook for 15-20 minutes until tender.", "Add the bell pepper strips and cook uncovered for another 5-7 minutes until tender-crisp and sauce has slightly thickened.", "Remove bay leaves. Season with salt and pepper to taste.", "If using a whole roast, remove and slice before serving. Spoon sauce and vegetables over the beef slices. Serve hot with steamed rice."] },
             { name: "Filipino Beef Tapa", time: "20 mins + Marinating", difficulty: "Easy", icon: "fa-solid fa-egg", desc: "Thinly sliced cured beef, pan-fried until slightly crisp and caramelized. A breakfast favorite (Tapsilog).", img: "https://www.foxyfolksy.com/wp-content/uploads/2017/09/beef-tapa-640.jpg", baseMeatWeight: 500, ingredients: [ { text: "Soy Sauce", baseQty: 60, unit: "ml" }, { text: "Calamansi Juice or White Vinegar", baseQty: 30, unit: "ml" }, { text: "Garlic, minced", baseQty: 5, unit: "cloves" }, { text: "Brown Sugar", baseQty: 1, unit: "tbsp" }, { text: "Black Pepper, freshly ground", baseQty: 1, unit: "tsp" }, { text: "Salt", baseQty: 0.5, unit: "tsp" }, { text: "Cooking Oil for frying", baseQty: 45, unit: "ml" } ], instructions: ["In a bowl, combine marinade ingredients: soy sauce, calamansi/vinegar, garlic, brown sugar, pepper, and salt. Mix well until sugar dissolves.", "Add the thinly sliced beef to the marinade, ensuring all pieces are coated. Massage the marinade into the meat.", "Cover and refrigerate for at least 4 hours, or preferably overnight for best flavor.", "Heat cooking oil in a large frying pan or skillet over medium-high heat.", "Remove beef from the marinade, letting excess drip off slightly (don't discard marinade completely if you want saucier tapa).", "Place beef slices in the hot pan in a single layer (cook in batches if necessary to avoid overcrowding).", "Fry for 2-4 minutes per side, or until cooked through and slightly caramelized and crispy at the edges. Add a splash of leftover marinade during the last minute if desired.", "Adjust cooking time based on desired doneness (less time for rarer, more for well-done and crispier). Do not overcook, as thin slices can become tough quickly.", "Serve immediately, typically as part of 'Tapsilog' - with garlic fried rice (sinangag) and a fried egg (itlog). A side of vinegar dipping sauce or pickled papaya (atchara) is common."] },
             { name: "Bistek Tagalog", time: "30 mins + Marinating", difficulty: "Easy", icon: "fa-solid fa-lemon", desc: "Thinly sliced beef braised in soy sauce and calamansi juice, smothered with onions.", img: "https://www.simplyrecipes.com/thmb/0QQ-9_OkQRJOKJKDUDSCzuoI7WQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Bistek-LEAD-01-f04a082d4a2d4474a0cdb8dec5f06b1d.jpg", baseMeatWeight: 500, ingredients: [ { text: "Soy Sauce", baseQty: 120, unit: "ml" }, { text: "Calamansi Juice (or 50/50 Lemon/Lime Juice)", baseQty: 60, unit: "ml" }, { text: "Large Onions, sliced into thick rings", baseQty: 2, unit: "pcs" }, { text: "Garlic, minced (optional)", baseQty: 3, unit: "cloves" }, { text: "Black Pepper, freshly ground", baseQty: 0.5, unit: "tsp" }, { text: "Water or Beef Broth (optional, for more sauce)", baseQty: 60, unit: "ml" }, { text: "Cooking Oil", baseQty: 45, unit: "ml" }, { text: "Sugar (optional, to balance flavor)", baseQty: 0.5, unit: "tsp" } ], instructions: ["In a bowl, combine soy sauce, calamansi juice, and black pepper. Add the beef slices and marinate for at least 30 minutes (or up to 2 hours) in the refrigerator.", "Heat about 2 tbsp of oil in a large pan or skillet over medium-high heat. Pan-fry the onion rings until lightly browned and softened, but still slightly crisp. Remove from pan and set aside.", "Add the remaining 1 tbsp oil to the pan. Remove beef slices from the marinade, reserving the marinade.", "Sear the beef slices in the hot pan (in batches if needed) for 1-2 minutes per side until browned. Remove beef and set aside.", "Optional: Sauté minced garlic in the same pan for 30 seconds until fragrant.", "Pour the reserved marinade into the pan. Add optional water/broth and sugar. Bring to a simmer, scraping up any browned bits from the bottom of the pan.", "Return the seared beef slices to the pan. Lower heat, cover, and simmer gently for 5-10 minutes, or until beef is tender (cooking time depends on the cut and thickness).", "Return most of the cooked onion rings to the pan and stir gently to combine.", "Taste and adjust seasoning if needed.", "Transfer to a serving plate, top with the remaining reserved onion rings.", "Serve immediately with hot steamed rice."] },
             { name: "Bulalo", time: "2-3 hours+", difficulty: "Medium", icon: "fa-solid fa-bone", desc: "A light but rich beef soup made by slow-cooking beef shanks and bone marrow until meltingly tender, served with corn and leafy greens.", img: "https://www.recipesbynora.com/wp-content/uploads/2024/02/Bulalo-Recipe-Featured-Image.jpg", baseMeatWeight: 1500, ingredients: [ { text: "Large Onion, quartered", baseQty: 1, unit: "pcs" }, { text: "Whole Peppercorns", baseQty: 1, unit: "tbsp" }, { text: "Corn on the Cob, cut into 2-3 inch segments", baseQty: 2, unit: "ears" }, { text: "Potatoes, peeled and quartered (Optional)", baseQty: 2, unit: "medium pcs" }, { text: "Napa Cabbage or Regular Cabbage, cut into large wedges", baseQty: 1, unit: "small head" }, { text: "Bok Choy or Pechay, leaves separated", baseQty: 1, unit: "bundle" }, { text: "Green Beans (Baguio beans), trimmed (Optional)", baseQty: 100, unit: "g" }, { text: "Fish Sauce (Patis)", baseQty: null, unit: "to taste" }, { text: "Water", baseQty: null, unit: "enough to cover beef generously (approx 2-3 liters)" }, { text: "Salt", baseQty: null, unit: "to taste" } ], instructions: ["Place beef shanks in a large stockpot. Add enough cold water to cover by at least 2 inches.", "Bring to a rolling boil over high heat. Skim off any scum and impurities that rise to the surface for a clear broth (continue skimming for several minutes).", "Once scum is removed, add the quartered onion and whole peppercorns.", "Lower the heat to a gentle simmer. Cover the pot loosely and cook for 2-3 hours, or until the beef is fork-tender and the marrow is soft. Add hot water as needed to keep the beef submerged.", "Add the corn segments (and optional potatoes). Simmer for 15-20 minutes until corn is cooked and potatoes are tender.", "Season the broth generously with fish sauce (patis). Start with a few tablespoons and add more to taste. Add salt if needed.", "Add the cabbage wedges (and optional green beans). Cook for 3-5 minutes until slightly softened.", "Add the bok choy/pechay leaves and cook for just 1-2 minutes more until wilted.", "Ladle the soup, beef, marrow, corn, and vegetables into large bowls.", "Serve steaming hot with rice and a side dish of fish sauce with calamansi and chili for dipping."] }
        ],
        fish: [
             { name: "Sinigang na Isda", time: "30 mins", difficulty: "Easy", icon: "fa-solid fa-fish-fins", desc: "A light and sour Filipino fish soup using tamarind broth with vegetables.", img: "https://www.maggi.ph/sites/default/files/styles/image_744_x_419/public/srh_recipes/48ce3132d5a437e6977cd0c6df0f094d.jpg?h=561fe1eb&itok=1tOMxI7T", baseMeatWeight: 500, ingredients: [ { text: "Tamarind Soup Base (Sinigang Mix)", baseQty: 1, unit: "packet (approx 20-30g)" }, { text: "Large Onion, quartered", baseQty: 1, unit: "pcs" }, { text: "Medium Tomatoes, quartered", baseQty: 2, unit: "pcs" }, { text: "Daikon Radish (Labanos), peeled and sliced", baseQty: 1, unit: "medium pcs" }, { text: "String Beans (Sitaw), cut into 2-inch lengths", baseQty: 1, unit: "bundle (approx 150g)" }, { text: "Okra, ends trimmed", baseQty: 8, unit: "pcs" }, { text: "Water Spinach (Kangkong) or Bok Choy leaves", baseQty: 1, unit: "bundle (approx 200g)" }, { text: "Finger Chilies (Siling Pangsigang, optional)", baseQty: 2, unit: "pcs" }, { text: "Fish Sauce (Patis)", baseQty: null, unit: "to taste" }, { text: "Water or Rice Washing (Hugas Bigas)", baseQty: 1200, unit: "ml" } ], instructions: ["In a pot, combine water/rice washing, onion, and tomatoes. Bring to a boil.", "Add tamarind soup base (start with less if unsure, add more later) and radish. Simmer for 5 minutes.", "Gently add the fish pieces (steaks or whole). Lower heat and simmer gently for 8-10 minutes, or until fish is just cooked through (opaque). Do not over-stir or overcook the fish.", "Add string beans, okra, and finger chilies (if using). Cook for 3-5 minutes until vegetables are tender-crisp.", "Add water spinach or bok choy and cook for 1 minute until just wilted.", "Season carefully with fish sauce (patis) to taste. Be gentle when stirring.", "Serve immediately in bowls, ensuring each serving gets fish, broth, and vegetables."] },
             { name: "Paksiw na Isda", time: "25 mins", difficulty: "Easy", icon: "fa-solid fa-fish", desc: "Fish simmered gently in vinegar, garlic, ginger, and peppercorns, often with vegetables like eggplant or bitter gourd.", img: "https://www.maggi.ph/sites/default/files/styles/home_stage_1500_700/public/srh_recipes/41b263bf239ea5e6125956c96bca84a4.jpg?h=28121b77&itok=EZuzNQDe", baseMeatWeight: 500, ingredients: [ { text: "White Vinegar (Cane or Coconut)", baseQty: 180, unit: "ml" }, { text: "Water", baseQty: 120, unit: "ml" }, { text: "Garlic, crushed", baseQty: 6, unit: "cloves" }, { text: "Ginger, sliced", baseQty: 1, unit: "thumb-sized pc" }, { text: "Whole Peppercorns", baseQty: 1, unit: "tsp" }, { text: "Finger Chilies (Siling Pangsigang)", baseQty: 3, unit: "pcs" }, { text: "Fish Sauce (Patis) or Salt", baseQty: null, unit: "to taste" }, { text: "Eggplant (Talbos), sliced (Optional)", baseQty: 1, unit: "small pcs" }, { text: "Bitter Gourd (Ampalaya), sliced (Optional)", baseQty: 0.5, unit: "small pcs" } ], instructions: ["Arrange optional vegetables (eggplant, bitter gourd) at the bottom of a pot if using.", "Place the fish on top of the vegetables (or directly in the pot).", "Add vinegar, water, garlic, ginger, peppercorns, and finger chilies.", "Bring the mixture to a boil over medium-high heat *without covering* the pot (allows sharp vinegar smell to dissipate).", "Once boiling, lower the heat, cover the pot, and simmer gently for 15-20 minutes, or until the fish is cooked through and vegetables (if used) are tender.", "Season with fish sauce (patis) or salt to taste during the last few minutes of cooking. Adjust liquid if needed (some prefer more sauce, some less).", "Serve hot with steamed rice."] },
             { name: "Fish Kinilaw", time: "20 mins + Marinating", difficulty: "Easy", icon: "fa-regular fa-lemon", desc: "Filipino ceviche where fresh, raw fish is 'cooked' (denatured) by the acidity of vinegar or citrus juice.", img: "https://nutriasia.com/wp-content/uploads/2018/10/kinilawThumb.jpg", baseMeatWeight: 500, ingredients: [ { text: "Coconut Vinegar or Cane Vinegar (Sukang Tuba or Paombong preferred)", baseQty: 180, unit: "ml" }, { text: "Calamansi or Lime Juice (optional, adds brightness)", baseQty: 30, unit: "ml" }, { text: "Red Onion, chopped finely", baseQty: 1, unit: "medium pcs" }, { text: "Ginger, minced or julienned finely", baseQty: 1.5, unit: "thumb-sized pcs" }, { text: "Red Chili Peppers (Siling Labuyo), chopped finely", baseQty: 3, unit: "pcs" }, { text: "Salt", baseQty: 1, unit: "tsp" }, { text: "Black Pepper, freshly ground", baseQty: 0.5, unit: "tsp" }, { text: "Cucumber, seeded and chopped small (Optional)", baseQty: 0.5, unit: "medium pcs" }, { text: "Green Bell Pepper, chopped small (Optional)", baseQty: 0.5, unit: "pcs" }, { text: "Coconut Milk or Cream (Optional, Visayan style 'Sinuglaw' often includes it)", baseQty: 60, unit: "ml" } ], instructions: ["Ensure fish is very fresh and suitable for raw consumption. Cut into uniform bite-sized cubes (approx 1/2 to 3/4 inch).", "Wash the fish cubes gently in cold water and drain very thoroughly. Pat dry gently if needed.", "In a non-metallic bowl (glass or ceramic), combine the fish cubes, vinegar, calamansi/lime juice (if using), red onion, ginger, and chili peppers.", "Mix gently but thoroughly to ensure all fish pieces are coated with the acidic liquid.", "Season with salt and pepper. Mix again gently.", "Cover the bowl and refrigerate for at least 30 minutes, or up to 1 hour. The acid will 'cook' the fish, turning it opaque.", "Check fish after 30 mins - it should be opaque on the outside and slightly translucent inside (adjust time based on preference, longer time 'cooks' it more).", "Just before serving, stir in optional cucumber and/or bell pepper.", "For Visayan style: You can drain *some* (not all) of the initial vinegar marinade after 'cooking' and stir in fresh coconut milk or cream. Mix gently.", "Taste and adjust seasoning (salt, pepper, maybe more chili or calamansi) if necessary.", "Serve chilled as an appetizer or main dish."] },
             { name: "Sweet and Sour Fish (Escabeche)", time: "35 mins", difficulty: "Medium", icon: "fa-solid fa-fish-fins", desc: "Whole fried fish smothered in a colorful sweet and sour sauce with bell peppers, onions, and carrots.", img: "https://www.foxyfolksy.com/wp-content/uploads/2014/04/escabeche-640.jpg", baseMeatWeight: 750, ingredients: [ { text: "Whole Fish, cleaned, scaled, scored (Tilapia, Red Snapper, Lapu-Lapu)", baseQty: 1, unit: "pcs (~750g)" }, { text: "Salt and Pepper (for seasoning fish)", baseQty: null, unit: "to taste" }, { text: "All-Purpose Flour or Cornstarch (for dredging)", baseQty: 60, unit: "ml" }, { text: "Cooking Oil for frying", baseQty: null, unit: "enough for shallow or deep frying" }, { text: "White Vinegar", baseQty: 120, unit: "ml" }, { text: "Water", baseQty: 120, unit: "ml" }, { text: "Brown Sugar", baseQty: 120, unit: "ml" }, { text: "Ketchup (optional, for color and tang)", baseQty: 30, unit: "ml" }, { text: "Soy Sauce or Fish Sauce (optional, for umami)", baseQty: 15, unit: "ml" }, { text: "Medium Onion, sliced", baseQty: 1, unit: "pcs" }, { text: "Garlic, minced", baseQty: 3, unit: "cloves" }, { text: "Ginger, julienned", baseQty: 1, unit: "thumb-sized pc" }, { text: "Carrot, julienned", baseQty: 1, unit: "small pcs" }, { text: "Red Bell Pepper, julienned", baseQty: 0.5, unit: "pcs" }, { text: "Green Bell Pepper, julienned", baseQty: 0.5, unit: "pcs" }, { text: "Cornstarch Slurry (1 tbsp cornstarch + 2 tbsp water)", baseQty: 1, unit: "batch" }, { text: "Cooking Oil (for sauce)", baseQty: 15, unit: "ml" } ], instructions: ["Pat the whole fish completely dry. Season inside and out with salt and pepper.", "Lightly dredge the fish in flour or cornstarch, shaking off excess.", "Heat enough oil in a large frying pan or wok for shallow or deep frying over medium-high heat.", "Carefully fry the fish until golden brown, crispy, and cooked through (about 5-8 minutes per side, depending on size).", "Remove fish from pan and drain on paper towels or a wire rack. Place on a serving platter.", "Prepare the sauce: In a separate saucepan or wok, heat 1 tbsp oil over medium heat.", "Sauté ginger, garlic, and onion until fragrant.", "Add julienned carrots and bell peppers. Stir-fry for 1-2 minutes until slightly softened but still crisp.", "In a small bowl, whisk together vinegar, water, brown sugar, optional ketchup, and optional soy/fish sauce.", "Pour the mixture into the saucepan with the vegetables. Bring to a simmer.", "Give the cornstarch slurry a quick stir and pour it into the simmering sauce, whisking constantly until the sauce thickens slightly (cook for about 1 minute).", "Taste the sauce and adjust sweetness, sourness, or saltiness if needed.", "Pour the hot sweet and sour sauce generously over the fried fish on the serving platter.", "Garnish with extra fresh onion rings or chopped green onions if desired.", "Serve immediately with steamed rice."] },
             { name: "Ginataang Isda (Fish in Coconut Milk)", time: "30 mins", difficulty: "Easy", icon: "fa-solid fa-seedling", desc: "Fish simmered gently in creamy coconut milk with ginger, garlic, onions, chilies, and leafy greens.", img: "https://images.yummy.ph/yummy/uploads/2016/03/ginataangtilapia-7.jpg", baseMeatWeight: 500, ingredients: [ { text: "Coconut Milk", baseQty: 400, unit: "ml" }, { text: "Water or Coconut Water", baseQty: 120, unit: "ml" }, { text: "White Vinegar (optional, adds slight tang)", baseQty: 15, unit: "ml" }, { text: "Garlic, minced", baseQty: 4, unit: "cloves" }, { text: "Onion, sliced", baseQty: 1, unit: "medium pcs" }, { text: "Ginger, sliced or julienned", baseQty: 1, unit: "thumb-sized pc" }, { text: "Long Green Chilies (Siling Pangsigang), whole or sliced", baseQty: 3, unit: "pcs" }, { text: "Red Chili (Siling Labuyo), chopped (optional, for heat)", baseQty: 1, unit: "pcs" }, { text: "Leafy Greens (Pechay, Spinach, Malunggay leaves)", baseQty: 1, unit: "large bundle" }, { text: "Fish Sauce (Patis) or Salt", baseQty: null, unit: "to taste" }, { text: "Black Pepper", baseQty: null, unit: "to taste" }, { text: "Cooking Oil", baseQty: 15, unit: "ml" } ], instructions: ["Heat oil in a pot or deep pan over medium heat. Sauté garlic, onion, and ginger until fragrant.", "Pour in the coconut milk and water/coconut water. Add optional vinegar. Bring to a gentle simmer (do not boil rapidly).", "Carefully add the fish pieces and the long green chilies (and optional red chili).", "Lower the heat, cover partially, and simmer gently for 10-15 minutes, or until the fish is cooked through.", "Season with fish sauce (or salt) and black pepper to taste.", "Add the leafy greens. Stir gently or push them down into the sauce. Cook for 1-2 minutes more until just wilted.", "Serve hot with steamed rice."] },
        ]
    };
    // ========================================================================
    // == END OF RECIPE DATA ==================================================
    // ========================================================================



    // ========================================================================
    // == END OF RECIPE DATA ==================================================
    // ========================================================================


    // --- Helper Functions & State ---
    const POUND_TO_GRAM = 453.592;
    const SCALABLE_UNITS = ['g', 'kg', 'ml', 'l', 'oz', 'cup', 'tbsp', 'tsp', 'pcs', 'cloves', 'can', 'ears'];
    const SMALL_UNITS = ['tsp', 'tbsp'];
    const COUNT_UNITS = ['pcs', 'cloves', 'leaves', 'stalks', 'ears'];
    const NON_SCALABLE_UNITS_STRICT = ['head', 'bundle', 'packet', 'pinch', 'handful', 'thumb-sized pc', 'thumb-sized', 'thumb', 'batch', 'small head'];
    const DESCRIPTIVE_UNITS = ['to taste', 'enough to cover', 'enough for deep frying', "can's worth", "few strips", 'loosely packed', 'as desired', 'enough for pork', 'approx 40g', 'approx 20-30g', 'approx 150g', 'approx 200g', 'pcs (~750g)', 'cup loosely packed'];

    let recipeSwiperInstance = null;
    let portionGrams = 0;
    let currentMeatWeightGrams = 0;
    let lastFocusedElement;

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

        if (DESCRIPTIVE_UNITS.includes(u) || NON_SCALABLE_UNITS_STRICT.includes(u)) return "";
        if (quantity < 0.1 && SMALL_UNITS.includes(u)) return "";

        if (SMALL_UNITS.includes(u)) {
            const fractions = { '0.25': '¼', '0.5': '½', '0.75': '¾' };
            const whole = Math.floor(quantity);
            const decimal = quantity - whole;
            let fractionStr = "";
            if (decimal >= 0.18 && decimal < 0.4) fractionStr = fractions['0.25'];
            else if (decimal >= 0.4 && decimal < 0.65) fractionStr = fractions['0.5'];
            else if (decimal >= 0.65 && decimal < 0.87) fractionStr = fractions['0.75'];
            else if (decimal >= 0.87) return (whole + 1).toString();
            const wholeStr = whole > 0 ? whole.toString() : "";
            return `${wholeStr}${wholeStr && fractionStr ? ' ' : ''}${fractionStr}`.trim() || (decimal > 0.1 ? 'pinch' : '');
        }

        if (COUNT_UNITS.includes(u)) {
             if (quantity < 0.4) return "";
             if (quantity < 1) return "½";
             const rounded = Math.round(quantity);
             return rounded > 0 ? rounded.toString() : "";
        }

        if (u === 'can') {
             const rounded = Math.round(quantity * 2) / 2;
             if (rounded < 0.5) return "";
             if (rounded === 0.5) return "½";
             return rounded % 1 === 0 ? rounded.toString() : `${Math.floor(rounded)}½`;
        }
         // Format 'cup' unit, showing fractions
         if (u === 'cup') {
            const fractions = { '0.25': '¼', '0.33': '⅓', '0.5': '½', '0.66': '⅔', '0.75': '¾' };
            const whole = Math.floor(quantity);
            const decimal = quantity - whole;
            let fractionStr = "";

            if (decimal >= 0.18 && decimal < 0.3) fractionStr = fractions['0.25']; // ~1/4
            else if (decimal >= 0.3 && decimal < 0.45) fractionStr = fractions['0.33']; // ~1/3
            else if (decimal >= 0.45 && decimal < 0.6) fractionStr = fractions['0.5']; // ~1/2
            else if (decimal >= 0.6 && decimal < 0.7) fractionStr = fractions['0.66']; // ~2/3
            else if (decimal >= 0.7 && decimal < 0.87) fractionStr = fractions['0.75']; // ~3/4
            else if (decimal >= 0.87) return (whole + 1).toString(); // Round up if very close

            const wholeStr = whole > 0 ? whole.toString() : "";
            return `${wholeStr}${wholeStr && fractionStr ? ' ' : ''}${fractionStr}`.trim() || "";
        }

        if (quantity < 1) return quantity.toFixed(1);
        if (quantity < 10 && quantity % 1 !== 0) return quantity.toFixed(1);
        return Math.round(quantity).toString();
    };

    const validateInput = (input, errorMessage) => {
        clearError(input);
        const value = parseFloat(input.value);
        const errorId = input.getAttribute('aria-describedby');

        if (input.value.trim() === '' || isNaN(value) || (input.min && value < parseFloat(input.min))) {
            showError(input, errorMessage, errorId);
            return false;
        }
         if ((input.id === 'meatWeight' || input.id === 'customPortion') && value <= 0) {
             showError(input, 'Value must be greater than 0.', errorId);
             return false;
         }
        return true;
    };

    const showError = (input, message, errorId) => {
        input.classList.add('input-error');
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', errorId);

        if (input.id === 'meatWeight') {
            input.closest('.weight-input-container')?.classList.add('input-error');
            meatWeightUnitSelect.classList.add('input-error');
        } else if (input.tagName === 'SELECT') {
            input.closest('.select-wrapper')?.classList.add('input-error');
        }

        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            void errorElement.offsetWidth;
            errorElement.style.opacity = '1';
        }
    };

    const clearError = (input) => {
        const errorId = input.getAttribute('aria-describedby');
        input.classList.remove('input-error');
        input.removeAttribute('aria-invalid');

        if (input.id === 'meatWeight') {
             input.closest('.weight-input-container')?.classList.remove('input-error');
             meatWeightUnitSelect.classList.remove('input-error');
         } else if (input.tagName === 'SELECT') {
            input.closest('.select-wrapper')?.classList.remove('input-error');
         }

        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.opacity = '0';
        }
    };

    const calculateServings = (totalGrams, portionGrams) => {
        if (portionGrams <= 0 || totalGrams <=0 ) return 0;
        return Math.round(totalGrams / portionGrams);
    };

    const getRecommendations = (meatType) => recommendationsData[meatType] || { cooking: 'N/A', time: 'N/A', seasoning: 'N/A' };

    const displayResults = (servings, recommendations) => {
        resultLoadingIndicator.classList.add('hidden');
        resultPlaceholder.classList.add('hidden');
        resultList.innerHTML = '';

        let servingsText = "N/A";
        if (servings > 0) {
            servingsText = `${servings} ${servings === 1 ? "serving" : "servings"}`;
        } else if (currentMeatWeightGrams > 0 && portionGrams > 0) {
            servingsText = "Less than 1 serving";
        }
        const formattedPortion = portionGrams % 1 === 0 ? portionGrams.toString() : portionGrams.toFixed(1);

        const items = [
            { icon: 'fa-solid fa-users', label: 'Approx. Servings', value: servingsText },
            { icon: 'fa-solid fa-utensils', label: 'Serving Size Used', value: `${formattedPortion}g / person` },
            { icon: 'fa-solid fa-fire-burner', label: 'Suggested Methods', value: recommendations.cooking },
            { icon: 'fa-solid fa-stopwatch', label: 'Est. Cooking Time', value: recommendations.time },
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
        if (!recipe || !Array.isArray(recipe.ingredients)) {
             console.error("Invalid recipe data passed to modal:", recipe);
             alert("Sorry, recipe details are incomplete or invalid.");
             return;
        }
        lastFocusedElement = document.activeElement;

        let scalingFactor = 1;
        const baseWeight = recipe.baseMeatWeight;
        const hasBaseWeight = baseWeight && typeof baseWeight === 'number' && baseWeight > 0;
        const hasCurrentWeight = currentMeatWeightGrams && typeof currentMeatWeightGrams === 'number' && currentMeatWeightGrams > 0;
        if (hasBaseWeight && hasCurrentWeight) {
            scalingFactor = currentMeatWeightGrams / baseWeight;
        } else {
             console.warn("Using base recipe amounts. Base weight or current weight missing/invalid.", { baseWeight, currentMeatWeightGrams });
             scalingFactor = 1;
        }

        modalRecipeImage.src = '';
        modalRecipeImage.style.opacity = '0';
        modalImagePlaceholder.style.display = 'block';
        modalRecipeImage.alt = recipe.name || 'Recipe Image';
        modalRecipeImage.onerror = () => {
             console.warn("Failed to load image:", recipe.img);
             modalImagePlaceholder.style.display = 'block';
             modalRecipeImage.style.opacity = '0';
        };
        modalRecipeImage.onload = () => {
             modalImagePlaceholder.style.display = 'none';
             modalRecipeImage.style.opacity = '1';
        };
        modalRecipeImage.src = recipe.img || '';

        modalRecipeTitle.textContent = recipe.name || 'Recipe Details';
        modalRecipeDesc.textContent = recipe.desc || 'No description available.';

        modalIngredientsList.innerHTML = '';
        let hasIngredients = false;
        if (recipe.ingredients) {
            if (hasCurrentWeight) {
                let meatName = 'Meat';
                const lowerCaseName = (recipe.name || '').toLowerCase();
                if (lowerCaseName.includes('pork')) meatName = 'Pork';
                else if (lowerCaseName.includes('chicken')) meatName = 'Chicken';
                else if (lowerCaseName.includes('beef')) meatName = 'Beef';
                else if (lowerCaseName.includes('fish')) meatName = 'Fish';
                modalIngredientsList.innerHTML += `<li class="scaled-meat-amount"><strong>${currentMeatWeightGrams.toFixed(0)}g</strong> ${meatName} (Your Amount)</li><li><hr></li>`;
            }
            recipe.ingredients.forEach(item => {
                if (!item || typeof item !== 'object') return;
                const li = document.createElement('li');
                let baseText = item.text || "";
                let quantityPart = "";
                const unit = item.unit || "";
                const u = unit.toLowerCase();
                const baseQty = item.baseQty;
                let isScalable = baseQty !== null && typeof baseQty === 'number' && baseQty > 0 && SCALABLE_UNITS.includes(u);

                if (isScalable) {
                    const scaledQty = baseQty * scalingFactor;
                    const formattedQty = formatQuantity(scaledQty, unit);
                     if (formattedQty) {
                        const unitDisplay = (unit && !COUNT_UNITS.includes(u) && formattedQty !== 'pinch') ? ` ${unit}` : '';
                        quantityPart = `<strong>${formattedQty}${unitDisplay}</strong>`;
                    }
                } else if (baseQty && unit && !DESCRIPTIVE_UNITS.includes(u) && !NON_SCALABLE_UNITS_STRICT.includes(u)) {
                     quantityPart = `<strong>${baseQty} ${unit}</strong>`;
                } else if (baseQty && !unit) {
                     const scaledQty = baseQty * scalingFactor;
                     const formattedQty = formatQuantity(scaledQty, 'pcs');
                     if(formattedQty) quantityPart = `<strong>${formattedQty}</strong>`;
                }

                if (DESCRIPTIVE_UNITS.includes(u) || NON_SCALABLE_UNITS_STRICT.includes(u)) {
                    if (!baseText.toLowerCase().includes(u.split(' ')[0])) {
                         baseText = `${baseText} <em>(${unit})</em>`;
                    }
                }

                li.innerHTML = `${quantityPart} ${baseText}`.trim();
                if (li.innerHTML && li.innerHTML !== ' ' && li.innerHTML !== ' ') {
                    modalIngredientsList.appendChild(li);
                    hasIngredients = true;
                }
            });
        }
        if (!hasIngredients && !hasCurrentWeight) {
            modalIngredientsList.innerHTML = '<li>Ingredients not specified.</li>';
        } else if (!hasIngredients && hasCurrentWeight && modalIngredientsList.children.length <= 2) {
             modalIngredientsList.innerHTML += '<li>Other ingredients not specified or scaled.</li>';
        }

        modalInstructionsList.innerHTML = '';
        if (recipe.instructions && Array.isArray(recipe.instructions) && recipe.instructions.length > 0) {
            recipe.instructions.forEach(step => {
                 if (typeof step === 'string' && step.trim() !== '') {
                     modalInstructionsList.innerHTML += `<li>${step}</li>`;
                 }
            });
        }
        if (modalInstructionsList.innerHTML === '') {
            modalInstructionsList.innerHTML = '<li>Instructions not provided.</li>';
        }

        recipeModal.classList.add('active');
        recipeModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        recipeModal.querySelector('.modal-content').scrollTop = 0;
        modalCloseBtn.focus();
    };

    const closeRecipeModal = () => {
        recipeModal.classList.remove('active');
        recipeModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedElement) lastFocusedElement.focus();
    };


    /** Displays recipe suggestion cards using Swiper JS */
    const displayRecipeSuggestions = (meatType) => {
        recipeLoadingIndicator.classList.add('hidden');
        if (!recipeSwiperSlidesContainer) {
            console.error("Swiper slides container #recipeSwiperSlides not found!");
            return;
        }
        recipeSwiperSlidesContainer.innerHTML = '';

        let recipes = [];
        if (recipesData && typeof recipesData === 'object' && recipesData.hasOwnProperty(meatType) && Array.isArray(recipesData[meatType])) {
            recipes = recipesData[meatType];
        } else {
            console.warn(`No recipe data found or invalid format for meat type: ${meatType}`);
        }

        if (recipes.length === 0) {
            suggestionSwiperWrapperEl.classList.add('hidden');
            recipePlaceholder.textContent = `No specific recipe ideas found for "${meatType}" yet.`;
            recipePlaceholder.classList.remove('hidden');
            if (recipeSwiperInstance) {
                recipeSwiperInstance.destroy(true, true);
                recipeSwiperInstance = null;
            }
            return;
        }

        recipePlaceholder.classList.add('hidden');
        suggestionSwiperWrapperEl.classList.remove('hidden');

        recipes.forEach((recipe, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View recipe details for ${recipe.name || 'this recipe'}`);
            card.setAttribute('data-recipe-index', index);
            const difficultyClass = `difficulty-${(recipe.difficulty || 'easy').toLowerCase()}`;

            const imageHtml = `<img src="${recipe.img || ''}" alt="${recipe.name || 'Recipe image'}" loading="lazy" onerror="this.style.display='none'; this.parentElement.style.backgroundColor='var(--border-color)';">`;

            card.innerHTML = `
              <div class="suggestion-img-container">
                 ${imageHtml}
              </div>
              <div class="suggestion-content">
                <h4 class="suggestion-name">${recipe.name || 'Recipe Name'}</h4>
                <p class="suggestion-desc">${recipe.desc || 'No description available.'}</p>
                <div class="suggestion-tags">
                    <span class="tag"><i class="fa-regular fa-clock"></i> ${recipe.time || 'N/A'}</span>
                    <span class="tag ${difficultyClass}"><i class="fa-solid fa-gauge-high"></i> ${recipe.difficulty || 'N/A'}</span>
                </div>
                 <div class="suggestion-action">
                     <span class="view-recipe-link">View Recipe <i class="fa-solid fa-arrow-right"></i></span>
                 </div>
              </div>
            `;

            const actionHandler = () => openRecipeModal(recipe);
            card.addEventListener('click', actionHandler);
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); actionHandler(); }
            });

            slide.appendChild(card);
            recipeSwiperSlidesContainer.appendChild(slide);
        });

        if (recipeSwiperInstance) {
            recipeSwiperInstance.destroy(true, true);
        }

        // Initialize Swiper with Autoplay
        recipeSwiperInstance = new Swiper('.recipe-swiper', {
            slidesPerView: 1, // Show 1 slide fully on mobile
            spaceBetween: 15,
            loop: recipes.length > 3,
            grabCursor: true,
            watchOverflow: true,
            autoplay: {
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            breakpoints: {
              576: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1200: { slidesPerView: 3, spaceBetween: 30 }
            }
          });

        void suggestionSwiperWrapperEl.offsetWidth;
        suggestionSwiperWrapperEl.classList.add('visible');
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
            clearError(customPortionInput);
        }
    });

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
        suggestionSwiperWrapperEl.classList.add('hidden');
        suggestionSwiperWrapperEl.classList.remove('visible');
        recipePlaceholder.classList.add('hidden');

        let isValid = true;
        clearError(meatWeightInput);
        if (portionSizeSelect.value === 'custom') clearError(customPortionInput);

        if (!validateInput(meatWeightInput, 'Please enter a valid weight.')) isValid = false;
        if (portionSizeSelect.value === 'custom' && !validateInput(customPortionInput, 'Enter a valid custom portion size (grams).')) isValid = false;

        if (isValid) {
            const rawWeightValue = parseFloat(meatWeightInput.value);
            const selectedUnit = meatWeightUnitSelect.value;
            currentMeatWeightGrams = convertToGrams(rawWeightValue, selectedUnit);
            if (isNaN(currentMeatWeightGrams) || currentMeatWeightGrams <= 0) {
                showError(meatWeightInput, 'Weight must be a positive value.');
                isValid = false;
            }
        }
        if (isValid) {
            const selectedPortionOption = portionSizeSelect.value;
            if (selectedPortionOption === 'custom') {
                portionGrams = parseFloat(customPortionInput.value);
                if (isNaN(portionGrams) || portionGrams <= 0) {
                     showError(customPortionInput, 'Custom portion must be greater than 0.');
                     isValid = false;
                 }
            } else {
                portionGrams = portionSizes[selectedPortionOption] || portionSizes.medium;
            }
        }

        if (!isValid) {
            calculateBtn.disabled = false;
            calculateBtn.innerHTML = originalButtonText;
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

                 // Check if recipesData is valid before proceeding
                 if (recipesData && typeof recipesData === 'object' && Object.keys(recipesData).length > 0) {
                     // recipesData has been pasted in, proceed
                     if (recipesData.hasOwnProperty(meatType)) {
                         displayRecipeSuggestions(meatType);
                     } else {
                         // recipesData exists, but not for this meat type
                         console.warn(`Recipe data exists, but no key found for meat type: ${meatType}`);
                         recipePlaceholder.textContent = `No recipes available for ${meatType}.`;
                         recipePlaceholder.classList.remove('hidden');
                         suggestionSwiperWrapperEl.classList.add('hidden');
                         if (recipeSwiperInstance) {
                             recipeSwiperInstance.destroy(true, true);
                             recipeSwiperInstance = null;
                         }
                     }
                 } else {
                     // recipesData placeholder is still empty or invalid
                     console.error("recipesData is empty or invalid. Please paste the recipe data object.");
                     recipePlaceholder.textContent = "Recipe data is missing. Cannot display suggestions.";
                     recipePlaceholder.classList.remove('hidden');
                     suggestionSwiperWrapperEl.classList.add('hidden');
                      if (recipeSwiperInstance) {
                           recipeSwiperInstance.destroy(true, true);
                           recipeSwiperInstance = null;
                       }
                 }

                const resultsCard = document.querySelector('.result-card');
                if (resultsCard && window.innerWidth < 1024) {
                    setTimeout(() => {
                        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 150);
                }
            } catch (error) {
                 console.error("Error during calculation/display:", error);
                 resultPlaceholder.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i><p>Oops! Calculation error.</p>`;
                 resultPlaceholder.classList.remove('hidden');
                 recipePlaceholder.textContent = "Could not load recipes due to an error.";
                 recipePlaceholder.classList.remove('hidden');
                 resultLoadingIndicator.classList.add('hidden');
                 recipeLoadingIndicator.classList.add('hidden');
                 suggestionSwiperWrapperEl.classList.add('hidden');
            } finally {
                 calculateBtn.disabled = false;
                 calculateBtn.innerHTML = originalButtonText;
                 recipeLoadingIndicator.classList.add('hidden');
            }
        }, 500);
    });

    modalCloseBtn.addEventListener('click', closeRecipeModal);
    modalOverlay.addEventListener('click', closeRecipeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && recipeModal.classList.contains('active')) closeRecipeModal();
        if (e.key === 'Tab' && recipeModal.classList.contains('active')) {
             const focusableElements = recipeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
             const firstElement = focusableElements[0];
             const lastElement = focusableElements[focusableElements.length - 1];
             if (e.shiftKey) {
                 if (document.activeElement === firstElement) { lastElement.focus(); e.preventDefault(); }
             } else {
                 if (document.activeElement === lastElement) { firstElement.focus(); e.preventDefault(); }
             }
        }
    });

    // --- Initial Setup ---
    calculateScrollbarWidth();
    window.addEventListener('resize', calculateScrollbarWidth);

    resultList.classList.add('hidden');
    resultPlaceholder.classList.remove('hidden');
    suggestionSwiperWrapperEl.classList.add('hidden');
    recipePlaceholder.classList.remove('hidden');
    resultLoadingIndicator.classList.add('hidden');
    recipeLoadingIndicator.classList.add('hidden');

    if (portionSizeSelect.value !== 'custom') {
        customPortionGroup.classList.add('hidden');
        customPortionInput.required = false;
    } else {
        customPortionGroup.classList.remove('hidden');
        customPortionInput.required = true;
    }

    if(currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded
