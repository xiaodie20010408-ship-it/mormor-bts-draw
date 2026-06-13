let prizes =
JSON.parse(
localStorage.getItem("mormorPrizes")
) || [];

let drawCount =
Number(
localStorage.getItem(
"drawCount"
)
) || 0;

const armyBomb = document.getElementById("armyBomb");

const home = document.getElementById("home");
const animationPage = document.getElementById("animation");
const resultPage = document.getElementById("result");

const prizeName = document.getElementById("prizeName");

const confirmBtn = document.getElementById("confirmBtn");

const capsule =
document.getElementById("capsuleImg");

armyBomb.addEventListener("click", () => {

    prizes =
    JSON.parse(
        localStorage.getItem(
            "mormorPrizes"
        )
    ) || [];

    drawCount =
    Number(
        localStorage.getItem(
            "drawCount"
        )
    ) || 0;

    const today =
    new Date()
    .toISOString()
    .split("T")[0];

    const availablePrizes =
    prizes.filter(prize =>

        (
            prize.unlimited ||
            prize.stock > 0
        )

        &&

        drawCount >=
        (
            prize.unlockCount || 0
        )

        &&

        (
            !prize.unlockDate ||
            prize.unlockDate <= today
        )

    );

    if(
        availablePrizes.length === 0
    ){

        alert(
            "奖品已全部发放完毕"
        );

        return;

    }

    home.classList.add("hidden");

    animationPage.classList.remove("hidden");

    capsule.classList.remove("charge");
    capsule.classList.remove("open-pop");

    capsule.src =
    "assets/capsule_closed.png";

    setTimeout(() => {

        capsule.classList.add("charge");

    },300);

    setTimeout(() => {

        capsule.classList.remove("charge");

        capsule.src =
        "assets/capsule_open.png";

        capsule.classList.add("open-pop");

    },1500);

    setTimeout(() => {

        animationPage.classList.add("hidden");

        resultPage.classList.remove("hidden");

        let weightedPool = [];

availablePrizes.forEach(prize => {

    const weight =
    prize.weight || 1;

    const originalIndex =
    prizes.findIndex(
        p => p.name === prize.name
    );

    for(
        let i = 0;
        i < weight;
        i++
    ){

        weightedPool.push(
            originalIndex
        );

    }

});

const prizeIndex =
weightedPool[
    Math.floor(
        Math.random() *
        weightedPool.length
    )
];

const randomPrize =
prizes[prizeIndex];

        console.log(
            "中奖奖品：",
            randomPrize.name
        );

        // ===== 扣库存 =====

        if(
    !randomPrize.unlimited
){

    prizes[
        prizeIndex
    ].stock--;

    localStorage.setItem(
        "mormorPrizes",
        JSON.stringify(prizes)
    );

}

        // ===== 增加抽奖次数 =====

        drawCount++;

        localStorage.setItem(
            "drawCount",
            drawCount
        );

        // ===== 显示奖品 =====

        prizeName.textContent =
        randomPrize.name;

        prizeName.style.transform =
        "scale(0.5)";

        setTimeout(() => {

            prizeName.style.transform =
            "scale(1)";

        },100);

    },2500);

});

confirmBtn.addEventListener("click", () => {

    prizeName.style.transform =
    "scale(1)";

    resultPage.classList.add("hidden");

    home.classList.remove("hidden");

});

setInterval(() => {

    prizes =
    JSON.parse(
        localStorage.getItem(
            "mormorPrizes"
        )
    ) || [];

    drawCount =
    Number(
        localStorage.getItem(
            "drawCount"
        )
    ) || 0;

}, 1000);