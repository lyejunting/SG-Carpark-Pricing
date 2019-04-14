const app = document.getElementById('root')
const body = document.getElementById('body')
const search = document.getElementById('searchBar')

const request = new XMLHttpRequest()
var count = 0;
const availableTags = [];
request.open('GET', 'https://data.gov.sg/api/action/datastore_search?resource_id=85207289-6ae7-4a56-9066-e6090a3684a5&limit=400', true)

request.onload = function () {
    // Begin accessing JSON data here
    if (request.status >= 200 && request.status < 400) {
        data = JSON.parse(this.response)
        $(function () {
            data.result.records.forEach(record => {
                availableTags.push(record.carpark)
            })
        });
    }
}

$("#searchBar").keypress(function (event) {
        $("#searchBar").autocomplete({
            source: availableTags
        });

        if (event.which == 13) {
            if (count > 0) {
                $(".resultItems").html("")
                count = 0
            }
            count += 1;
            data.result.records.forEach(record => {
                if (record.carpark === $("#searchBar").val()) {
                    var item = "<h4> Weekday Rate: " + record.weekdays_rate_1 + "</h4>"
                    $(".resultItems").append(item)
                    if (record.weekdays_rate_2 !== "-" && (record.weekdays_rate_2 !== record.weekdays_rate_1)) {
                        var item2 = "<h4> Weekday Rate: " + record.weekdays_rate_2 + "</h4>"
                        $(".resultItems").append(item2)
                    }
                    if (record.saturday_rate !== "-") {
                        var item3 = "<h4> Saturday: " + record.saturday_rate + "</h4>"
                        $(".resultItems").append(item3)
                    }
                    if (record.sunday_publicholiday_rate !== "-") {
                        var item4 = "<h4> Sunday / Public Holiday: " + record.sunday_publicholiday_rate + "</h4>"
                        $(".resultItems").append(item4)
                    }
                }
            })
            $(".result").html($(".resultItems"));
        }

    }
);
request.send()
