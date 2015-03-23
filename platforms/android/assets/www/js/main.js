// Contains main scripts for Tip Calculator app
// Launch scripts after application load
$(document).ready(function(){
    var tipPercent = .150;
    
    // Get bill amounts and calculate tip and total amounts
    // Some real hacky way to get around string verification
    $('#calculateTip').click(function(){
        var bill = $('#billAmount').val();
        var formattedBill;//, leftOfDecimal, rightOfDecimal;
//        rightOfDecimal = bill.slice(-2);
//        leftOfDecimal = bill.slice(0, -2);
//        formattedBill = parseFloat(leftOfDecimal + '.' + rightOfDecimal);
        formattedBill = bill/100;
        if(confirm('Confirm bill for $' + formattedBill + '?')){
            var tip = formattedBill * tipPercent;
            var total = formattedBill + tip;
            $('#tipAmount').text('$' + tip.toFixed(2));
            $('#totalAmount').text('$' + total.toFixed(2));
        }
    });
    
    // Change tipPercent global variable to match what the user enters in settings
    $('#saveSettings').click(function(){
        // try/catch in case user enters non-numeric, or non-decimal
        try{
            var tipPct = parseFloat($('#tipPercentage').val());
            // Use the HTML5 localStorage object to store the settings for tipPercentage
            // Much like a cookie/session variable, or HTTP request object
            sessionStorage.setItem('tipPercentage', tipPct);
            // Change tipPercent to user input at settings page
            tipPercent = tipPct;
            alert('Saved!');
            window.history.back();
        }catch(ex){
            alert(ex);
        }
    });
    
    // Retrieve value from localStorage for tipPercentage, set to input box in settings
    var tipPercentSetting = sessionStorage.getItem('tipPercentage');
    if(tipPercentSetting){
        tipPercent = parseFloat(tipPercentSetting);
    }
    $('#tipPercentage').val(tipPercent);
    
    // Reset value of textbox if settings change is cancelled
    $('#cancelSettings').click(function(){
        $('#tipPercentage').val(tipPercentSetting);
    });
    

//    $('#loginNavLink').click(function(){
//        window.open('loginTest.html', 'Login Page');
//    });
    
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    alert('ready');
    $('#info').click(function(){
        var cordovaVersion = device.cordova;
        alert(cordovaVersion);
    });
}

// Not entirely sure what this does. Research it.
//$(document).on("deviceready", function(){
    
//    StatusBar.overlaysWebView(false);
//    StatusBar.backgroundColorByName("gray");
//});