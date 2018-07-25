window.onload = function() {
    var data = [{
        "title": "A",
        "text": "AAAA"
    }, {
        "title": "B",
        "text": "BBB"
    }, {
        "title": "A",
        "text": "AAAA"
    }, {
        "title": "B",
        "text": "BBB"
    }]
    new Vue({
        el: '#example-5',
        data: {
            selected: data[0]["text"],
            options: data
        }

    })
}
