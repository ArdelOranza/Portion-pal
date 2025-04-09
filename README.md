
Portion Pal - Meat Portion Calculator & Filipino Recipe Suggester

Portion Pal is a web application designed to help users accurately calculate meat portions for meals and discover relevant Filipino recipe suggestions based on the chosen meat type and quantity. It automatically scales recipe ingredients based on the user's input meat weight.

Features

Meat Portion Calculation: Calculates the approximate number of servings based on total meat weight and desired serving size (pre-defined or custom).

Cooking Recommendations: Provides general cooking method suggestions, estimated times, and seasoning ideas for selected meat types.

Filipino Recipe Suggestions: Displays relevant Filipino recipe cards based on the selected meat type.

Recipe Details Modal: Shows detailed recipe information including:

Scaled ingredient quantities based on user's input meat weight.

Step-by-step instructions.

Image, cooking time, and difficulty level.

Responsive Design: Adapts to different screen sizes (desktop, tablet, mobile).

Interactive UI: Includes loading states, input validation, and smooth transitions.

Recipe Carousel: Uses Swiper.js for an engaging recipe browsing experience.

Tech Stack

HTML: Structure of the web page.

CSS: Styling, layout, and responsiveness (using CSS Variables).

JavaScript (Vanilla): Core logic for calculations, DOM manipulation, event handling, recipe scaling, and modal interaction.

Swiper.js: JavaScript library for the recipe suggestion carousel.

Font Awesome: For icons throughout the interface.

How to Run Locally

Download the Files: Make sure you have the following files in the same folder:

index.html

styles.css

script.js

utensilsbr-solid.svg (or your chosen favicon file)

Open the HTML File: Simply double-click the index.html file. It should open in your default web browser.

Alternatively (Recommended for Development): If you plan on making changes or encounter issues with fetching local resources in some browsers, it's better to use a simple local web server.

If you have Node.js installed, open a terminal or command prompt in the folder containing the files and run: npx serve

Then, open your browser and navigate to the URL provided by the serve command (usually http://localhost:3000 or similar).

Other simple server options exist (like Python's http.server, or extensions for code editors like VS Code's "Live Server").

How to Use the Application

Select Meat Type: Choose Pork, Chicken, Beef, or Fish from the dropdown.

Enter Weight: Input the total weight of the meat you have and select the correct unit (g, kg, lbs).

Choose Serving Size Goal: Select a pre-defined serving size (Light, Standard, Hearty) or choose "Custom..." to enter your own desired grams per person.

Calculate: Click the "Calculate & Suggest Recipes" button.

View Results: The "Your Results & Tips" card will update with:

Approximate number of servings.

The serving size used for the calculation (in grams).

General cooking recommendations (methods, time, seasoning).

Browse Recipes: The "Recipe Inspiration" section will show recipe cards relevant to the selected meat type in a carousel.

View Recipe Details: Click on any recipe card (or the "View Recipe" link) to open a modal window.

Recipe Modal: The modal displays:

The recipe image, name, and description.

Scaled ingredients: The ingredient list is adjusted based on the meat weight you entered compared to the recipe's base weight.

Step-by-step instructions.

Click the 'X' button or outside the modal to close it.

How to Modify the Code

Modifying the core data (recipes, recommendations) is straightforward by editing the script.js file.

Adding/Editing Recipes

Locate recipesData: Open script.js and find the recipesData constant. It's a large object structured by meat type.

const recipesData = {
    pork: [ /* Array of pork recipes */ ],
    chicken: [ /* Array of chicken recipes */ ],
    beef: [ /* Array of beef recipes */ ],
    fish: [ /* Array of fish recipes */ ],
    // Add new meat types here, e.g., lamb: []
};


Find the Meat Type Array: Go to the array for the meat type you want to modify (e.g., pork: [ ... ]).

Add a New Recipe Object: To add a new recipe, add a new JavaScript object {} to the end of the array (before the closing ]), separated by a comma , from the previous recipe object.

Edit an Existing Recipe Object: To edit, simply modify the values within an existing recipe object {}.

Recipe Object Structure: Each recipe object must follow this structure:

