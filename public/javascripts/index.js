window.addEventListener("load", (event)=>{
    const upVote = document.querySelector(".upvote-button");
    const downVote = document.querySelector(".downvote-button");
    const counter = document.querySelector(".votes-number");

    upVote.addEventListener("click", async (e) => {
        const result = await fetch("/voting/upvote", {
            method: "PATCH"
        });
        const json = await result.json();
        counter
        counter.innerHTML = vote.score;
    });

    downVote.addEventListener("click", async (e) => {

    });
})
