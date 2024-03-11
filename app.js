const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
let fromCurr = document.querySelector(".from select"); 
let toCurr = document.querySelector(".to select"); 
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option"); 
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

// let toFlag  = "https://flagsapi.com/IN/flat/64.png";
// let fromFlag = "https://flagsapi.com/US/flat/64.png";

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
        amtval = 0;
        amount.value = 0;
    }
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        // Your currency conversion logic here
    });
    
    // console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; 
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalamt = amtval * rate;

    msg.innerText = `${amtval} ${fromCurr.value} = ${finalamt.toFixed(2)} ${toCurr.value}`;
})

function onSwapClick() {
    let tmp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tmp;

    updateFlag(fromCurr);
    updateFlag(toCurr);
}


document.getElementById("swapButton").addEventListener("click", onSwapClick);


