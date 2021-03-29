const Team = require('../models/team');
const wrapAsync = require('../utilities/wrapAsync');

module.exports.index = wrapAsync(async(req, res) => {
    const teams = await Team.find();
    res.render('teams/index', { teams })
});

module.exports.renderNewForm = (req, res) => {
    res.render('teams/new')
};

module.exports.showTeam = wrapAsync(async(req, res) => {
    const team = await Team.findById(req.params.id).populate("owner");
    if (!team) {
        req.flash("error", "Sorry, could not find a team.");
        return res.redirect('/teams')
    }
    res.render('teams/show', { team })
});

module.exports.createTeam = wrapAsync(async(req, res) => {
    console.log(req.user)
    const newTeam = new Team(req.body.team);
    newTeam.owner = req.user._id;
    const team = await newTeam.save();
    req.flash("success", "New team added.");
    res.redirect(`/teams/${team._id}`)
})