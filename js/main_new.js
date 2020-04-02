document.write("<script type='text/javascript' src='js/FileSaver.js-master/src/FileSaver.js'></script>"); 

function upload(){

    document.getElementById("previous-btn").disabled=false;
    document.getElementById("next-btn").disabled=false;

    let reads = new FileReader();
    file = document.getElementById('upload_files').files[0];
    reads.readAsText(file, 'utf-8');
    console.log(reads);
    reads.onload = function (e) {
        console.log(e);
        // document.getElementById('result').innerText = this.result
        data = e.target.result;
        lines = data.split("\n");
        id = 0;
        for (var i=0; i<lines.length - 2; i++){
            line = lines[i].split("\t");
            tag_value = parseInt(line[3]);
            if (isNaN(tag_value)){
                break;
            }
            id = id + 1;
        };
        line = lines[id].split("\t");
        document.getElementById('context').innerText = line[0];
        document.getElementById('post').innerText = line[1];
        document.getElementById('response_1').innerText = line[2];
        document.getElementById('response_2').innerText = line[3];
        document.getElementById('response_3').innerText = line[4];
        document.getElementById('response_4').innerText = line[5];
        document.getElementById('response_5').innerText = line[6];
        document.getElementById('response_6').innerText = line[7];
        document.getElementById('response_7').innerText = line[8];
        document.getElementById('response_8').innerText = line[9];
        document.getElementById('lines_id').value = id;
        data = data.replace(/\n/g, "&");
        document.getElementById('data').value = data;
        document.getElementById('page-span').innerText = (id + 1).toString() + "/" + (lines.length - 1).toString();

        if((id - 1) == -1){
            document.getElementById("previous-btn").disabled=true;
        }
        if((id + 1) == (lines.length - 1)){
            document.getElementById("next-btn").disabled=true;
        }

        document.getElementById("submit-btn").disabled=true;

        set_button(line);
    };
}

function is_done(all_values){
    flag = true;
    for(i=10; i<all_values.length; i++){
        if(all_values[i] == ""){
            flag = false;
            break;
        }
    }
    return flag;
}

