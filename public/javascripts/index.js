window.addEventListener("DOMContentLoaded", (event)=>{
    const upVote = document.querySelectorAll(".upvote-button");
    const downVote = document.querySelectorAll(".downvote-button");
    const counter = document.querySelectorAll(".votes-number");

    //addEventListener to each upvote and downvote button

    for (let i = 0; i < upVote.length; i++) {   //Put eventlistener on each upvote button available
        upVote[i].addEventListener("click", async (e) => {
            //extract id number from upvote button
            const upVoteArr = upVote[i].id.split("");
            const idNum = parseInt(upVoteArr[upVoteArr.length - 1]);

            const result = await fetch(`/voting/upvote/${idNum}`, {
                method: "PATCH"
            });
            const json = await result.json();

            counter[i].innerHTML = json.voteCount;
        });
    }

    for (let j = 0; j < downVote.length; j++) {
        downVote[j].addEventListener("click", async (e) => {
            //extract id number from downvote button
            const downVoteArr = downVote[j].id.split("");
            const idNum = parseInt(downVoteArr[downVoteArr.length - 1]);

            const result = await fetch(`/voting/downvote/${idNum}`, {
                method: "PATCH"
            });
            const json = await result.json();

            counter[j].innerHTML = json.voteCount;
        });
    }

})
