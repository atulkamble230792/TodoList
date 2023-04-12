
//display todo data
function show_data(){
    try {
        
    } catch (error) {
        
    }
    fetch("http://localhost:3000/todo_data")
    .then(res => res.json())
    .then(data => {
        //return false
        if(data.length > 0){
            let sr_no = 1;
            let td_data = "";

            for(let i=0; i< data.length; i++){
                td_data  += `<tr>
                <td scope="row">${sr_no}</td>
                <td>${data[i]['title']}</td>
                <td>${data[i]['description']}</td>
                <td class="btn-group">
                    <button type="button" id="edit_todo" class="btn btn-edit" onclick="editTodoData(${data[i]['id']})"><i class="fa-solid fa-pencil"></i></button>
                    <button type="button" id="delete_todo" class="btn btn-delete" onclick="deleteTodoData(${data[i]['id']})"><i class="fa-solid fa-trash"></i></button>
                </td></tr>`;

                document.getElementById("todo_body").innerHTML = td_data;
                sr_no++;
            }
        }else{
            document.getElementById("todo_body").innerHTML = "<td colspan='4' style='text-align:center'>Data not available.</td>";
        }
    })
}

//add todo data
function addtodoData(){
    let todo_title = document.getElementById('todoTitle').value;
    let todo_des = document.getElementById('todoDescription').value;
    let flag = "";
    if(todo_title == ""){
        document.getElementById("title_error").style.display = "block"
        flag = false;
    }else{
        document.getElementById("title_error").style.display = "none"
        flag = true;
    }

    if(todo_des == ""){
        document.getElementById("desc_error").style.display = "block"
        document.getElementById("desc_error_num").style.display = "none"
        flag = false;
    }else{
        if (!/^[a-zA-Z]*$/g.test(todo_des)) {
            document.getElementById("desc_error_num").style.display = "block"
            document.getElementById("desc_error").style.display = "none"
            flag = false;
        }else{
            document.getElementById("desc_error").style.display = "none"
            document.getElementById("desc_error_num").style.display = "none"
            flag = true;
        }
        
    }

    if(flag == true){
        fetch("http://localhost:3000/todo_data", {
            method: "POST",
            body: JSON.stringify({
                title: todo_title,
                description: todo_des
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => {
            if(response){
                document.getElementById('todoTitle').value = "";
                document.getElementById('todoDescription').value = "";
                $('#todoaddmodal').modal('hide')
            }else{
                alert("Todo added failed");
            }

        show_data()

        })
    }

}


//Delete todo Data
function deleteTodoData(delete_id){

fetch(`http://localhost:3000/todo_data/${delete_id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({

    })
    })
    .then(res => res.json())
    .then(data => {
        if(data){
            document.getElementById("delete_todo_id").innerHTML = data.title;
            document.getElementById("deletetodoid").value = data.id;
            $('#deletetodomodal').modal({backdrop: 'static', keyboard: false})
            $('#deletetodomodal').modal('show')
        }
    })
}


function removeTodoData(){
    let remove_id = document.getElementById("deletetodoid").value;

    fetch(`http://localhost:3000/todo_data/${remove_id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify()
    })
    .then(res => {
        if(res){
        }else{
            alert("Data Deleted failed");
        }
        show_data()
    })
}



//edit todo data
function editTodoData(edit_id){
    fetch(`http://localhost:3000/todo_data/${edit_id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({

    })
    })
    .then(res => res.json())
    .then(data => {
        if(data){
            document.getElementById("edittodoTitle").value = data.title;
            document.getElementById("edittodoDescription").value = data.description;
            $('#edittodomodal').modal({backdrop: 'static', keyboard: false})
            $('#edittodomodal').modal('show')
            document.getElementById("updatetodoid").value = data.id;
        }
    })
}


//update todo data
function updateTodoData(){
    let update_id = document.getElementById("updatetodoid").value;
    let update_title =  document.getElementById("edittodoTitle").value;
    let update_desc =  document.getElementById("edittodoDescription").value;

    let flag = "";
    if(update_title == ""){
        document.getElementById("edit_title_error").style.display = "block"
        flag = false;
    }else{
        document.getElementById("edit_title_error").style.display = "none"
        flag = true;
    }

    if(update_desc == ""){
        document.getElementById("edit_desc_error").style.display = "block"
        document.getElementById("edit_desc_error_num").style.display = "none"
        flag = false;
    }else{
        if (!/^[a-zA-Z]*$/g.test(update_desc)) {
            document.getElementById("edit_desc_error_num").style.display = "block"
            document.getElementById("edit_desc_error").style.display = "none"
            flag = false;
        }else{
            document.getElementById("edit_desc_error").style.display = "none"
            document.getElementById("edit_desc_error_num").style.display = "none"
            flag = true;
        }
    }

    if(flag == true){
        fetch(`http://localhost:3000/todo_data/${update_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title : update_title,
            description : update_desc
        })
        })
        .then((response) => {
            if(response){
                $('#edittodomodal').modal('hide')
            }else{
                alert("Data update failed");
            }

            show_data()
        })
    }
}

function viewTodoData(view_id){
    fetch(`http://localhost:3000/todo_data/${view_id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({

    })
    })
    .then(res => res.json())
    .then(data => {
        if(data){
            document.getElementById("viewtodoTitle").value = data.title;
            document.getElementById("viewtodoDescription").value = data.description;
            $('#viewtodomodal').modal({backdrop: 'static', keyboard: false})
            $('#viewtodomodal').modal('show')
        }
    })
}

//get search bar data
function getFilterData(){
    
    var filter = document.getElementById("search_text").value.toUpperCase();
    var rows = document.querySelector("#todo_table tbody").rows;
    
    for (var i = 0; i < rows.length; i++) {
        var firstCol = rows[i].cells[1].textContent.toUpperCase();
        var secondCol = rows[i].cells[2].textContent.toUpperCase();
        if (firstCol.indexOf(filter) > -1 || secondCol.indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }      
    }
}

