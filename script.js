document.getElementById("calculateBtn").addEventListener("click", function() {
    const numUsers = parseInt(document.getElementById("numUsers").value);
    const duration = parseInt(document.getElementById("duration").value);
    const tier = document.getElementById("tierSelect").value;
    let pricePerUser = 10;

    switch (tier) {
        case "pro":
            pricePerUser = 20;
            break;
        case "enterprise":
            pricePerUser = 30;
            break;
    }

    const totalPrice = numUsers * pricePerUser * duration;
    document.getElementById("result").innerText = `Total Price: $${totalPrice}`;
});
