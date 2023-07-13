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
    <td style="text-align:justify;">${result.overview}</td>
    <td><img src="https://image.tmdb.org/t/p/w300${result.poster_path}" alt="..." /></td>
    </tr>
    </table>`;
    $("#spinnerModal").modal("hide");
    $("#detailModal").modal("show");
  });
});
