
function calcDis(cartTotal, quantities) {
    const discountRules = {
        flat_10_discount: cartTotal > 200 && 10,
        bulk_5_discount: Object.values(quantities).some(quantity => quantity > 10),
        bulk_10_discount: Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0) > 20,
        tiered_50_discount: Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0) > 30 &&
                           Object.values(quantities).some(quantity => quantity > 15),
    };

    const applicableDiscounts = Object.entries(discountRules)
                                   .filter(([_, value]) => value !== false)
                                   .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    if (Object.keys(applicableDiscounts).length > 0) {
        const bestDiscount = Object.keys(applicableDiscounts)
                                  .reduce((a, b) => applicableDiscounts[a] > applicableDiscounts[b] ? a : b);
        return [bestDiscount, applicableDiscounts[bestDiscount]];
    } else {
        return [null, 0];
    }
}

function main() {
    
    const products = { "Product A": 20, "Product B": 40, "Product C": 50 };
    const quantities = {};  // User input for product quantities
    const giftWrapFee = 1;
    const shippingFeePerPackage = 5;
    const unitsPerPackage = 10;

    for (const [product, price] of Object.entries(products)) {
        const quantity = parseInt(prompt(`Enter the quantity of ${product}: `), 10);
        const isGiftWrapped = prompt(`Is ${product} wrapped as a gift? (yes/no): `).toLowerCase() === "yes";
        quantities[product] = quantity;
    }

    const subtotal = Object.entries(quantities)
                      .reduce((acc, [product, quantity]) => acc + quantity * products[product], 0);

    const [discountName, discountAmount] = calcDis(subtotal, quantities);

    const totalDiscount = discountAmount;
    const totalGiftWrapFee = Object.entries(quantities)
                             .reduce((acc, [product, quantity]) => acc + quantity * giftWrapFee, 0);

    const totalShippingFee = Math.floor(Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0) / unitsPerPackage) * shippingFeePerPackage;

    const total = subtotal - totalDiscount + totalGiftWrapFee + totalShippingFee;

    console.log("\nProduct Details:");
    for (const [product, quantity] of Object.entries(quantities)) {
        const totalAmount = quantity * products[product];
        console.log(`${product}: Quantity - ${quantity}, Total Amount - $${totalAmount}`);
    }

    console.log("\nSubtotal Is:", `$${subtotal}`);
    console.log("Discount Applied Is:", `${discountName} - $${discountAmount}`);
    console.log("Shipping Fee Is:", `$${totalShippingFee}`);
    console.log("Gift Wrap Fee Is:", `$${totalGiftWrapFee}`);
    console.log("\nTotal Is:", `$${total}`);
}

if (typeof window === 'undefined') {
    main();
}

