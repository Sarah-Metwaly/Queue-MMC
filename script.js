
// Factorial function in JavaScript
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; ++i) {
        result *= i;
    }
    return result;
}

// Traffic function to calculate the traffic intensity (rho)
function trafficFun(lambda, mew, c) {
    let ans = lambda / (c * mew);
    return ans;
}

// p0 function to calculate the probability of no customers in the system
function p0Fun(c, traffic) {
    let ans1 = 0;
    for (let i = 0; i <= c - 1; i++) {
        ans1 += Math.pow(c * traffic, i) / factorial(i);
    }
    let ans2 = (Math.pow(c * traffic, c) / factorial(c)) * (1 / (1 - traffic));
    let ans = 1 / (ans1 + ans2);
    return ans;
}

// piFun function to calculate the probability of a certain state in the system
function piFun(traffic, c, p0) {
    let ans1 = 1 / (1 - traffic);
    let ans2 = (Math.pow(c * traffic, c)) / factorial(c);
    let ans = ans1 * ans2 * p0;
    return ans;
}

// pn function to calculate the probability for n customers
function pn(traffic, n, c, p0) {
    if (n <= c) {
        return (Math.pow(c * traffic, n) / factorial(n)) * p0;
    } else {
        const pc = (Math.pow(c * traffic, c) / factorial(c)) * p0; // Probability P(c)
        return pc * Math.pow(traffic, n - c); // For n > c
    }
}

// Calculate P(N > 6)
function pN6(p0, p1, p2, p3, p4, p5, p6) {
    let ans = 1 - (p0 + p1 + p2 + p3 + p4 + p5 + p6);
    return ans;
}



// Function to calculate E(Lq)
function calculate_E_Lq(traffic, pi) {
    let E_Lq = pi * (traffic / (1 - traffic));
    return E_Lq;
}

// Function to calculate E(L)
function calculateEL(traffic, C, E_Lq) {
    return ((C * traffic) + E_Lq);
}

// Function to calculate E(S) 
function calculateES(mew) {
    return 1 / mew;
}

// Function to calculate E(Wq)
function calculateEWq(E_Lq, lambda) {
    let EWq = E_Lq / lambda;
    return EWq;
}

// Function to calculate E(W)
function calculateEW(E_Wq, mew) {
    let EW = E_Wq + (1 / mew);
    return EW;
}
 
// Function to calculate W(N > 0)
function W_greater_than_0(pi) {
    return pi;
}
// Function to calculate P(W > t) with a dynamic t value
function calculatePW(pi, traffic, c, mew, E_W, t) {
    const PW_greater_than_t = pi * Math.exp(-c * mew * (1 - traffic) * (t * E_W));
    return PW_greater_than_t;
}


