
let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// Check if we have any leads in our local storage and if so, we parse those leeds so that we get them as a js array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// Check if leadsFromLocalStorage is truthy
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}
tabBtn.addEventListener("click", function() {
    // Grab the URL of the current tab!
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>${leads[i]}</a> 
            </li>
        `
        // _blank = Opens the linked document in a new window or tab
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear(); 
    myLeads = []; // Clearing myLeads by reassign it to an empty array
    render(myLeads); // Clearing the DOM by rendering renderLeads() which now are an empty array
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem( "myLeads", JSON.stringify(myLeads) )
    render(myLeads);
})