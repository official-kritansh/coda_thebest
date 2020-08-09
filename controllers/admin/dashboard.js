var Hacker=require("../../models/hacker");



module.exports={
    f1aDash(req,res){
        Hacker.find({},(err,hackers)=>{
            if(err){
                console.log(err);
                req.flash("error","Database Error");
                res.redirect("back");
            }else{
                res.render("admin/index",{hackers:hackers});
            }
        })
    },

    f2aDash(req,res){
        var hacker={
            name:req.body.name,
            challangesSolved:req.body.solved,
            expertiseLevel:req.body.level,
            expertIn:{
                dataStructure:req.body.ds,
                java:req.body.java,
                c:req.body.c,
                python:req.body.python
            }
        }
        Hacker.create(hacker,(err,h)=>{
            if(err){
                console.log(err);
                req.flash("error","Database Error");
                res.redirect("back");
            }else{
                req.flash("success","Added Successfuly");
                res.redirect("/admin");
            }
        })
    },

    f3aDash(req,res){
        Hacker.findOne({hid:req.params.hid},(err,hacker)=>{
            if(err){
                console.log(err);
                req.flash("error","Database Error");
                res.redirect("back");
            }else{
                if(hacker){
                    hacker.name=req.body.name;
                    hacker.challangesSolved=req.body.solved;
                    hacker.expertiseLevel=req.body.level;
                    hacker.expertIn.dataStructure=req.body.ds;
                    hacker.expertIn.java=req.body.java;
                    hacker.expertIn.c=req.body.c;
                    hacker.expertIn.python=req.body.python;
                    hacker.save((err)=>{
                        if(err){
                            console.log(err);
                            req.flash("error","Database Error");
                            res.redirect("back");
                        }else{
                            req.flash("success","Details saved");
                            res.redirect("back");
                        }
                    })
                }else{
                    req.flash("error","No Such Hacker")
                    res.redirect("back");
                }
            }
        })
    },

    f4aDash(req,res){
        Hacker.deleteOne({hid:req.params.hid},(err)=>{
            if(err){
                console.log(err);
                req.flash("error","Database Error");
                res.redirect("back");
            }else{
                req.flash("success","Deleted");
                res.redirect("back");
            }
        })
    }
}