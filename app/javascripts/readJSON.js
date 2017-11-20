alert("include");
function selectAll(obj) {
    $("input.select-default").each(function (index,item) {item.checked = obj.checked;});
}
function sendSelected() {
    $("tr").each(function () {
       if($(this).find("input")[0].checked) {
            var userStruct = [$(this).find("td.table-tx").text(),
                              $(this).find("td.table-currency").text(),
                              $(this).find("td.table-eth").text(),
                              $(this).find("td.table-tokens").text()];
            console.log(userStruct);
            return userStruct;
       }
    });
}

$.getJSON("app/data/users.json", function(data) {
    for (var i = 0; i < data.length; i++) {
        if(data[i].transactions.length != 0) {
            for (var j = 0; j < data[i].transactions.length; i++) {
                if(data[i].transactions[j].currency != "eth") {
                    var status = "";
                    switch(data[i].transactions[j].status) {
                        case "new": status = "default"; break;
                        default:    status = "success"; break;
                    }
                    buildTR(
                        data[i].transactions[j].date,
                        data[i].transactions[j].url,
                        data[i].transactions[j].tx,
                        data[i].transactions[j].amount,
                        data[i].transactions[j].currency,
                        data[i].transactions[j].rateToEth,
                        data[i].transactions[j].tokens,
                        status
                    );
                }
            }
        }
    }
});

function buildTR(date, url, tx, amount, currency, rateToEth, tokens, status) {
    var button_name = "Not issued";
    if (status == "success") {
        button_name = "Issued";
    }
    $("[name=tbody]").html($("[name=tbody]").html() + '<tr class="tr '+status+'">' +
        '<td class="table-hover"><input class="select-item select-'+status+' checkbox" name="checkbox" type="checkbox"></td>' +
        '<td class="table-hover">'+date+'</td>' +
        '<td class="table-hover table-tx"><a href="'+url+'">'+tx+'</a></td>' +
        '<td class="table-hover">'+amount+'</td>' +
        '<td class="table-hover table-currency">'+currency+'</td>' +
        '<td class="table-hover table-eth">'+amount/rateToEth+'</td>' +
        '<td class="table-hover">ETH</td>' +
        '<td class="table-hover table-tokens">'+tokens+'</td>' +
        '<td class="table-hover">JTC</td>' +
        '<td class="table-hover"><button type="button" class="btn btn-'+status+'">' + button_name + '</button></td>' +
    '</tr>');
}