// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 클릭하면 할일이 삭제된다.
//Check 버튼을 클릭하면 밑줄
//1. check버튼 누르면 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나오게 한다.
// 전체탭을 누르면 다시 전체아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");

let taskList = [];
let filterList = [];
let mode ="all";
addButton.addEventListener("click",addTask);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event);});
}
function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false,
    };
    taskList.push(task);
    taskInput.value = "";
    render();
}

function filter(event) {
    mode = event.target.id;
    filterList = [];

    if(event){
    underLine.style.width =
        event.target.offsetWidth + "px";
    underLine.style.top =
        event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    underLine.style.left =
        event.target.offsetLeft + "px";    

    }
    
    if(mode == "all"){
        render()
    }else if(mode == "ongoing"){
        for (let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if(mode == "done"){
        for (let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function render(){
    let list=[];

    if(mode == "all"){
        list = taskList
    }else if(mode == "ongoing" || mode == "done"){
        list = filterList
    }

    let resultHTML = "";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${list[i].id}')">Check</button>
              <button onclick="toggleDelete('${list[i].id}')">Delete</button>
            </div>
          </div>`
        }else{
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="toggleDelete('${list[i].id}')">Delete</button>
        </div>
      </div>`
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id) {
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function toggleDelete(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2,9);
}