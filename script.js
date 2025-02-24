// Load Header
document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Error loading header:", error));
});

let pricingData = {};
const exchangeRates = {
    "USD": 1,
    "EUR": 0.92,
    "GBP": 0.78
};
const discountRates = {
    "1": 0,     // No discount for 1 month
    "3": 0.05,  // 5% discount for 3 months
    "6": 0.10,  // 10% discount for 6 months
    "12": 0.15  // 15% discount for 12 months
};

// Load pricing data from JSON
fetch("pricing.json")
    .then(response => response.json())
    .then(data => {
        pricingData = data;
        populateDropdowns();
    })
    .catch(error => console.error("Error loading pricing data:", error));

function populateDropdowns() {
    const productSelect = document.getElementById("productSelect");
    const tierSelect = document.getElementById("tierSelect");

    // Populate product options
    Object.keys(pricingData).forEach(product => {
        let option = document.createElement("option");
        option.value = product;
        option.textContent = product;
        productSelect.appendChild(option);
    });

    // Update tiers when a product is selected
    productSelect.addEventListener("change", updateTiers);
    updateTiers();
}

function updateTiers() {
    const product = document.getElementById("productSelect").value;
    const tierSelect = document.getElementById("tierSelect");

    // Clear existing tier options
    tierSelect.innerHTML = "";

    // Populate tier options based on the selected product
    Object.keys(pricingData[product]).forEach(tier => {
        let option = document.createElement("option");
        option.value = tier;
        option.textContent = `${tier} users - $${pricingData[product][tier]}`;
        tierSelect.appendChild(option);
    });
}

document.getElementById("calculateBtn").addEventListener("click", function() {
    const product = document.getElementById("productSelect").value;
    const tier = document.getElementById("tierSelect").value;
    const duration = document.getElementById("duration").value;
    const currency = document.getElementById("currencySelect").value;

    if (!product || !tier || !duration) {
        document.getElementById("result").innerText = "Please select all options.";
        return;
    }

    let basePrice = pricingData[product][tier] * duration;
    
    // Apply discount
    let discount = discountRates[duration] || 0;
    let finalPrice = basePrice * (1 - discount);

    // Convert to selected currency
    let convertedPrice = finalPrice * exchangeRates[currency];

    document.getElementById("result").innerText = 
        `Total Price: ${currency} ${convertedPrice.toFixed(2)} (${discount * 100}% discount applied)`;
});

