document.getElementById("language").addEventListener("change", changeLanguage);
changeLanguage()

function changeGenreNumberToText() {
    var idsMovies = $(".genres_ids")
    var separator = 0
    switch ($("#language")[0].value) {
        case 'es':
            separator = 0
            break;
        case 'en':
            separator = 1
            break;
        case 'de':
            separator = 2
            break;
        default:
            separator = 0
    }
    var genreList = document.getElementById("genres").value.split("COI")[separator].split(",")
    for (div of idsMovies) {
        var textGenres = ""
        var idsMovie = div.innerText.trim().split(",")
        for (idGenre of idsMovie) {
            for (genre of genreList) {
                if (genre.split("-")[0] == idGenre) {
                    textGenres += genre.split("-")[1] + ", "
                }
            }
        }
        textGenres = textGenres.trimEnd()
        textGenres = textGenres.substring(0, textGenres.length - 1)
        div.innerText = textGenres
    }
}

changeGenreNumberToText()
function changeLanguage(e) {
    if (e) {
        $("[type='submit']")[0].click()
        return
    }
    var separator = 0
    switch ($("#language")[0].value) {
        case 'es':
            separator = 0
            $("#basic_data")[0].innerText = 'Datos básicos'
            $("#filter")[0].innerText = 'Filtros de busqueda'
            $("[for=title]")[0].innerText = 'Título'
            $("[for=genre]")[0].innerText = 'Género'
            $("[for=language]")[0].innerText = 'Idioma'
            $("[for=min_vote]")[0].innerText = 'Mínimo de votos'
            $("[for=min_avg]")[0].innerText = 'Valoración mínima'
            $("[for=sort_by]")[0].innerText = 'Ordenar por'
            $("[type='submit']")[0].value = 'Enviar'
            $('#genre')
                .find('option')
                .remove().end().append($('<option>', {
                    value: '',
                    text: 'Cualquiera'
                }));
            $.each(document.getElementById("genres").value.split("COI")[separator].split(","), function (i, item) {
                $('#genre').append($('<option>', {
                    value: item.split("-")[0],
                    text: item.split("-")[1]
                }));
            })
            $("#sort_by option")[0].text = 'Popularidad'
            $("#sort_by option")[1].text = 'Fecha Lanzamiento'
            $("#sort_by option")[2].text = 'Nota media'
            $("#sort_by option")[3].text = 'Número de votos'
            if ($("#results").length == 1) {
                $("#results")[0].innerText = 'Resultados'
            }
            break;
        case 'en':
            separator = 1
            $("#basic_data")[0].innerText = 'Basic data'
            $("#filter")[0].innerText = 'Search filters'
            $("[for=title]")[0].innerText = 'Title'
            $("[for=genre]")[0].innerText = 'Genre'
            $("[for=language]")[0].innerText = 'Language'
            $("[for=min_vote]")[0].innerText = 'Minimum votes'
            $("[for=min_avg]")[0].innerText = 'Minimum rate'
            $("[for=sort_by]")[0].innerText = 'Sort by'
            $("[type='submit']")[0].value = 'Send'
            $('#genre')
                .find('option')
                .remove().end().append($('<option>', {
                    value: '',
                    text: 'Whichever'
                }));
            $.each(document.getElementById("genres").value.split("COI")[separator].split(","), function (i, item) {
                $('#genre').append($('<option>', {
                    value: item.split("-")[0],
                    text: item.split("-")[1]
                }));
            })
            $("#sort_by option")[0].text = 'Popularity'
            $("#sort_by option")[1].text = 'Release date'
            $("#sort_by option")[2].text = 'Average rete'
            $("#sort_by option")[3].text = 'Number of votes'
            if ($("#results").length == 1) {
                $("#results")[0].innerText = 'Results'
            }
            break;
        case 'de':
            separator = 2
            $("#basic_data")[0].innerText = 'Grundlegende Daten'
            $("#filter")[0].innerText = 'Suchfilter'
            $("[for=title]")[0].innerText = 'Titel'
            $("[for=genre]")[0].innerText = 'Genre'
            $("[for=language]")[0].innerText = 'Sprache'
            $("[for=min_vote]")[0].innerText = 'Mindeststimmen'
            $("[for=min_avg]")[0].innerText = 'Mindestsatz'
            $("[for=sort_by]")[0].innerText = 'Sortieren nach'
            $("[type='submit']")[0].value = 'Senden'
            $('#genre')
                .find('option')
                .remove().end().append($('<option>', {
                    value: '',
                    text: 'Welche'
                }));
            $.each(document.getElementById("genres").value.split("COI")[separator].split(","), function (i, item) {
                $('#genre').append($('<option>', {
                    value: item.split("-")[0],
                    text: item.split("-")[1]
                }));
            })
            $("#sort_by option")[0].text = 'Popularität'
            $("#sort_by option")[1].text = 'Veröffentlichungsdatum'
            $("#sort_by option")[2].text = 'Durchschnittsnote'
            $("#sort_by option")[3].text = 'Anzahl Stimmen'
            if ($("#results").length == 1) {
                $("#results")[0].innerText = 'Ergebnisse'
            }
            break;
    }

}