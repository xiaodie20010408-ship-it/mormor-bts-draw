const ADMIN_PASSWORD =
"mormor";

const inputPassword =
prompt(
"请输入管理员密码"
);

if(
    inputPassword !==
    ADMIN_PASSWORD
){

    document.body.innerHTML =
    "<h1>Access Denied</h1>";

    throw new Error(
    "Wrong Password"
    );

}

const addBtn =
document.getElementById("addBtn");

const prizeList =
document.getElementById("prizeList");

let prizes =
JSON.parse(
localStorage.getItem("mormorPrizes")
) || [];

let editingIndex = null;

const drawCountDisplay =
document.getElementById(
"drawCountDisplay"
);

const resetDrawBtn =
document.getElementById(
"resetDrawBtn"
);

function savePrizes(){

    localStorage.setItem(
        "mormorPrizes",
        JSON.stringify(prizes)
    );

}

function renderPrizes(){

    drawCountDisplay.textContent =

    localStorage.getItem(
    "drawCount"
    ) || 0;

    prizeList.innerHTML = "";

    prizes.forEach((prize,index)=>{

        const div =
        document.createElement("div");

        div.className =
        "prize-item";

        let editSection = "";

        if(editingIndex === index){

    editSection = `

    <div class="edit-form">

        <div>

            <div>奖品名称</div>

            <input
            id="editName"
            value="${prize.name}">

        </div>

        <div>

            <div>库存</div>

            <input
            id="editStock"
            type="number"
            value="${prize.stock}">

        </div>

        <div>

            <div>权重</div>

            <input
            id="editWeight"
            type="number"
            value="${prize.weight || 1}">

        </div>

        <div>

            <div>解锁抽数</div>

            <input
            id="editUnlock"
            type="number"
            value="${prize.unlockCount || 0}">

        </div>

        <div>

            <div>开始日期</div>

            <input
            id="editDate"
            type="date"
            value="${prize.unlockDate || ""}">

        </div>

        <label>

            <input
            type="checkbox"
            id="editUnlimited"
            ${prize.unlimited ? "checked" : ""}>

            无限库存

        </label>

        <button
        class="save-btn"
        onclick="saveEdit(${index})">

        保存修改

        </button>

        <button
        class="cancel-btn"
        onclick="cancelEdit()">

        取消

        </button>

    </div>

    `;
}

        div.innerHTML = `

        <div class="prize-header">

            <div class="prize-info">

                <strong>
                ${prize.name}
                </strong>

                <br>

                库存：
                ${
                    prize.unlimited
                    ? "无限"
                    : prize.stock
                }

                <br>

                权重：
                ${prize.weight || 1}

                <br>

                解锁抽数：
                ${prize.unlockCount || 0}

                <br>

开始日期：
${prize.unlockDate || "立即"}

            </div>

            <div class="prize-buttons">

                <button
                onclick="editPrize(${index})">

                编辑

                </button>

                <button
                onclick="deletePrize(${index})">

                删除

                </button>

            </div>

        </div>

        ${editSection}

        `;

        prizeList.appendChild(div);

    });

}

function editPrize(index){

    editingIndex = index;

    renderPrizes();

}

function cancelEdit(){

    editingIndex = null;

    renderPrizes();

}

function saveEdit(index){

    prizes[index].name =
    document.getElementById(
    "editName"
    ).value;

    prizes[index].stock =
    Number(
        document.getElementById(
        "editStock"
        ).value
    );

    prizes[index].weight =
    Number(
        document.getElementById(
        "editWeight"
        ).value
    );

    prizes[index].unlockCount =
    Number(
        document.getElementById(
        "editUnlock"
        ).value
    );

    prizes[index].unlockDate =
document.getElementById(
"editDate"
).value;

    prizes[index].unlimited =
    document.getElementById(
    "editUnlimited"
    ).checked;

    savePrizes();

    editingIndex = null;

    renderPrizes();

}

function deletePrize(index){

    prizes.splice(index,1);

    savePrizes();

    renderPrizes();

}

addBtn.addEventListener("click",()=>{

    const name =
    document.getElementById(
    "prizeName"
    ).value;

    const stock =
    document.getElementById(
    "prizeStock"
    ).value;

    const unlimited =
    document.getElementById(
    "unlimited"
    ).checked;

    const weight =
    Number(
        document.getElementById(
        "prizeWeight"
        ).value
    ) || 1;

    const unlockCount =
    Number(
        document.getElementById(
        "unlockCount"
        ).value
    ) || 0;

    const unlockDate =
document.getElementById(
"unlockDate"
).value;

    if(!name) return;

    prizes.push({

    name:name,

    stock:Number(stock),

    unlimited:unlimited,

    weight:weight,

    unlockCount:unlockCount,

    unlockDate:unlockDate

});

    savePrizes();

    renderPrizes();

    document.getElementById(
    "prizeName"
    ).value = "";

    document.getElementById(
    "prizeStock"
    ).value = "";

    document.getElementById(
    "prizeWeight"
    ).value = 1;

    document.getElementById(
    "unlockCount"
    ).value = 0;

    document.getElementById(
    "unlimited"
    ).checked = false;

});

resetDrawBtn.addEventListener(
"click",
()=>{

    if(
        confirm(
        "确定重置抽奖次数？"
        )
    ){

        localStorage.removeItem(
            "drawCount"
        );

        drawCountDisplay.textContent =
        "0";

        alert(
        "抽奖次数已重置"
        );

    }

});

renderPrizes();

setInterval(() => {

    prizes =
    JSON.parse(
        localStorage.getItem(
            "mormorPrizes"
        )
    ) || [];

    renderPrizes();

},1000);