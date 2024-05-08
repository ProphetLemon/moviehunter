init();
function init() {
  detectMobile();
  changeGenreNumberToText();
  changeLanguage();
  checkPages();
  addPageControlEvents();
  chargeProviders();
  if (document.getElementById("darkMode").checked == false) {
    $("#darkModeButton").click();
  }
}

function loadTooltips() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
}

function delay(callback, ms) {
  var timer = 0;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

$("#people").change(function () {
  $(this).blur();
  var value = $(this).val();
  $("[name='peopleID']").val($('#peopleList [value="' + value + '"]').data("value"));
});

$("#people").keyup(
  delay(function (e) {
    $.post("/people", { query: $(this).val(), language: $("#language").val() }, function (response) {
      $("#peopleList")[0].innerHTML = response;
    });
  }, 500)
);

function chargeProviders() {
  var providers = $("#watchprovidersvalue").val();
  if (providers) {
    providers = providers.split("|");
    $("#watchproviders").val(providers);
  }
}

function changeModal(e) {
  var titleMedia = $(e).parent().find(".nombreOculto").val();
  var idMedia = $(e).parent().find(".idOculto").val();
  $("#mediaID")[0].value = idMedia;
  var type = $("#type")[0].value;
  $("#typeMedia")[0].value = type;
  switch ($("#language")[0].value) {
    case "es":
      $("#exampleModalLabel")[0].innerText = `Notificación para \"${titleMedia}\"`;
      $("#email")[0].placeholder = "Inserte su email";
      break;
    case "en":
      $("#exampleModalLabel")[0].innerText = `Notification for \"${titleMedia}\"`;
      $("#email")[0].placeholder = "Insert your email";
      break;
    case "de":
      $("#exampleModalLabel")[0].innerText = `Benachrichtigung für \"${titleMedia}\"`;
      $("#email")[0].placeholder = "Geben Sie Ihre E-Mail ein";
      break;
  }
}

function closeModal() {
  if ($("[data-bs-dismiss='alert']")[0]) {
    $("[data-bs-dismiss='alert']")[0].click();
  }
  $("#email")[0].value = "";
}

function sendNotification() {
  var email = $("#email")[0].value.trim();
  var id = $("#mediaID")[0].value;
  var type = $("#typeMedia")[0].value;
  var language = $("#language")[0].value;
  $.post("/notification", { email: email, id: id, type: type, language: language }, function (result) {
    $("#alerts")[0].innerHTML = result;
  });
}

function addPageControlEvents() {
  $("form .form-control").on("change", function () {
    $("#pageNumber")[0].value = 1;
  });
  $("form .form-select").on("change", function () {
    $("#pageNumber")[0].value = 1;
  });
}

function resetPage() {
  $("#pageNumber")[0].value = 1;
  $("form")[0].submit();
}

/**
 *
 * @param {Number} e
 */
function changePage(e) {
  var actualPage = Number($("#pageNumber")[0].value);
  $("#pageNumber")[0].value = e == 0 ? --actualPage : ++actualPage;
  $("form")[0].submit();
}

function checkPages() {
  var pageNumber = Number($("#pageNumber")[0].value);
  var totalPages = Number($("#totalPages")[0].value);
  if (pageNumber == 1) {
    $("#pageBefore").attr("disabled", "disabled");
    $("#pageBefore").removeClass("btn-primary");
    $("#pageBefore").addClass("btn-secondary");
  }
  if (pageNumber >= totalPages) {
    $("#pageAfter").attr("disabled", "disabled");
    $("#pageAfter").removeClass("btn-primary");
    $("#pageAfter").addClass("btn-secondary");
  }
}

function changeType(e) {
  $("#pageNumber").val(1);
  var valor = e.value;
  $("#formBusqueda input").not('[type="hidden"]').not(".d-none").val("");
  $("#type").val(valor);
  $("#spinnerModal").modal("toggle");
  $("#formBusqueda").submit();
}

function enviarFormulario() {
  $("#spinnerModal").modal("toggle");
  $("#formBusqueda").submit();
}

function detectMobile() {
  window.mobileCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };
  if (mobileCheck() == false) {
    $("#languages option")[0].text = "Español";
    $("#languages option")[1].text = "English";
    $("#languages option")[2].text = "Deustch";
  }
}

function changeColors(e) {
  if ($(e).find("i").attr("class").includes("moon")) {
    document.getElementById("darkMode").checked = true;
    $(".light").each(function () {
      $(this).removeClass("dark").addClass("dark"); // Remover 'dark' y añadir 'light'
    });
    $(e).find("i").attr("class", "fa fa-sun-o");
    $(e).removeClass("btn-dark");
    $(e).addClass("btn-warning");
  } else if ($(e).find("i").attr("class").includes("sun")) {
    document.getElementById("darkMode").checked = false;
    $(".dark").each(function () {
      $(this).removeClass("dark").addClass("light"); // Remover 'dark' y añadir 'light'
    });
    $(e).find("i").attr("class", "fa fa-moon-o");
    $(e).removeClass("btn-warning");
    $(e).addClass("btn-dark");
  }
  e.blur();
}

