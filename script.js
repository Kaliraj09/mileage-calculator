/**
 * MILEAGE CALCULATOR BY KALI
 * Master Script: Includes Vehicle Database, Search Logic, and Diagnostic Checklist
 */

// 1. VEHICLE DATABASE
// Note: You can continue adding to these arrays to reach 100+ items per category.
const vehicleDb = {
    "Scooty": [
        { name: "TVS Scooty Pep+", std: 46.8 },
        { name: "Honda Activa 6G", std: 48.0 },
        { name: "TVS Jupiter 125", std: 50.0 },
        { name: "Suzuki Access 125", std: 48.0 },
        { name: "Yamaha RayZR 125", std: 66.0 },
        { name: "Hero Pleasure+ Xtec", std: 50.0 },
        { name: "Aprilia SXR 160", std: 35.0 },
        { name: "Honda Dio", std: 48.0 }
    ],
    "Bike": [
        { name: "Hero Splendor Plus", std: 65.0 },
        { name: "Honda Shine", std: 55.0 },
        { name: "Bajaj Pulsar 150", std: 45.0 },
        { name: "Royal Enfield Classic 350", std: 32.0 },
        { name: "Honda SP 125", std: 60.0 },
        { name: "TVS Apache RTR 160", std: 45.0 },
        { name: "Yamaha R15 V4", std: 40.0 },
        { name: "KTM Duke 200", std: 30.0 }
    ],
    "Car": [
        { name: "Maruti Swift", std: 22.5 },
        { name: "Maruti Wagon R", std: 24.3 },
        { name: "Tata Nexon", std: 17.5 },
        { name: "Hyundai Creta", std: 16.8 },
        { name: "Mahindra Scorpio-N", std: 14.0 },
        { name: "Toyota Innova Hycross", std: 23.2 },
        { name: "Maruti Brezza", std: 19.8 },
         { name: "Hyundai i20 Petrol (Manual)", std: 20.3 },
        { name: "Hyundai i20 Petrol (IVT)", std: 19.6 },
        { name: "Hyundai i20 N Line", std: 18.1 },
        { name: "Hyundai i20 Diesel (Older Model)", std: 25.2 },
        { name: "Tata Punch", std: 18.9 }
    ],
    "Lorry": [
        { name: "Ashok Leyland Dost+", std: 17.6 },
        { name: "Tata Ace Gold", std: 21.0 },
        { name: "Mahindra Bolero Pik-Up", std: 14.3 },
        { name: "Ashok Leyland 1615 HE", std: 5.5 },
        { name: "Tata LPT 1109", std: 6.5 },
        { name: "BharatBenz 2823R", std: 4.0 },
        { name: "Eicher Pro 2059", std: 7.5 },
        { name: "Mahindra Blazo X 49", std: 2.5 }
    ],
    "Bus": [
        { name: "TATA Starbus", std: 5.5 },
        { name: "Ashok Leyland Viking", std: 4.5 },
        { name: "Eicher Skyline", std: 6.0 },
        { name: "Volvo 9400 B11R", std: 2.2 },
        { name: "BharatBenz 917", std: 5.0 }
    ]
};

// 2. DIAGNOSTIC DATABASE (Customized advice for low performance)
const diagnosticDb = {
    "Scooty": [
        "Check CVT belt for wear and tear",
        "Clean or replace the air filter",
        "Check tyre pressure (Ideal: Front 22 PSI, Rear 32 PSI)",
        "Check for brake drag in the rear drum"
    ],
    "Bike": [
        "Lubricate and adjust drive chain tension",
        "Inspect spark plug condition",
        "Clean air filter and check carburetor/FI tuning",
        "Verify tyre pressure and wheel alignment"
    ],
    "Car": [
        "Check engine oil level and viscosity",
        "Inspect air filter and throttle body",
        "Check wheel alignment and balancing",
        "Ensure AC compressor is not overworking"
    ],
    "Lorry": [
        "Check Fuel Injection Pump (FIP) timing",
        "Clean heavy-duty air pre-cleaner",
        "Inspect dual-tyre pressure sync",
        "Check for overloaded weight limits"
    ],
    "Bus": [
        "Inspect radiator and coolant levels",
        "Check turbocharger and intercooler pipes",
        "Adjust brake drum clearance",
        "Monitor idling time during stops"
    ]
};

