window.addEventListener("DOMContentLoaded", (event)=>{
    const upVote = document.querySelectorAll(".upvote-button");
    const downVote = document.querySelectorAll(".downvote-button");
    const counter = document.querySelectorAll(".votes-number");

    //addEventListener to each upvote and downvote button

    upVote.forEach((upVoteButton) => {
        upVoteButton.addEventListener("click", async (e) => {
            //extract id number from button
            const upVoteArr = upVoteButton.id.split("");
            const idNum = parseInt(upVoteArr[upVoteArr.length - 1]);

            const result = await fetch(`/voting/upvote/${idNum}`, {
                method: "PATCH"
            });
            const json = await result.json();

            counter.innerHTML = json.voteCount;
        });
    });

    /* upVote.addEventListener("click", async (e) => {
        //extract id number from html
        const upVoteArr = upVote.id.split("");
        const idNum = parseInt(upVoteArr[upVoteArr.length - 1]);

        const result = await fetch(`/voting/upvote/${idNum}`, {
            method: "PATCH"
        });
        const json = await result.json();

        counter.innerHTML = json.voteCount;
    }); */

    /* downVote.addEventListener("click", async (e) => {
        const upVoteArr = upVote.id.split("");
        const idNum = parseInt(upVoteArr[upVoteArr.length - 1]);

        const result = await fetch(`/voting/downvote/${idNum}`, {
            method: "PATCH"
        });
        const json = await result.json();

        counter.innerHTML = json.voteCount;
    }); */
})