function score3(score_value, pos, response_id){

    document.getElementById("previous-btn").disabled=false;
    document.getElementById("next-btn").disabled=false;

    var flu_btn_list = new Array();
    flu_btn_list[0] = document.getElementById("flu-btn-0_" + String(response_id));
    flu_btn_list[1] = document.getElementById("flu-btn-1_" + String(response_id));
    flu_btn_list[2] = document.getElementById("flu-btn-2_" + String(response_id));
    flu_btn_list[3] = document.getElementById("flu-btn-3_" + String(response_id));

    var info_btn_list = new Array();
    info_btn_list[0] = document.getElementById("info-btn-0_" + String(response_id));
    info_btn_list[1] = document.getElementById("info-btn-1_" + String(response_id));
    info_btn_list[2] = document.getElementById("info-btn-2_" + String(response_id));
    info_btn_list[3] = document.getElementById("info-btn-3_" + String(response_id));

    var rele_btn_list = new Array();
    rele_btn_list[0] = document.getElementById("rele-btn-0_" + String(response_id));
    rele_btn_list[1] = document.getElementById("rele-btn-1_" + String(response_id));
    rele_btn_list[2] = document.getElementById("rele-btn-2_" + String(response_id));
    rele_btn_list[3] = document.getElementById("rele-btn-3_" + String(response_id));

    var data = document.getElementById('data').value;
    var lines = data.split("&");
    var id = parseInt(document.getElementById('lines_id').value);
    var values = lines[id].split("\t");

    for(i=0; i<values.length; i++){
        values[i].replace("&", "").replace("\t", "");   
    }

    index = 7 + 3 * response_id + pos;
    if(pos == 0){
        values[index] = score_value.toString();

        for (i = 0; i < 4; i++) { 
            flu_btn_list[i].classList.add("btn-info");
            flu_btn_list[i].classList.remove("btn-warning");
        }
        flu_btn_list[parseInt(values[index]) + 1].classList.add("btn-warning");
    }
    else if(pos == 1){
        values[index] = score_value.toString();

        for (i = 0; i < 4; i++) { 
            info_btn_list[i].classList.add("btn-info");
            info_btn_list[i].classList.remove("btn-warning");
        }
        info_btn_list[parseInt(values[index]) + 1].classList.add("btn-warning");
    }
    else{
        values[index] = score_value.toString();

        for (i = 0; i < 4; i++) { 
            rele_btn_list[i].classList.add("btn-info");
            rele_btn_list[i].classList.remove("btn-warning");
        }
        rele_btn_list[parseInt(values[index]) + 1].classList.add("btn-warning");
    }

    // lines[id] = context + "\t" + post + "\t" + response + "\t" + score1 + "\t" + score2 + "\t" + score3;
    lines[id] = values.join("\t");

    var new_data = ""
    for (var i=0; i<lines.length - 1; i++){
        new_line = lines[i].replace(new RegExp("&", "gm"), "");
        new_data = new_data + new_line + "&";
    };
    last_index = lines.length - 1
    new_line = lines[last_index].replace(new RegExp("&", "gm"), "");
    new_data = new_data + new_line;
    document.getElementById('data').value = new_data;

    if(is_done(values)){
        if((id + 1) < (lines.length - 1)){
            id = id + 1;
            var current_value = lines[id].toString();
            var line = current_value.split("\t");
            document.getElementById('context').innerText = line[0];
            document.getElementById('post').innerText = line[1];
            document.getElementById('response_1').innerText = line[2];
            document.getElementById('response_2').innerText = line[3];
            document.getElementById('response_3').innerText = line[4];
            document.getElementById('response_4').innerText = line[5];
            document.getElementById('response_5').innerText = line[6];
            document.getElementById('response_6').innerText = line[7];
            document.getElementById('response_7').innerText = line[8];
            document.getElementById('response_8').innerText = line[9];
            document.getElementById('lines_id').value = id;
            document.getElementById('page-span').innerText = (id + 1).toString() + "/" + (lines.length - 1).toString();
            set_button(line);
        }
        else{
            alert("Finish, thank you!");
        }

    }
    if((id - 1) == -1){
        document.getElementById("previous-btn").disabled=true;
    }
    if((id + 1) == (lines.length - 1)){
        document.getElementById("next-btn").disabled=true;
    }
}


function save(){
    var file_name = prompt("Filename:", ".csv");
    var data = document.getElementById('data').value;
    var lines = data.split("&");
    var tag_result = new Array();
    for (var i=0; i<lines.length - 1; i++){
        lines[i] = lines[i].replace(new RegExp("&", "gm"), "");
        tag_result.push(lines[i] + "\n");
    };
    last_index = lines.length - 1
    lines[last_index] = lines[i].replace(new RegExp("&", "gm"), "");
    tag_result.push(lines[last_index]);
    var new_file = new File(tag_result, file_name, { type: "text/plain;charset=utf-8" });
    saveAs(new_file);
}

function next(){
    var id = parseInt(document.getElementById('lines_id').value);
    if((id + 1) < (lines.length - 1)){
        document.getElementById("previous-btn").disabled=false;
        id = id + 1;
        
        var data = document.getElementById('data').value;
        var new_lines = data.split("&");
        var current_value = new_lines[id].toString();
        var line = current_value.split("\t");
        for(i=0; i<line.length; i++){
            line[i].replace("&", "").replace("\t", "").replace("\n", "");   
        }

        document.getElementById('context').innerText = line[0];
        document.getElementById('post').innerText = line[1];
        document.getElementById('response_1').innerText = line[2];
        document.getElementById('response_2').innerText = line[3];
        document.getElementById('response_3').innerText = line[4];
        document.getElementById('response_4').innerText = line[5];
        document.getElementById('response_5').innerText = line[6];
        document.getElementById('response_6').innerText = line[7];
        document.getElementById('response_7').innerText = line[8];
        document.getElementById('response_8').innerText = line[9];
        document.getElementById('lines_id').value = id;
        document.getElementById('page-span').innerText = (id + 1).toString() + "/" + (lines.length - 1).toString();

        if((id + 1) == (lines.length - 1)){
            document.getElementById("next-btn").disabled=true;
        }
        set_button(line);
    }
    else{
        alert("The last");
    }
}

