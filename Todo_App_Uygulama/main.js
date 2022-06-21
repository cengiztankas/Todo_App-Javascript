    
    //------------------------------------------------------------------------
    const btnAddNewTask=document.querySelector('#btnAddNewTask');
     const taskList=document.querySelector('#task-list');
     const txtNewTask=document.querySelector('.txtNewTask');
     const btnclear=document.querySelector("#btnclear");
     const filters=document.querySelectorAll(".filters span")

     let isUpdateTime=false;



    "use-strict";
     let gorevler=[];
    
     if(localStorage.getItem("gorevListesi")!==null){
        gorevler=JSON.parse(localStorage.getItem("gorevListesi"));
     };

   
     window.addEventListener("load",()=>{
        displayTasks(document.querySelector("span.active").id);
     });

    btnAddNewTask.addEventListener("click",NewTasks);
    document.querySelector(".txtNewTask").addEventListener("keypress",function(event) {
         if(event.key=="Enter"){
          document.getElementById("btnAddNewTask").click();
         }
         
    });

    for(let span of filters){
                
        span.addEventListener("click",function(){
            document.querySelector("span.active").classList.remove("active");
            span.classList.add("active");
            displayTasks(span.id);
        })
     }



    let gindex=0;

    function NewTasks(event){
    
        if(txtNewTask.value!=""){
            if(isUpdateTime){
           
           gorevler[gindex].gorevadi=txtNewTask.value;
           isUpdateTime=false;
           taskList.classList.remove("disabled");

       }else{
          gorevler.push({"gorevadi": txtNewTask.value,"gorevDurum":"pending"});
         
       }
       txtNewTask.value=""; 
       displayTasks(document.querySelector("span.active").id);
      
      
        }
     
    };

    function displayTasks(filter){
           
       if(gorevler.length!=0){

       taskList.innerHTML="";
       for(let i=0;i<gorevler.length;i++){

           let completed=gorevler[i].gorevDurum=="completed" ? "checked":"";
            

         if(filter==gorevler[i].gorevDurum||filter=="all"){
           
        let addedTask=`

         <li class="task list-group-item">
             <div class="form-check">
                 <input type="checkbox" onclick="updateStatus(this)" id="${i}" class="form-check-input" ${completed}>
                 <label for="${i}" class="form-check-label  ${completed} ">${gorevler[i].gorevadi}</label>
             </div>
             <div class="dropdown"  id="deleteupdateitemdropdown">
                 <button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" ><i class="fa-solid fa-ellipsis"></i>
                 </button>
                 <ul class="dropdown-menu">
                   <li><a onclick="deleteTask(${i})" class="dropdown-item" href="#"><i class="fa-solid fa-rectangle-xmark"></i> Sil </a></li>
                   <li><a onclick="updateTask(${i})" class="dropdown-item" href="#"><i class="fa-solid fa-pencil"></i> Düzenle </a></li>
                 </ul>
               </div>
         </li>


        `;
        taskList.insertAdjacentHTML("beforeend",addedTask);
           } 
       } 

       }else{
           taskList.innerHTML="<p class='p-3 mx-auto'> Görev Listesi Boş. </p>";
       }
       
       localStorage.setItem("gorevListesi",JSON.stringify(gorevler));
         
    };
           
         function deleteTask(deleteindex){
                if (confirm(`${gorevler[deleteindex].gorevadi}  Görevi Silinsin mi?`)) {
                    
                    gorevler.splice(deleteindex,1);
                    displayTasks(document.querySelector("span.active").id);
                  alert("Görev Silindi");

                }

            }   
            
             
           
           
           function updateTask(uptadeindex){
            txtNewTask.value=gorevler[uptadeindex].gorevadi;
            txtNewTask.focus();
            isUpdateTime=true;
            gindex=uptadeindex;
            taskList.classList.add("disabled");
             console.log(gindex);
           }

            
           btnclear.addEventListener("click",()=>{
            if (confirm("Görev Listesi Temizlensin  mi?")) {
            gorevler.splice(0,gorevler.length);
            displayTasks("all");
            }

           })


           function updateStatus(selectedTask){
            
            let label =selectedTask.nextElementSibling;
            let durum;

            if(selectedTask.checked){
                label.classList.add("checked");
                durum="completed";
            }else{
                label.classList.remove("checked");
                durum="pending";
                
            }
            for( let i=0;i<gorevler.length;i++){
                   if(i==selectedTask.id){
                    gorevler[i].gorevDurum=durum;
                   }
            }
            displayTasks(document.querySelector("span.active").id);
           }









           // function myFunction() {
//                 var txt;
//                 if (confirm("Press a button!")) {
//                     txt = "You pressed OK!";
//                 } else {
//                     txt = "You pressed Cancel!";
//                 }
//                 document.getElementById("demo").innerHTML = txt;
//             }