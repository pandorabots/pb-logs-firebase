$(document).ready(function() {
    
    var root = "https://your-firebase.firebaseio.com/";
    var fb = new Firebase(root);
    
    // Listen for new sessions
    fb.on("child_added", function(snapshot) {
        var sessionid = snapshot.key();
        var client_name = snapshot.val().client_name;
        var date = snapshot.val().date;
        
        $("tbody#sessions")
            .prepend('<tr><td>' + date + '</td><td>' + client_name + '</td><td><span class="sessionid badge">' + sessionid + '</span></td></tr>');
        
        // Click handler for new sessions
        $(".sessionid").click(function() {
            var current = $(this).text();
            var session = new Firebase(root + current + "/conversation");
            
            $("#myModal").modal("show");
            $(".modal-body").empty();
            $("#sessionId").text("Session: " + current);
            
            // Listen for new interactions
            session.on("child_added", function(snapshot) {
                var record = snapshot.val();
                
                $("#clientName").text("With: " + record.client_name);
                $(".modal-body")
                    .append('<div class="interaction">')
                    .append('<div class="date"><strong>' + record.date + '</strong></div>')
                    .append('<div class="input"><strong>Input:</strong> ' + record.input + '</div>')
                    .append('<div class="that"><strong>That:</strong> ' + record.that + '</div>')
                    .append('<div class="response"><strong>Response(s):</strong> ' + record.response + '</div></div>')
                    .append('<hr/>');
            });
        });
    });
});
