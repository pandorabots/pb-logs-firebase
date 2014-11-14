$(document).ready(function() {

    var root = "https://your-firebase.firebaseio.com/";
    var pb = new Pandorabot("aiaas.pandorabots.com", APP_ID, BOTNAME, USER_KEY);
    var that = "";
    var init = true;
    
    function doTalk() {
        var date = new Date().toString();
        var input = $("#yousay").val();

        $("#yousay").val("");
        $("#convo").append('<p><strong><i class="fa fa-user user"></i></strong> ' + input + '</p>');

        // Talk function 
        pb.talk(input, function(data) {
            var response = data["responses"];
            var sessionid = data.sessionid;
            var client_name = pb.client_name;

            $("#convo").append('<p><strong><i class="fa fa-user bot"></i></strong> ' + response + '</p>');
            $("#convo").scrollTop($("#convo")[0].scrollHeight);

            // Create a new session in Firebase
            if (init === true) {
                var session = new Firebase(root + sessionid);
                session.set({ 
                    client_name: client_name, 
                    date: date 
                });
                init = false;
            }
            
            // Push interactions to Firebase
            var conversation = new Firebase(root + sessionid + "/conversation");
            conversation.push({ 
                client_name: client_name, 
                date: date, 
                input:input,
                that: that,
                response:response
            });
            
            // Store last response for next interaction
            that = response[response.length - 1];
        });
    }
    
    $("#yousay").keypress(function(e) {
        if (e.which == 13) {
            doTalk();
            return false;
        }
    });
});
