const request = require('request');
let outputFromUI = 0;
let outputFromAPI = 0;
browser.waitForAngularEnabled(false);
describe ('Currency Comparision Test', function(){
    it('USD value comparision between API and UI', function(){
        browser.waitForAngularEnabled(false);
        browser.get('https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html');  
        
        let result = element(by.css('[href="eurofxref-graph-usd.en.html"] > .rate')).getText().then(function (outputFromUI) {
        console.log('output From UI =' + outputFromUI);
       });        
        request('https://api.exchangeratesapi.io/latest', function (error, response, body) {
            const obj = JSON.parse(body);
            outputFromAPI = obj.rates.USD;  
            console.log('output From API =' + outputFromAPI); 
       });
       expect (outputFromUI).toEqual(outputFromAPI);      

    });
})