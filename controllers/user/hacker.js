var Hacker = require("../../models/hacker");

module.exports = {
    f1uHacker(req, res) {
        Hacker.findOne({}, (err, hacker) => {
            if (err) {
                console.log(err);
                req.flash("error", "Database Error");
                res.redirect("back");
            } else {
                if (hacker) {
                    if (req.signedCookies['voted']) {
                        var voted=req.signedCookies.voted;
                        var done=0;
                        if(voted.includes(hacker.hid)){
                            done=1;
                           
                        }
                        res.render("user/profile",{h:hacker,done:done});
                    } else {
                        var voted = [];
                        JSON.stringify(voted);
                        // console.log(cart);
                        res.cookie('voted', voted, { maxAge: 24 * 60 * 60 * 1000 * 365, signed: true });
                        res.render("user/profile",{h:hacker,done:0});
                    }

                } else {
                    req.flash("error", "No Such Hacker");
                    res.redirect("back");
                }
            }
        })
    },

    f2uHacker(req, res) {
        Hacker.findOne({}, (err, hacker) => {
            if (err) {
                console.log(err);
                req.flash("error", "Database Error");
                res.redirect("back");
            } else {
                if (hacker) {
                    if (req.signedCookies['voted']) {
                        var voted=req.signedCookies.voted;
                        // var done=0;
                        if(voted.includes(hacker.hid)){
                            req.flash("error","Already Voted");
                            res.redirect("back");
                           
                        }else{
                            hacker.votes+=1;
                            hacker.save();
                            voted.push(hacker.hid);
                            JSON.stringify(voted);
                            res.cookie('voted', voted, { maxAge: 24 * 60 * 60 * 1000 * 365, signed: true });
                            req.flash("success","Successfully Voted");
                            res.redirect("back");

                        }

                    } else {
                        var voted = [];
                        voted.push(hacker.hid);
                        JSON.stringify(voted);
                        hacker.votes+=1;
                        hacker.save();
                        // console.log(cart);
                        res.cookie('voted', voted, { maxAge: 24 * 60 * 60 * 1000 * 365, signed: true });
                        req.flash("success","Successfully Voted");
                        res.redirect("back");
                    }

                } else {
                    req.flash("error", "No Such Hacker");
                    res.redirect("back");
                }
            }
        })
    }
}