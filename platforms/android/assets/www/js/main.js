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

//    $('#info').click(function(){
//        var model = device.model;
//        alert(model);
//    });
    
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    $('#camera').click(function(){
        //var cordovaVersion = device.platform;
        //alert(cordovaVersion);
        navigator.camera.getPicture(
                cameraSuccess, // On success
                function(){ // On failure
                    alert("Failed");
                },
                {
                    // Extra Options
                    sourceType: navigator.camera.PictureSourceType.CAMERA,
                    saveToPhotoAlbum: true
                });
        function cameraSuccess(imageURI){
            //var imgString = imageURI.substring(7);
            //$('#imgContainer').html('<img src="'+imgString+'" alt="No image" width="100" height="100">');
            alert("Saved to: " + imageURI);
        }
    });

    $('#btnRetrieve').click(function(){
        // This is the url of the web service when you test it in browser
        var localUrl = 'http://localhost:49513/residentPhotos_service.aspx?resident_id=35';
        var url = 'http://www.capripictureframe.com/mobileLogin.asmx/Login';
        var user = 'matterhaus124B';
        var pass = 'wctc12345';
        window.location.href = 'www.google.com';
        /////////////////// GET PICTURES ///////////////////
        //$.getScript('http://www.capripictureframe.com/residentPhotos_service.aspx?resident_id=35', function(){
        //    alert('Service reached');
        //    console.log(photoIds);
        //});
        ////////////////////////////////////////////////////

        /*$.ajax({
            url: localUrl,
            type: 'POST',
            dataType: 'XML', // 'JSON' still not working...
            //contentType: 'application/json;charset=UTF-8',
            data: {
                username: user,
                password: pass
            },
            success: function(data){
                alert('Service Reached');
                console.log('Reached loginService...');
                console.log('Attempting to log in with credentials...\n\tUsername: ' + user + '\n\tPassword: ' + pass);
                var roomId = data.activeElement.firstChild.data;
                console.log(roomId);
                if(roomId > 0){
                    alert('Login Success!');
                    console.log('Successfully logged into Capri Picture Frame');
                    console.log('Resident logged into room with ID: ' + roomId);
                } else {
                    alert('Invalid Credentials');
                    console.log('Login Failed: Invalid user credentials given');
                }
            },
            error: function(xhr, status, errorThrown){
                alert('Request failed.');
                console.log('Raw Request: ' + xhr);
                console.log('Status Code: ' + status);
                console.log('Error : ' + errorThrown);
            }
        });*/
    });
}

// Not entirely sure what this does. iPhone status bar?
//$(document).on("deviceready", function(){
    
//    StatusBar.overlaysWebView(false);
//    StatusBar.backgroundColorByName("gray");
//});
