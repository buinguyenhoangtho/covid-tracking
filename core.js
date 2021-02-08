console.log("Script ready");
// json api
let url = "https://covid19.mathdro.id/api"

$.ajax({
    type: "method",
    url: url,
    type: 'GET',
    dataType: 'json',
    data: "data",
    success: function (data) {
        console.log("Get thành công")
        // nếu thành công
        var date = data.lastUpdate;
        var dead = (data.deaths.value).toLocaleString();
        var cases = (data.confirmed.value).toLocaleString();
        var recover = (data.recovered.value).toLocaleString();
        // dùng moment.js để chuyển đổi thời gian format
        var dateTime = moment(date).format('DD/MM/YYYY');
        $('#date').html(dateTime);
        console.log("Số người chết: " + dead);
        console.log("Số người nhiễm: " + cases)
        console.log("Số người hồi phục: " + recover)
        $('#cases_number').html(cases);
        $('#recovery_number').html(recover);
        $('#death_number').html(dead);
        // convert number to locale.string
        // search 
    },
});

// get all countries
// ============================================== Lấy thông tin các địa danh, quốc gia ===================
function auto_complete() {
    var options = {
        url: "https://disease.sh/v3/covid-19/countries/",
        getValue: "country",
        adjustWidth: false,
        template: {
            type: "custom",
            method: function(value, item) {
              return "<img class='icon-flag' src= "+item.countryInfo.flag+ ">" +  value;
            }
          },
        list: {
            match: {
                enabled: true
            },
           
            onChooseEvent: function () {
                var value = $("#search").getSelectedItemData().country; //get the id associated with the selected value
                console.log(value);
                $("#search_field").val(value).trigger("change"); //copy it to the hidden field
                // 
                get_result();
            }
        }
    };
    //   input
    $("#search").easyAutocomplete(options);
}
//  ============================== Hiện thông tin các case =============================================
function get_result() {
    console.log('Searching..');
    var searchField = $('#search_field').val();

    if (searchField != "") {
        $.ajax({
            url: "https://disease.sh/v3/covid-19/countries/" + searchField,
            type: 'GET',
            
            success: function (data) {
                // auto_complete();
                var data_case = data.cases;
                var data_deaths = data.deaths;
                var data_recovered = data.recovered;
                var data_case_today = data.todayCases;
                var data_recovered_today = data.todayRecovered;
                var data_deaths_today = data.todayDeaths;
                console.log(data_case);
                var element = document.getElementById("result");
                element.classList.add("mystyle");
                $("#result").html("Số ca:  " + data_case + " | Hôm nay  " +data_case_today +  " <br> Số ca tử vong: " + data_deaths + " | " + " Hôm nay:  " + data_deaths_today + " <br>Số ca hồi phục: " +data_recovered + " | Hôm nay : " +data_recovered_today+ "</p>");
            }

        });
    } else {
        $('#result').html("Không có dữ liệu");
    }

}
// Get all News Viêt
var newsurl = "https://news.google.com/rss/search?q=covid%20vietnam%2C%20covid%20update%2C%20covid%20when%3A1d&hl=vi&gl=VN&ceid=VN%3Avi";

$.ajax({
    url: 'http:////ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(newsurl),
    dataType: 'json',
    success: function (data)
    {
       console.log(data);
    }
});
