const firebaseConfig = {
    apiKey: "AIzaSyAjjCqb17LVexgGP3oBYbnNknLQMtxsVB0",
    authDomain: "this-todo-list-bruh.firebaseapp.com",
    databaseURL: "https://this-todo-list-bruh-default-rtdb.firebaseio.com",
    projectId: "this-todo-list-bruh",
    storageBucket: "this-todo-list-bruh.appspot.com",
    messagingSenderId: "451903423329",
    appId: "1:451903423329:web:7d93bc8952981df0dcfb20"
  };

// initializing Firebase
app = firebase.initializeApp(firebaseConfig);
console.log("Initialized Firebase")
database = firebase.database();
// function that adds a task
function save_task() {
 task = document.getElementById("to-doinput").value;// extracting the value
 console.log("Value from Input: "+task);

 firebase.database().ref("tasks").push({
    task: task
});
console.log("Sent task..., "+task)
    document.getElementById("to-doinput").value = "";

}

// The below code adds  
database.ref("tasks").on("value", (snapshot) => {
    task_list.innerHTML = "";

snapshot.forEach((childSnapshot) => {
 task = childSnapshot.val().task;
 task_item = document.createElement("li");
      task_item.textContent = task;
      task_list.appendChild(task_item);
    });
  });

  function clear_tasks() {
 tasksRef = database.ref("tasks");

 tasksRef.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      firstTaskKey = childSnapshot.key;
      tasksRef.child(firstTaskKey).remove();
      return; // stop the loop
    });
  });
}
function updateDate(){
currentDate = new Date(); //I just found out that there is a thing called Date()

// extract separately
year = currentDate.getFullYear();
month = currentDate.getMonth() + 1; // index value start from 0, so to avoid problems we add +1
day = currentDate.getDate();
hours = currentDate.getHours();
minutes = currentDate.getMinutes();
seconds = currentDate.getSeconds();
if(hours <= 12){
    hours = currentDate.getHours()
    formatteddate = day + "/" + month + "/" + year + " " + hours + ":" + minutes + "AM at " + seconds +" seconds";
}
else{
    hours = currentDate.getHours() - 12
    formatteddate = day + "/" + month + "/" + year + " " + hours + ":" + minutes + "PM at " + seconds +" seconds";
}
console.log(formatteddate);
document.getElementById("date-time").innerHTML=formatteddate;
}
updateDate();
setInterval(updateDate, 1000);