function set_button(all_values){
    for(k=10; k<all_values.length; k++){
        response_id = parseInt((k - 10) / 3) + 1;
        pos = (k-10) % 3;
        var flu_btn_list = new Array();
        flu_btn_list[0] = document.getElementById("flu-btn-0_" + String(response_id));
        flu_btn_list[1] = document.getElementById("flu-btn-1_" + String(response_id));
        flu_btn_list[2] = document.getElementById("flu-btn-2_" + String(response_id));
        flu_btn_list[3] = document.getElementById("flu-btn-3_" + String(response_id));

        var info_btn_list = new Array();
        info_btn_list[0] = document.getElementById("info-btn-0_" + String(response_id));
        info_btn_list[1] = document.getElementById("info-btn-1_" + String(response_id));
        info_btn_list[2] = document.getElementById("info-btn-2_" + String(response_id));
        info_btn_list[3] = document.getElementById("info-btn-3_" + String(response_id));

        var rele_btn_list = new Array();
        rele_btn_list[0] = document.getElementById("rele-btn-0_" + String(response_id));
        rele_btn_list[1] = document.getElementById("rele-btn-1_" + String(response_id));
        rele_btn_list[2] = document.getElementById("rele-btn-2_" + String(response_id));
        rele_btn_list[3] = document.getElementById("rele-btn-3_" + String(response_id));
        

        if(pos == 0){
            for (i = 0; i < 4; i++) { 
                flu_btn_list[i].classList.add("btn-info");
                flu_btn_list[i].classList.remove("btn-warning");
            }
            if(all_values[k]!=""){
                flu_btn_list[parseInt(all_values[k]) + 1].classList.add("btn-warning");
            }
        }
        else if(pos == 1){
            for (i = 0; i < 4; i++) { 
                info_btn_list[i].classList.add("btn-info");
                info_btn_list[i].classList.remove("btn-warning");
            }
            if(all_values[k]!=""){
                info_btn_list[parseInt(all_values[k]) + 1].classList.add("btn-warning");
            }
        }
        else{
            for (i = 0; i < 4; i++) { 
                rele_btn_list[i].classList.add("btn-info");
                rele_btn_list[i].classList.remove("btn-warning");
            }
            if(all_values[k]!=""){
                rele_btn_list[parseInt(all_values[k]) + 1].classList.add("btn-warning");
            }
        }
    }
    

}


function previous(){
    var id = parseInt(document.getElementById('lines_id').value);
    if((id - 1) > -1){
        document.getElementById("next-btn").disabled=false;
        id = id - 1;

        var data = document.getElementById('data').value;
        var lines = data.split("&");
        var current_value = lines[id].toString();
        var line = current_value.split("\t");
        for(i=0; i<line.length; i++){
            line[i].replace("&", "").replace("\t", "").replace("\n", "");   
        }
        document.getElementById('context').innerText = line[0];
        document.getElementById('post').innerText = line[1];
        document.getElementById('response_1').innerText = line[2];
        document.getElementById('response_2').innerText = line[3];
        document.getElementById('response_3').innerText = line[4];
        document.getElementById('response_4').innerText = line[5];
        document.getElementById('response_5').innerText = line[6];
        document.getElementById('response_6').innerText = line[7];
        document.getElementById('response_7').innerText = line[8];
        document.getElementById('response_8').innerText = line[9];
        document.getElementById('lines_id').value = id;
        document.getElementById('page-span').innerText = (id + 1).toString() + "/" + (lines.length - 1).toString();

        if((id - 1) == -1){
            document.getElementById("previous-btn").disabled=true;
        }
        set_button(line);
    }
    else{
        alert("The last");
    }
}