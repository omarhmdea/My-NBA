const teamSerach = function () {
    let teamName = $("#team-input").val()

    $.get(`/teams/${teamName}`, function (players) {
        $('.players-container').empty()
        const source = $('#player-template').html()
        const template = Handlebars.compile(source);
        const newHTML = template({players})
        $('.players-container').append(newHTML)  

    })
}

$('.players-container').on('click','button', function(){

    let pos = $(this).siblings(".postion").text()
    let img = $(this).siblings('#img-container').find('img').attr('src');
    let jersey = $(this).siblings(".jersey").text()
    let fullName = $(this).siblings(".username").text()

    let player = {}
    player.pos = pos
    player.img = img
    player.jersey = jersey
    player.fullName = fullName

    $.post( "/addPlayer", player );
})

const dreamTeam = function () {

    $.get(`/dreamTeam`, function (players) {
        $('.players-container').empty()
        const source = $('#dreamTeam-template').html()
        const template = Handlebars.compile(source);
        const newHTML = template({players})
        $('.players-container').append(newHTML)  

    })
}