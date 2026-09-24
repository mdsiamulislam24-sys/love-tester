function testLove() {

    let name1 = document.getElementById("name1").value;
    let name2 = document.getElementById("name2").value;

    if (name1 === "" || name2 === "") {
        document.getElementById("result").innerHTML =
            "Please enter both names! 😅";
        return;
    }

    let score = Math.floor(Math.random() * 101);

    fetch("/save-result", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        name1: name1,
        name2: name2,
        score: score
    })
});

    document.getElementById("result").innerHTML =
        "❤️ Love Score: " + score + "% ❤️";

}
function resetTest() {

    document.getElementById("name1").value = "";
    document.getElementById("name2").value = "";

    document.getElementById("result").innerHTML = "";

    document.getElementById("love-bar").style.width = "0%";

    document.getElementById("reset-btn").style.display = "none";
}