const Team = require('../models/team');
const wrapAsync = require('../utilities/wrapAsync');
const { cloudinary } = require('../cloudinary')

module.exports.index = wrapAsync(async(req, res) => {
    const teams = await Team.find();
    res.render('teams/index', { teams })
});

module.exports.renderNewForm = (req, res) => {
    res.render('teams/new')
};

module.exports.showTeam = wrapAsync(async(req, res) => {
    const team = await Team.findById(req.params.id).populate({
        path: "comments",
        populate: {
            path: "owner"
        }
    }).populate("owner");
    if (!team) {
        req.flash("error", "Sorry, could not find that team.");
        return res.redirect('/teams')
    }
    res.render('teams/show', { team })
});

module.exports.createTeam = wrapAsync(async(req, res) => {
    const newTeam = new Team(req.body.team);
    newTeam.logo = { url: req.file.path, filename: req.file.filename }
    newTeam.owner = req.user._id;
    const team = await newTeam.save();
    req.flash("success", "New team added.");
    res.redirect(`/teams/${team._id}`)
});

module.exports.renderEditForm = wrapAsync(async(req, res) => {
    const team = await Team.findById(req.params.id);
    res.render('teams/edit', { team })
});

module.exports.updateTeam = wrapAsync(async(req, res) => {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, {...req.body.team});
    if (req.file) {
        await cloudinary.uploader.destroy(team.logo.filename)
        team.logo = { url: req.file.path, filename: req.file.filename }
        await team.save();
    }
    req.flash("success", "Team profile updated!")
    res.redirect(`/teams/${team._id}`)
});

module.exports.destroyTeam = wrapAsync(async(req, res) => {
    await Team.findByIdAndDelete(req.params.id);
    req.flash("success", "Team profile deleted");
    res.redirect('/teams');
})