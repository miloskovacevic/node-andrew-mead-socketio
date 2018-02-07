let socket = io();
socket.on('connect', function() {
    console.log('connected to server!');
});
// socket.emit('createMessage', {
//     from: 'Milos',
//     text: 'Cao kako si ?!',
//     createdAt: new Date().getTime()
// });

socket.on('disconnect', function() {
    console.log('disconnected!');

 
})

socket.on('newMessage', function(message) {
    console.log('New message', message);

    let li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        
    })
})

// socket.on('welcomeMessage', function(welcomeMessage) {
//     console.log('welcome message', welcomeMessage);
// });



