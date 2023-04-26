//<--------------- User related data + methods--------------->

const UsersList = [
    {
        name: "test",
        email: "test@superM.com",
        password: "1234",
    },
    {
        name: "test1",
        email: "test1@superM.com",
        password: "1234",
    }
]

const addUserInStore = (userObj) => {
    UsersList.push(userObj);
}

module.exports = { UsersList, addUserInStore }