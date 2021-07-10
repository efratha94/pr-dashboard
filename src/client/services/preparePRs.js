

const formattedPRs = (prArr) => {

    return prArr.map(pr => {
        // let splittedBody = pr.body
        // .split("-->")
        // console.log("pr", pr.number, pr.body)
        return {
            "pr_creation_date": pr.created_at,
            "pr_number": pr.number,
            "pr_title": pr.title,
            "pr_description": pr.body, //splittedBody[1],
            "pr_status": pr.draft === true ? "draft" : pr.state,
            "pr_labels": pr.labels,
            "pr_author": {username: pr.user.login, avatar: pr.user.avatar_url}
        }
    })
}

export default formattedPRs