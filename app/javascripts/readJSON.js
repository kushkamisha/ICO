alert("readJSON.js");
function selectAll(obj) {
    $("input.select-item").each(function (index,item) {item.checked = obj.checked;});
}

$.getJSON("app/data/users.json", function(data) {
    for (var i = 0; i < data.length; i++) {
        if(data[i].transactions.length != 0) {
            for (var j = 0; j < data[i].transactions.length; i++) {
                buildTR(
                    data[i].transactions[j].date,
                    data[i].transactions[j].url,
                    data[i].transactions[j].tx
                );
            }
        }
    }
});

function buildTR(date, url, tx, amount, currency, currencyIndex, tokens) {
$("[name=tbody]").html($("[name=tbody]").html() + '<tr class="info">' +
        '<td class="table-hover"><input class="select-item checkbox" type="checkbox"></td>' +
        '<td class="table-hover">'+date+'</td>' +
        '<td class="table-hover"><a href="'+url+'">'+tx+'</a></td>' +
        '<td class="table-hover">0.12 BTC</td>' +
        '<td class="table-hover">100.34 ETH</td>' +
        '<td class="table-hover">4567 JTC</td>' +
        '<td class="table-hover"><button type="button" class="btn btn-success">Issued</button></td>' +
    '</tr>');
}