// 3. APP STATE
let selectedStdMileage = 0;
let selectedVehicleName = "";

// 4. SEARCH & FILTER LOGIC
function loadModels() {
    // Reset search when vehicle type changes
    document.getElementById('modelSearch').value = "";
    document.getElementById('searchDropdown').classList.add('hidden');
    selectedStdMileage = 0;
    selectedVehicleName = "";
}

function filterModels() {
    const type = document.getElementById('vehicleType').value;
    const query = document.getElementById('modelSearch').value.toLowerCase();
    const dropdown = document.getElementById('searchDropdown');
    
    if (!type) {
        alert("Please select a Vehicle Category (Scooty, Bike, etc.) first.");
        document.getElementById('modelSearch').value = "";
        return;
    }
    
    const results = vehicleDb[type].filter(v => v.name.toLowerCase().includes(query));
    
    dropdown.innerHTML = "";
    if (query.length > 0 && results.length > 0) {
        dropdown.classList.remove('hidden');
        results.forEach(v => {
            const div = document.createElement('div');
            div.className = "search-item";
            div.innerHTML = v.name;
            div.onclick = () => selectVehicle(v.name, v.std);
            dropdown.appendChild(div);
        });
    } else {
        dropdown.classList.add('hidden');
    }
}

function selectVehicle(name, std) {
    selectedVehicleName = name;
    selectedStdMileage = std;
    document.getElementById('modelSearch').value = name;
    document.getElementById('searchDropdown').classList.add('hidden');
}

// 5. CALCULATION & REPORT GENERATION
function calculateResult() {
    const km = parseFloat(document.getElementById('distance').value);
    const fuel = parseFloat(document.getElementById('fuel').value);
    const cost = parseFloat(document.getElementById('cost').value);
    const type = document.getElementById('vehicleType').value;

    // Validation
    if (!km || !fuel || !selectedStdMileage) {
        alert("Please select a vehicle model and enter trip data.");
        return;
    }

    const currentMileage = (km / fuel).toFixed(1);
    const costPerKm = (cost / km).toFixed(2);
    const badge = document.getElementById('statusBadge');
    const feedback = document.getElementById('feedbackMessage');
    
    // UI Update: Basic Stats
    document.getElementById('vehicleNameDisplay').innerText = selectedVehicleName;
    document.getElementById('myMileage').innerText = currentMileage;
    document.getElementById('stdMileage').innerText = selectedStdMileage;
    document.getElementById('costPerKm').innerText = "₹" + costPerKm;

    // Logic: Compare with Standard
    if (parseFloat(currentMileage) >= selectedStdMileage) {
        badge.innerText = "EXCELLENT";
        badge.className = "badge badge-good";
        feedback.innerHTML = `<p style="color:#4ade80; font-weight:bold;">🌟 Perfect! Your vehicle is running efficiently.</p>`;
    } else {
        badge.innerText = "LOW";
        badge.className = "badge badge-bad";
        
        // Generate Customized Checklist for Low Performance
        let checklistHTML = `
            <p style="color:#f87171; font-weight:bold;">⚠️ Maintenance Checklist for ${type}:</p>
            <ul style="text-align:left; margin-top:10px;">
        `;
        
        diagnosticDb[type].forEach(item => {
            checklistHTML += `<li>${item}</li>`;
        });
        
        checklistHTML += `</ul>`;
        feedback.innerHTML = checklistHTML;
    }

    // Show result section
    document.getElementById('resultCard').classList.remove('hidden');
    
    // Auto-scroll to result
    document.getElementById('resultCard').scrollIntoView({ behavior: 'smooth' });
}
