// Contains main scripts for Tip Calculator app

$(document).ready(function(){
    var tipPercent = 15.0;
    
    // Attach event handlers to buttons
    $('#calculateTip').click(calculateTip);
    $('#saveSettings').click(saveSettings);
    
    // Get bill amounts and calculate tip and total amounts
    var calculateTip = function(){
        var bill = Number($('#billAmount').val());
        var tip = bill * tipPercent;
        var total = bill + tip;
        $('#tipAmount').text('$' + tip.toFixed(2));
        $('#totalAmount').text('$' + total.toFixed(2));
    };
    
    // Change tipPercent global variable to match what the user enters in settings
    var saveSettings = function(){
        // try/catch in case user enters non-numeric, or non-decimal
        try{
            var tipPct = parseFloat($('#tipPercentage').val());
            // Use the new HTML5 localStorage object to store the settings for tipPercentage
            localStorage.setitem('tipPercentage', tipPct);
            // Change tipPercent to user input at settings page
            tipPercent = tipPct;
            window.history.back();
        }catch(ex){
            alert('Tip percentage must be a decimal value!');
        }
    };
    
    // Retrieve value from localStorage for tipPercentage, set to input box in settings
    var tipPercentSetting = localStorage.getItem('tipPercentage');
    if(tipPercentSetting){
        tipPercent = parseFloat(tipPercentSetting);
    }
    $('#tipPercentage').val(tipPercent);
});

$(document).on("deviceready", function(){
    StatusBar.overlaysWebView(false);
    StatusBar.backgroundColorByName("gray");
});