function changeGenreNumberToText() {
  var idsMovies = $(".genres_ids");
  var separator = 0;
  switch ($("#language")[0].value) {
    case "es":
      separator = 0;
      break;
    case "en":
      separator = 1;
      break;
    case "de":
      separator = 2;
      break;
    default:
      separator = 0;
  }
  var genreList = document.getElementById("genres").value.split("COI")[separator].split(",");
  for (div of idsMovies) {
    var textGenres = "";
    var idsMovie = div.innerText.trim().split(",");
    for (idGenre of idsMovie) {
      for (genre of genreList) {
        if (genre.split("-")[0] == idGenre) {
          textGenres += genre.split("-")[1] + ", ";
        }
      }
    }
    textGenres = textGenres.trimEnd();
    textGenres = textGenres.substring(0, textGenres.length - 1);
    div.innerText = textGenres;
  }
}

function changeLanguage(e) {
  if (e) {
    $("#spinnerModal").modal("toggle");
    $("#language").val($("#languages").val());
    $("form").submit();
    return;
  }

  const lang = $("#language").val();
  const texts = {
    es: {
      submit_button: "Enviar",
      users_vote_same: "Los usuarios suelen votar con la misma nota",
      notify_me: "🔔 Avísame cuando esté disponible",
      basic_data: "Datos básicos",
      filter: "Filtros de búsqueda",
      title: "Título*",
      title_help: 'Este filtro funciona independientemente de los demás filtros. Si rellena este campo, no se aplicarán los demás filtros (excepto el filtro "Tipo").',
      genre: "Género",
      excludegenre: "Excluir Género",
      min_vote: "Mínimo de votos",
      min_avg: "Valoración mínima",
      type: "Tipo",
      type_text: ["Películas", "Series"],
      type_values: ["movie", "tv"],
      modal_buttons: { close: "Cerrar", save: "Guardar" },
      watchproviders: "Plataforma",
      sort_by: "Ordenar por",
      sort_by_text: ["Popularidad", "Fecha Lanzamiento", "Nota media", "Número de votos"],
      sort_by_values: ["popularity", "release_date", "rating", "votes"],
      watchproviders: "Plataforma",
      watchproviders_text: ["Indeferente", "Cualquiera"],
      people: "Persona",
      options_generic: ["Indeferente", "Cualquiera", "Ninguno"],
      results: "Resultados",
      desviacion: ["Los usuarios suelen votar con la misma nota", "Las votaciones de los usuarios son muy dispares entre si"],
      where_to_whatch: "Dónde ver",
      rent: "Alquilar",
      buy: "Comprar",
      free: "Gratis",
      subscription: "Suscripción",
    },
    en: {
      submit_button: "Submit",
      users_vote_same: "Benutzer stimmen oft mit derselben Bewertung ab",
      users_vote_same: "Users often vote with the same rating",
      notify_me: "🔔 Notify me when available",
      basic_data: "Basic data",
      filter: "Search filters",
      title: "Title*",
      title_help: 'This filter works independently from the other filters. If you fill in this field, the other filters (except for the "Type" filter) will not be applied.',
      genre: "Genre",
      excludegenre: "Exclude Genre",
      min_vote: "Minimum votes",
      min_avg: "Minimum rate",
      type: "Type",
      type_text: ["Movies", "TV Shows"],
      type_values: ["movie", "tv"],
      modal_buttons: { close: "Close", save: "Save" },
      sort_by: "Sort by",
      sort_by_text: ["Popularity", "Release date", "Average rate", "Number of votes"],
      sort_by_values: ["popularity", "release_date", "rating", "votes"],
      watchproviders: "Provider",
      watchproviders_text: ["Indifferent", "Whichever"],
      people: "Person",
      options_generic: ["Indifferent", "Whichever", "None"],
      results: "Results",
      desviacion: ["Users often vote with the same score.", "User votes are very disparate among each other."],
      where_to_whatch: "Where to Watch",
      rent: "Rent",
      buy: "Buy",
      free: "Free",
      subscription: "Subscription",
    },
    de: {
      submit_button: "Senden",
      notify_me: "🔔 Benachrichtigen Sie mich, wenn verfügbar",
      basic_data: "Grundlegende Daten",
      filter: "Suchfilter",
      title: "Titel*",
      title_help: 'Dieser Filter arbeitet unabhängig von den anderen Filtern. Wenn Sie dieses Feld ausfüllen, werden die anderen Filter (mit Ausnahme des Filters "Typ") nicht angewendet.',
      genre: "Genre",
      excludegenre: "Genre ausschließen",
      min_vote: "Mindeststimmen",
      min_avg: "Mindestsatz",
      sort_by: ["Popularität", "Veröffentlichungsdatum", "Durchschnittsnote", "Anzahl Stimmen"],
      type: "Typ",
      type_text: ["Filme", "Serie"],
      type_values: ["movie", "tv"],
      modal_buttons: { close: "Schließen", save: "Speichern" },
      sort_by: "Sortieren nach",
      sort_by_text: ["Popularität", "Veröffentlichungsdatum", "Durchschnittsnote", "Anzahl Stimmen"],
      sort_by_values: ["popularity", "release_date", "rating", "votes"],
      watchproviders: "Anbieter",
      watchproviders_text: ["Gleichgültig", "Alle"],
      people: "Person",
      options_generic: ["Gleichgültig", "Alle", "Keiner"],
      results: "Ergebnisse",
      desviacion: ["Die Benutzer stimmen oft mit derselben Note ab.", "Die Abstimmungen der Benutzer sind sehr unterschiedlich."],
      where_to_whatch: "Wo anzusehen",
      rent: "Mieten",
      buy: "Kaufen",
      free: "Kostenlos",
      subscription: "Abonnement",
    },
  };

  const t = texts[lang] || texts.es; // Default to English if language not found

  // Update text content
  $("#basic_data").text(t.basic_data);
  $("#filter").text(t.filter);
  $("[for=title]").text(t.title).attr("data-bs-title", t.title_help);
  $("[for=genre]").text(t.genre);
  $("[for=excludegenre]").text(t.excludegenre);
  $("[for=min_vote]").text(t.min_vote);
  $("[for=min_avg]").text(t.min_avg);
  $("[for=sort_by]").text(t.sort_by);
  $("[for=type]").text(t.type);
  $("#closeModalButton").text(t.modal_buttons.close);
  $("#saveModalButton").text(t.modal_buttons.save);
  $("[for=watchproviders]").text(t.watchproviders);
  $("[for=people]").text(t.people);
  $(".submitFormulario").val(t.submit_button);
  $("#watchproviders").find("option").first().text(t.watchproviders_text[0]);
  $("#watchproviders").find("option").last().text(t.watchproviders_text[1]);
  $(".accordion-body").find("span").text(t.users_vote_same);
  $("#genre").find("option").first().text(t.options_generic[1]);
  $("#excludegenre").find("option").first().text(t.options_generic[2]);
  $(".accordion-body").find("button").text(t.notify_me);
  $("#results").text(t.results);
  $(".concentrado").text(t.desviacion[0]);
  $(".desviado").text(t.desviacion[1]);
  $(".whereText").text(t.where_to_whatch);
  $(".buyText").text(t.buy);
  $(".rentText").text(t.rent);
  $(".freeText").text(t.free);
  $(".suscriptionText").text(t.subscription);
  updateSelectOptions("#sort_by", t.sort_by, t.sort_by_text, t.sort_by_values);
  updateSelectOptions("#type", t.type, t.type_text, t.type_values);

  function updateSelectOptions(selector, label, textArray, valueArray) {
    const select = $(selector);
    select.empty();
    $(`[for=${selector.substring(1)}]`).text(label); // Actualiza la etiqueta del selector

    textArray.forEach((optionText, index) => {
      select.append(
        $("<option>", {
          value: valueArray[index], // Usa los valores proporcionados que no cambian
          text: optionText, // Actualiza el texto visible
        })
      );
    });
  }

  // Update dynamic elements like genres
  const separator = lang === "es" ? 0 : lang === "en" ? 1 : 2;
  $("#languages").prop("selectedIndex", separator);
  chargeGenresSelect(separator, "#genre", $("#genreValue").val());
  chargeGenresSelect(separator, "#excludegenre", $("#excludeGenreValue").val());
  loadTooltips();
}

// Función que gestiona los géneros no fue modificada ya que depende de estructuras de datos no proporcionadas

function chargeGenresSelect(separator, selectID, valueSelect) {
  $.each(document.getElementById("genres").value.split("COI")[separator].split(","), function (i, item) {
    if (valueSelect == item.split("-")[0]) {
      $(selectID).append(
        $("<option>", {
          value: item.split("-")[0],
          text: item.split("-")[1],
          selected: "selected",
        })
      );
    } else {
      $(selectID).append(
        $("<option>", {
          value: item.split("-")[0],
          text: item.split("-")[1],
        })
      );
    }
  });
}
