document.getElementById("language").addEventListener("change", changeLanguage);
changeLanguage()

window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
function detectMobile() {
    if (mobileCheck() == false) {
        $("#languages option")[0].text = "Español"
        $("#languages option")[1].text = "English"
        $("#languages option")[2].text = "Deustch"
    }
}
detectMobile()
function changeColors(e) {
    if (e.value == '🌙') {
        document.getElementById("darkMode").checked = true
        $.each($(".accordion-button"), function (i, item) {
            $(item).addClass("dark")
            $(item).removeClass("light")
        })
        $.each($(".accordion-body"), function (i, item) {
            $(item).addClass("dark")
            $(item).removeClass("light")
        })
        e.value = '☀'
        $("body").addClass("dark")
        $("body").removeClass("light")
        $(e).removeClass("btn-dark")
        $(e).addClass("btn-warning")
    } else if (e.value == '☀') {
        document.getElementById("darkMode").checked = false
        $.each($(".accordion-button"), function (i, item) {
            $(item).addClass("light")
            $(item).removeClass("dark")
        })
        $.each($(".accordion-body"), function (i, item) {
            $(item).addClass("light")
            $(item).removeClass("dark")
        })
        e.value = '🌙'
        $("body").addClass("light")
        $("body").removeClass("dark")
        $(e).removeClass("btn-warning")
        $(e).addClass("btn-dark")
    }
}

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
        $("#language")[0].value = $("#languages")[0].value
        $("[type='submit']")[0].click()
        return
    }
    var separator = 0
    var genreValue = document.getElementById("genreValue").value
    switch ($("#language")[0].value) {
        case 'es':
            separator = 0
            $("#basic_data")[0].innerText = 'Datos básicos'
            $("#filter")[0].innerText = 'Filtros de busqueda'
            $("[for=title]")[0].innerText = 'Título'
            $("[for=genre]")[0].innerText = 'Género'
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
            $("#sort_by option")[0].text = 'Popularity'
            $("#sort_by option")[1].text = 'Release date'
            $("#sort_by option")[2].text = 'Average rate'
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
            $("[for=min_vote]")[0].innerText = 'Mindeststimmen'
            $("[for=min_avg]")[0].innerText = 'Mindestsatz'
            $("[for=sort_by]")[0].innerText = 'Sortieren nach'
            $("[type='submit']")[0].value = 'Senden'
            $('#genre')
                .find('option')
                .remove().end().append($('<option>', {
                    value: '',
                    text: 'Alle'
                }));

            $("#sort_by option")[0].text = 'Popularität'
            $("#sort_by option")[1].text = 'Veröffentlichungsdatum'
            $("#sort_by option")[2].text = 'Durchschnittsnote'
            $("#sort_by option")[3].text = 'Anzahl Stimmen'
            if ($("#results").length == 1) {
                $("#results")[0].innerText = 'Ergebnisse'
            }
            break;
    }
    $("#languages")[0].selectedIndex = separator
    $.each(document.getElementById("genres").value.split("COI")[separator].split(","), function (i, item) {
        if (genreValue == item.split("-")[0]) {
            $('#genre').append($('<option>', {
                value: item.split("-")[0],
                text: item.split("-")[1],
                selected: 'selected'
            }));
        } else {
            $('#genre').append($('<option>', {
                value: item.split("-")[0],
                text: item.split("-")[1]
            }));
        }

    })

}