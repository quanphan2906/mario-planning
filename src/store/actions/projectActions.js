export const createProject = (project) => {
    return (dispatch, getState) => {
        //make async call to db
        //then, carry on the dispatch
        dispatch({
            type: "CREATE_PROJECT",
            project
        })
    }
}