document.getElementById('calculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the inputs
    const lambda = parseFloat(document.getElementById('lambda').value); // Parse decimal numbers for λ
    const mew = parseFloat(document.getElementById('Mew').value);       // Parse decimal numbers for μ
    const c = parseInt(document.getElementById('c').value);            // Parse integer for c

    // Validate inputs
    if (isNaN(lambda) || isNaN(mew) || isNaN(c) || c <= 0) {
        alert("Please enter valid numbers. Lambda and Mew can be decimal numbers. C must be a positive integer > 0.");
        return;
    }

    // Ensure lambda and mew are positive numbers
    if (lambda <= 0 || mew <= 0) {
        alert("Lambda and Mew must be greater than 0.");
        return;
    }
    /////////////////////////calculate///////////////////////////////

    // Calculate the Traffic Intensity (rho)
    const traffic = trafficFun(lambda, mew, c);
    console.log("Traffic intensity (rho):", traffic);

    // Calculate p0
    const p0 = p0Fun(c, traffic);
    console.log("p0 (probability of no customers):", p0);

    // Calculate pi for the system
    const pi = piFun(traffic, c, p0);
    console.log("pi (probability of a certain state):", pi);

    // Calculate Pn for n = 1 to 6
    const p1 = pn(traffic, 1, c, p0);
    const p2 = pn(traffic, 2, c, p0);
    const p3 = pn(traffic, 3, c, p0);
    const p4 = pn(traffic, 4, c, p0);
    const p5 = pn(traffic, 5, c, p0);
    const p6 = pn(traffic, 6, c, p0);

    // Calculate P(N > 6)
    const pGreater6 = pN6(p0, p1, p2, p3, p4, p5, p6);
    console.log("P(N > 6):", pGreater6);

    // Calculate E(Lq) and E(L)
    const E_Lq = calculate_E_Lq(traffic, pi);
    console.log("E(Lq):", E_Lq);

    const E_L = calculateEL(traffic, c, E_Lq);
    console.log("E(L):", E_L);

    // Calculate E(S)
    const E_S = calculateES(mew);
    console.log("E(S) (Expected service time):", E_S);

      // Calculate E(Wq) and E(W)
      const E_Wq = calculateEWq(E_Lq, lambda);
      console.log("E(Wq):", E_Wq);
  
      const E_W = calculateEW(E_Wq, mew);
      console.log("E(W) (Expected wait time):", E_W);
      
 // Calculate W(N > 0)
 const W = W_greater_than_0(pi);
 console.log("W(N > 0):", W);

 // Call the new PW function with different t values (0.5 and 1.5)
const PW_05 = calculatePW(pi, traffic, c, mew, E_W, 0.5); // t = 0.5
console.log("P(W > 0.5):", PW_05);

const PW_15 = calculatePW(pi, traffic, c, mew, E_W, 1.5); // t = 1.5
console.log("P(W > 1.5):", PW_15);

// Calculate formulas for E(W > t)
const ans = -c * mew * (1 - traffic);
const formulaEWt = `${pi} * e^(${ans} * t)`;
const formulaEWt_0 = `e^(${ans} * t)`;
const formulaEWt_mean = `e^(${ans} * t - ${1 / mew})`;


    // Update the table with results
    const resultTable = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    resultTable.innerHTML = ''; // Clear the table before adding new results

    const rows = [
        ['interarrival (1 / λ)' ,1/lambda],
        ['Service time (1 / μ)',1/mew],
        ['ρ (Traffic Intensity)', traffic.toFixed(5)],  
        ['p0 (Probability of no customers)', p0.toFixed(5)],  
        ['π (Probability of a certain state)', pi.toFixed(5)],  
        ['p1 (Probability of 1 customer)', p1.toFixed(5)],
        ['p2 (Probability of 2 customers)', p2.toFixed(5)],
        ['p3 (Probability of 3 customers)', p3.toFixed(5)],
        ['p4 (Probability of 4 customers)', p4.toFixed(5)],
        ['p5 (Probability of 5 customers)', p5.toFixed(5)],
        ['p6 (Probability of 6 customers)', p6.toFixed(5)],
        ['P(N > 6)', pGreater6.toFixed(5)],
        ['E(L)', E_L.toFixed(5)],
        ['E(S)', E_S.toFixed(5)],
        ['E(Lq)', E_Lq.toFixed(5)],
        ['E(W)', E_W.toFixed(5)],
        ['W(N > 0)', W.toFixed(5)],
        ['P(W > 0.5)', PW_05.toFixed(5)],
        ['P(W > 1.5)', PW_15.toFixed(5)],
        ['E(W > t)', formulaEWt],  // No rounding for formulas
        ['E(W > t | W > 0)', formulaEWt_0],  // No rounding for formulas
        ['E(W > t | W > mean time)', formulaEWt_mean]  // No rounding for formulas
    ];
    rows.forEach(row => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = row[0];  // Parameter name
        const td2 = document.createElement('td');
        td2.textContent = row[1];  // Formula or numeric value
        tr.appendChild(td1);
        tr.appendChild(td2);
        resultTable.appendChild(tr);
    });
});
