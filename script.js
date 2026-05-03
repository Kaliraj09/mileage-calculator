function calculateKali() {
    // Get Inputs
    const km = parseFloat(document.getElementById('distance').value);
    const fuelType = document.getElementById('fuelType').value;
    const litres = parseFloat(document.getElementById('fuelQuantity').value);
    const cost = parseFloat(document.getElementById('totalAmount').value);

    // Validate
    if (!km || !litres || !cost) {
        alert("Please fill in all fields correctly.");
        return;
    }

    // Calculations
    const mileagePerLitre = (km / litres).toFixed(2);
    const costPerKm = (cost / km).toFixed(2);

    // Display Results
    document.getElementById('costPerKm').textContent = "₹" + costPerKm;
    document.getElementById('mileage').textContent = mileagePerLitre + " km/L";
    document.getElementById('dispFuel').textContent = fuelType;
    document.getElementById('dispDist').textContent = km;

    // Show result container
    document.getElementById('results').classList.remove('hidden');
}