{
    name: "Your Recipe Name", // String: Displayed name of the recipe
    time: "Approx. Cooking Time", // String: e.g., "45 mins", "1 hr + Marinating"
    difficulty: "Easy" / "Medium" / "Hard", // String: Used for styling tags
    icon: "fa-solid fa-icon-name", // String: Font Awesome class for an optional icon (not currently displayed on card but could be used)
    desc: "A short, appealing description of the dish.", // String: Displayed on the recipe card
    img: "URL_to_your_image.jpg", // String: URL of the recipe image (use a reliable host or local path if using a server)
    baseMeatWeight: 500, // Number: *Crucial* - The amount of meat (in GRAMS) the 'baseQty' ingredients are intended for. This is used for scaling.
    ingredients: [ // Array of ingredient objects
        // --- Ingredient Object Structure ---
        {
            text: "Ingredient Name (e.g., Soy Sauce)", // String: Name of the ingredient
            baseQty: 120, // Number OR null: The quantity of this ingredient for the 'baseMeatWeight'. Use null if quantity is descriptive (e.g., 'to taste').
            unit: "ml" // String: The unit for the 'baseQty'. See "Units & Scaling" below.
        },
        { text: "Garlic, crushed", baseQty: 1, unit: "head" }, // Example: Non-strictly scalable unit
        { text: "Salt and Black Pepper", baseQty: null, unit: "to taste" }, // Example: Descriptive, non-scalable
        { text: "Cooking Oil", baseQty: 30, unit: "ml" } // Example: Scalable
        // Add more ingredient objects here...
    ],
    instructions: [ // Array of strings
        "Step 1: Do this first.",
        "Step 2: Then do this.",
        "Step 3: Continue until finished.",
        // Add more instruction strings here...
    ]
}, // <--- Don't forget the comma if adding more recipes after this one!
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END

Units & Scaling (ingredients array):

The baseQty and unit work together with baseMeatWeight for scaling in the modal.

Scalable Units: Defined in SCALABLE_UNITS (e.g., g, kg, ml, l, oz, cup, tbsp, tsp, pcs, cloves, can). Ingredients with these units and a valid baseQty will be scaled.

Formatting: The formatQuantity function tries to make scaled quantities look natural (e.g., using fractions like ½ tsp, rounding whole numbers).

Non-Scalable (Strict): Defined in NON_SCALABLE_UNITS_STRICT (e.g., head, bundle, packet, pinch). These usually display the baseQty and unit as-is without scaling.

Descriptive Units: Defined in DESCRIPTIVE_UNITS (e.g., to taste, enough to cover). These typically don't have a baseQty and the unit itself is displayed as part of the text.

Consistency: Use consistent units. Ensure baseMeatWeight is always in grams.

Save script.js and refresh your browser (index.html) to see the changes.

Adding a New Meat Type

Add to recommendationsData: In script.js, add a new key-value pair to the recommendationsData object with suggestions for the new meat type.

const recommendationsData = {
    pork: { /* ... */ },
    chicken: { /* ... */ },
    // ... existing types ...
    lamb: { cooking: "Roast, Grill, Stew", time: "≈30m / 500g Roast", seasoning: "Rosemary, Garlic, Mint, Lemon" } // New type added
};
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END

Add to recipesData: Add a new key to the recipesData object with an empty array [] to hold its recipes. Add recipe objects to this array as described above.

const recipesData = {
    pork: [ /* ... */ ],
    chicken: [ /* ... */ ],
    // ... existing types ...
    lamb: [ // New type added
        // Add lamb recipe objects here...
        { name: "Roast Lamb", /* ... other properties ... */ }
    ]
};
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END

Add to HTML Select: Open index.html and add a new <option> to the meatType select dropdown. The value must match the key you added in the JavaScript objects.

<select id="meatType" name="meatType" aria-label="Select Meat Type">
    <option value="pork">Pork</option>
    <option value="chicken">Chicken</option>
    <option value="beef">Beef</option>
    <option value="fish">Fish</option>
    <option value="lamb">Lamb</option> <!-- New option added -->
</select>
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Html
IGNORE_WHEN_COPYING_END

Save both files and refresh the browser.

Modifying Portion Sizes or Recommendations

Portion Sizes: Edit the portionSizes object in script.js to change the grams associated with 'small', 'medium', or 'large'.

Recommendations: Edit the values within the recommendationsData object for any meat type.

Changing Styles

Edit the styles.css file.

Colors, fonts, spacing, etc., are controlled using CSS variables defined in the :root { ... } block at the top for easy theming. Modify these variables to change the overall look and feel.

Standard CSS rules style individual components (cards, buttons, modal, etc.).

Dependencies

Font Awesome: Included via CDN link in index.html. Used for icons.

Swiper.js: Included via CDN links (CSS & JS) in index.html. Used for the recipe carousel.

Google Fonts: Included via CDN link in index.html for Poppins and Playfair Display fonts.

An internet connection is required to load these external dependencies when the page first loads.

Potential Improvements / Future Ideas

Add more diverse recipes (international, dietary restrictions).

Option to switch between metric and imperial units for display (requires more complex conversion logic).

Persistence (saving last used values using localStorage).

Issues

Please update the "Report Issue" link in the footer (index.html) to point to an appropriate place (e.g., a GitHub repository issues page, a contact form, or remove it).
