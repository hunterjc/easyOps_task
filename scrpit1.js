function combineInfo(fname, lname, Phone, i) {
  return `    
    <tr class=\"clickable\"> <td>${i}</td>
     <td>${fname} ${lname}</td>
     <td>${Phone}</td>
     <td><button class="delete-button">Delete</button></td></tr>`;
}
var i = 0;
$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    const fname = $("#fname").val();
    const lname = $("#lname").val();
    const Phone = $("#contact").val();
    const srnam = $("#searchTerm").val();
    console.log(srnam);
    var contact = combineInfo(fname, lname, Phone, ++i);
    $("#table-body").append(contact);
    $("tr.clickable").click(function () {
      this.remove();
    });
  });
});

$(function () {
  const ths = $("th");
  let sortOrder = 1;

  ths.on("click", function () {
    const rows = sortRows(this);
    rebuildTbody(rows);
    updateClassName(this);
    sortOrder *= -1;
  });

  function sortRows(th) {
    const rows = $.makeArray($("tbody > tr"));
    const col = th.cellIndex;
    const type = th.dataset.type;
    rows.sort(function (a, b) {
      return compare(a, b, col, type) * sortOrder;
    });
    return rows;
  }

  function compare(a, b, col, type) {
    let _a = a.children[col].textContent;
    let _b = b.children[col].textContent;
    if (type === "number") {
      _a *= 1;
      _b *= 1;
    } else if (type === "string") {
      _a = _a.toLowerCase();
      _b = _b.toLowerCase();
    }

    if (_a < _b) {
      return -1;
    }
    if (_a > _b) {
      return 1;
    }
    return 0;
  }

  function rebuildTbody(rows) {
    const tbody = $("tbody");
    while (tbody.firstChild) {
      tbody.remove(tbody.firstChild);
    }

    let j;
    for (j = 0; j < rows.length; j++) {
      tbody.append(rows[j]);
    }
  }

  function updateClassName(th) {
    let k;
    for (k = 0; k < ths.length; k++) {
      ths[k].className = "";
    }
    th.className = sortOrder === 1 ? "asc" : "desc";
  }
});
