let elem = `<div class="card mt-2" style="min-width: 20em;">
    <div class="card-body">
        <h4 class="card-title">GACH PETER<small style="float: right;">S3 D</small></h4>
        <p class="card-text">FEATUTE: Chatting system<small style="float: right;">5 Feb 2019</small></p>
    </div>
</div>`;

document.onreadystatechange = (ev) => {
    if (document.readyState == "complete") {
        loadit()
    }
}

function loadit() {
    let mother = document.getElementById("con");

    $.get("/feature", function (data) {
        let fn = data.reverse();
        fn.forEach(el => {
            let m = "<div class='card mt-2' title='A feature' style='min-width:20em;'> <div class='card-body' > " + el.name + "<h4 class='card-title'><small style='float: right;'>" + "S" + el.class + " " + el.stream + "</small></h4> <p class='card-text text-warning'>FEATURE: " + el.feature + "<small style='position : absolute;right:10px;bottom:10px;color:grey'><b>" + toFt(new Date(el.time).getHours()) + ":" + new Date(el.time).getMinutes() + " " + toDt(new Date(el.time).getHours())+"</b> " +new Date(el.time).getUTCDate() + "/" + new Date(el.time).getMonth()  +"/" +new Date(el.time).getFullYear() + "</small></p></div ></div >";
            mother.innerHTML += m;
        });
    });
}

function toDt(a){
    if(a<12){
        return "AM";
    }
    else{
        return "PM";
    }
}
function toFt(a) {
    if (a < 12) {
        return a;
    }
    else {
        return a-12;
    }
}
