function step(n)
{
    if(n===0)
    {
        document.getElementById("sf1").style.display = "block";
        document.getElementById("sf2").style.display = "none";
        document.getElementById("sf3").style.display = "none";
        document.getElementById("sf4").style.display = "none";
    }

    if(n===1)
    {
        document.getElementById("sf1").style.display = "none";
        document.getElementById("sf2").style.display = "block";
        document.getElementById("sf3").style.display = "none";
        document.getElementById("sf4").style.display = "none";
    }

    if(n===2)
    {
        document.getElementById("sf1").style.display = "none";
        document.getElementById("sf2").style.display = "none";
        document.getElementById("sf3").style.display = "block";
        document.getElementById("sf4").style.display = "none";
    }

    if(n===3)
    {
        document.getElementById("sf1").style.display = "none";
        document.getElementById("sf2").style.display = "none";
        document.getElementById("sf3").style.display = "none";
        document.getElementById("sf4").style.display = "block";
    }

    scrollTo(0,130)
}

$(document).ready(function () {

    var progress;

    $('#back2').on("click", function () {
        step(0);
    });

    $('#edit').on("click", function () {
        step(0);
    });

    $('#back3').on("click", function () {
        step(1);
    });

    $.post("save.php", {step: "login_chk"} , function (res) {

        var data;
        try {
            data = JSON.parse(res);
        }catch (e) {
            console.log(e + "\n" + res);
        }
        console.log(data);                                                  /////////debug
       if(data.auth !== true) {
           //login
           window.open("login.php", "_self");
       }


        progress = data.progress;
        step(data.progress);

        if(typeof data.fn != "undefined") $('#firstName').val(data.fn).attr("disabled", "true");
        if(typeof data.mn != "undefined") $('#middleName').val(data.mn).attr("disabled", "true");
        if(typeof data.ln != "undefined") $('#lastName').val(data.ln).attr("disabled", "true");
        if(typeof data.email != "undefined") $('#email').val(data.email).attr("disabled", "true");
        if(typeof data.mother != "undefined") $('#motherName').val(data.mother);
        if(typeof data.dob != "undefined") $('#birthDate1').val(data.dob).attr("disabled", "true");
        if(typeof data.address != "undefined") $('#address').val(data.address);
        if(typeof data.contact != "undefined") $('#phoneNumber').val(data.contact).attr("disabled", "true");
        if(typeof data.class != "undefined") $('#class').val(data.class);
        if(typeof data.board != "undefined") $('#board').val(data.board);
        if(typeof data.marks != "undefined") $('#marks').val(data.marks);
        if(typeof data.tmarks != "undefined") $('#tmarks').val(data.tmarks);
        if(typeof data.per != "undefined") $('#per').val(data.per);
        if(typeof data.school != "undefined") $('#school').val(data.school);
        if(typeof data.schooladd != "undefined") $('#schooladd').val(data.schooladd);
        if(typeof data.photo != "undefined"){ $('#photo1').attr("class", "form-control-file border border-success border-w-3"); $('#view1').attr("style", "visibility: visible");}
        if(typeof data.marksheet != "undefined"){ $('#photo2').attr("class", "form-control-file border border-success border-w-3"); $('#view2').attr("style", "visibility: visible");}
        if(typeof data.aadhar != "undefined"){ $('#photo3').attr("class", "form-control-file border border-success border-w-3"); $('#view3').attr("style", "visibility: visible");}

        if(typeof data.photo != "undefined" && typeof data.marksheet != "undefined" && typeof data.aadhar != "undefined")
        {
            $('#next3').attr("disabled", false);
        }else{
            $('#next3').attr("title", "Please upload all the documents first!");
        }

        $('#view1').click(function () {
            window.open("viewdocs.php?email=" + data.email + "&doc=" + data.photo, "_blank");
        });

        $('#view2').click(function () {
            window.open("viewdocs.php?email=" + data.email + "&doc=" + data.marksheet, "_blank");
        });

        $('#view3').click(function () {
            window.open("viewdocs.php?email=" + data.email + "&doc=" + data.aadhar, "_blank");
        });
    });



    
    $('#form_step1').on("submit", function (e) {
        e.preventDefault();
        $.post("save.php", $('#form_step1').serialize(), function (data) {
            console.log(data);
            step(JSON.parse(data).progress);
            $('#next1').attr("disabled", false).val("Next");
        });
        $('#next1').attr("disabled", true).val("Loading...");
    });

    $('#form_step2').on("submit", function (e) {
        e.preventDefault();
        $.post("save.php", $('#form_step2').serialize(), function (data) {
            console.log(data);
            step(JSON.parse(data).progress);
            $('#next2').attr("disabled", false).val("Next");
        });
        $('#next2').attr("disabled", true).val("Loading...");
    });


    $('#form_step3').on("submit", function (e) {
        e.preventDefault();
        $.post("save.php", $('#form_step3').serialize(), function (data) {
            console.log(data);
            if(JSON.parse(data).progress === 3)
            {
                step(JSON.parse(data).progress);
            }
            $('#next3').attr("disabled", false).val("Next");
        });
        $('#next3').attr("disabled", true).val("Loading...");
    });

});
