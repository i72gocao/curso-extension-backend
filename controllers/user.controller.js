exports.allAccess = (req,res) => {
    res.status(200).send("Public content.")
}

exports.userBoard = (req,res) => {
    res.status(200).send("User Content")
}

exports.adminBoard = (req,res) => {
    res.status(200).send("Admin Content.");
}

exports.moderadorBoard = (req,res) => {
    res.status(200).send("Moderador Content.")
}