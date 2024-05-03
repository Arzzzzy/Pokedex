$(document).ready(function() {
    $('#searchBtn').on('click', function() {
        var searchData = $('#searchInput').val().toLowerCase();
        getData(searchData);
    });

    function getData(searchData) {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${searchData}/`,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                displayData(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#pokemonInfo').html('Pokemon not found!');
            }
        });
    }

    function displayData(data) {
        var pokemonImage = data.sprites.front_default;
        var pokemonName = data.name;
        var pokemonHeight = data.height;
        var pokemonWeight = data.weight;
        var pokemonTypes = data.types.map(type => type.type.name).join(', ');
        var pokemonNumber = data.id;

        var html = `
            <img src="${pokemonImage}" alt="${pokemonName}">
            <h2>${pokemonName}</h2>
            <p>Height: ${pokemonHeight} | Weight: ${pokemonWeight}</p>
            <p>Type: ${pokemonTypes}</p>
            <p>Pokédex Number: ${pokemonNumber}</p>
        `;

        $('#pokemonInfo').html(html);
    }
});

document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        document.getElementById("searchBtn").click();
    }
});



