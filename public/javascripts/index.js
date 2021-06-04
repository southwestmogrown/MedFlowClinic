window.addEventListener("DOMContentLoaded", (event)=>{
    const upVote = document.querySelectorAll(".upvote-button");
    const downVote = document.querySelectorAll(".downvote-button");
    // counters = document.querySelectorAll(".votes-number");

    const upVoteAns = document.querySelectorAll(".answer-upvote-button");
    const downVoteAns = document.querySelectorAll(".answer-downvote-button");
    const counterAns = document.querySelectorAll(".answer-vote-count");
    console.log(upVote)
    //console.log(counters)
    //addEventListener to each upvote and downvote button for questions

    for (let i = 0; i < upVote.length; i++) {   //Put eventlistener on each buttons
        upVote[i].addEventListener("click", async (e) => {
            //extract id number from upvote button
            const upVoteArr = upVote[i].id.split("");
            const idNum = parseInt(upVoteArr[upVoteArr.length - 1]);
            const counter = document.getElementById(`counter-${idNum}`)

            const result = await fetch(`/voting/upvote/${idNum}`, {
                method: "PATCH"
            });
            const json = await result.json();

            counter.innerHTML = json.voteCount;
        });

        downVote[i].addEventListener("click", async (e) => {
            //extract id number from downvote button
            const downVoteArr = downVote[i].id.split("");
            const idNum = parseInt(downVoteArr[downVoteArr.length - 1]);
            const counter = document.getElementById(`counter-${idNum}`)

            const result = await fetch(`/voting/downvote/${idNum}`, {
                method: "PATCH"
            });
            const json = await result.json();

            counter.innerHTML = json.voteCount;
        });
    }

    //addeventlistener to upvote downvote buttons in answers
    //Need to be able to grab the id number at the end of the ids in each answer button
    for (let iAns = 0; iAns < upVoteAns.length; iAns++) {
        upVoteAns[iAns].addEventListener("click", async (e) => {
            const upVoteArr = upVoteAns[iAns].id.split("");
            const idNum = parseInt(upVoteArr[upVoteArr.length - 1]);

            const result = await fetch(`/voting/upvote/answer/${idNum}`, {
                method: "PATCH"
            });
            const json = await result.json();

            counterAns[iAns].innerHTML = json.voteCount;
        });

        downVoteAns[iAns].addEventListener("click", async (e) => {
            const downVoteArr = downVoteAns[iAns].id.split("");
            const idNum = parseInt(downVoteArr[downVoteArr.length - 1]);

            const result = await fetch(`/voting/downvote/answer/${idNum}`, {
                method: "PATCH"
            });

            const json = await result.json();

            counterAns[iAns].innerHTML = json.voteCount;
        });
    }

});
