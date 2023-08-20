var id = "";

$(".carousel-item").on("click", function (e) {
  id = e.currentTarget.id;
  $("#spinnerModal").modal("show");
});

$("#spinnerModal").on("shown.bs.modal", function () {
  $.post("/modal-info", { id: id }, function (result) {
    $("#detailModalLabel").text(result.title);
    $("#detailModal .modal-body")[0].innerHTML = `<table>
    <tr>
    <td style="text-align:justify;padding:1em;">${result.overview}</td>
    <td><a href="https://image.tmdb.org/t/p/original${result.poster_path}" target="_blank"><img src="https://image.tmdb.org/t/p/original${result.poster_path}" alt="..." /></a></td>
    </tr>
    </table>`;
    $("#spinnerModal").modal("hide");
    $("#detailModal").modal("show");
  });
});
