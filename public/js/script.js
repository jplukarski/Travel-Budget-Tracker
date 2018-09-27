var submitButton = $("#submit");
var cityInput = $("#new-city");
var nightsInput = $("#nights-stayed");
var amountInput = $("#amount-spent");
var newCurrency = $("#current");
var accessKey = 0;


var totalinEuros = [];
function myFunction(item) {
    function getSum(total, num) {
        return total + num;
    };

    var currencyTotal = $("#total-currency").val();
    outputTotal = totalinEuros.reduce(getSum);

    if (currencyTotal === "EUR") {
        $("#total-spent").html(outputTotal);
    } else {
        var queryURL = "http://data.fixer.io/api/latest?access_key=" + accessKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var convertedTotal = outputTotal / response.rates[currencyTotal];
            $("#total-spent").html(convertedTotal.toFixed(2));
        });


    }
};

database.ref().on("child_added", function (snapshot) {

    var data = snapshot.val();
    console.log(data)
    var spent = parseInt(data.amountSpent)
    var cash = data.currencyInput

    if (cash === "EUR") {
        totalinEuros.push(spent)
        myFunction();
    } else {
        var queryURL = "http://data.fixer.io/api/latest?access_key=0ed6f6268b1ac17ca8a1695ff2c8c153";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var convert = spent * response.rates[cash].toFixed(3);
            totalinEuros.push(convert);
            myFunction();
        });
    }

    $("#data-dump").append(
        `<tr>
        <td>${data.newCity}</td>
        <td>${data.nightsStayed}</td>
        <td class="amount-spent">${data.amountSpent}</td>
        <td class="currency-type">${data.currencyInput}</td>
    </tr>`
    );
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
