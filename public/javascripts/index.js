window.addEventListener("load", (event)=>{
    const upVote = document.querySelector(".upvote-button");
    const downVote = document.querySelector(".downvote-button");
    const counter = document.querySelector(".votes-number");

    upVote.addEventListener("click", async (e) => {
        //extract id number from html
        const upVoteArr = upVote.id.split("");
        const idNum = parseInt(upVoteArr[upVoteArr.length - 1]);

        const result = await fetch(`/voting/upvote/${idNum}`, {
            method: "PATCH"
        });
        const json = await result.json();

        counter.innerHTML = json.score;
    });

    downVote.addEventListener("click", async (e) => {

    });
})
