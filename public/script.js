
const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");




// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
    try {
        //APIを起動する。
        const { data: tasks } = await axios.get("/api/v1/tasks");
        console.log(tasks);

        //タスクが存在しない場合
        if(tasks.length < 1) {
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません。</h5>`;
            return;
        }

        //タスクを出力
        const allTasks = tasks.map((task) => {
        const { completed, _id, name } = task;
        //タスクHTMLで出力する
        return `<div class="single-task ${completed && "task-completed"}">
            <h5>
                <span><i class="fas fa-check-circle"></i></span>${name}
            </h5>
            <div class="task-links">
                <!--編集リンク-->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <!--削除リンク-->
                <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`
        });
        console.log(allTasks);
        tasksDOM.innerHTML = allTasks.join("");
    } catch (error) {
        console.log(error);
    }
}

showTasks();

//タスク新規作成(post)
formDOM.addEventListener("submit", async (event) => {
    //ページリロードしない
    event.preventDefault();
    const name = taskInputDOM.value;

    try {
        await axios.post("api/v1/tasks", {name: name});
        showTasks();
        taskInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "タスクを追加しました。";
        formAlertDOM.classList.add("text-success");
    } catch (error) {
        console.log(error);
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "タスク名は20文字以内で入力してください。";
    }
    setTimeout(() => {
        formAlertDOM.computedStyleMap.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);

});

//タスクを削除
tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    console.log(element.parentElement);
    if(element.parentElement.classList.contains("delete-btn")) {
        const id = element.parentElement.dataset.id;
        console.log(id);    
        try {
            await axios.delete(`api/v1/tasks/${id}`);
            showTasks();
        } catch (error) {
            console.log(error);
        }
    }
});



