const { INVITE, LAWYER, JOB, BAR, sequelizer, RATE } = require("../utils/initializeDatabase.ts");
const { rateSchema } = require("../models/rate.ts");
const { inviteSchema } = require("../models/invitation.ts");
const { lawyerSchema } = require("../models/lawyer.ts");
var bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.REFRESHTOKEN;


const rejectInvitation = (async (params: any) => {
    return INVITE.destroy({
        where: {
            invitation_id: params.invitation_id,
            invited: params.username
        },
    }).then((val: any) => {
        if (val.success == true) {
            return { success: true, result: "Cooperation invitation has been rejected successfully" }
        }
        else {
            return { success: false, result: "A problem was encountered" }
        }
    }).catch((error: any) => {
        return { success: false, result: error }
    });
});

const acceptInvitation = (async (params: any) => {
    const username = params.username;
    const invitation_id = params.invitation_id;

    return INVITE.findOne({
        where: { invitation_id: invitation_id }
    }).then((val: any) => {
        if (!val) {
            return { success: false, result: "Either an invitation of such kind wasn't defined or the invited lawyer took on another job!" }
        }
        else {
            const invitation = val;
            const invited = invitation.invited;
            const job_id = invitation.job_id;
            if (invited != username) {
                return { success: false, result: "The invitation wasn't directed to the current user!" }
            }
            else {
                return LAWYER.update({
                    state: false
                }, {
                    where: {
                        username: invited
                    }
                })
                    .then((val: any) => {
                        if (!val) {
                            return { success: false, result: "Couldn't set the invited user's state accordingly" }
                        }
                        else {
                            return JOB.update({
                                assistant_lawyer: username
                            }, { where: { job_id: job_id } })
                                .then((returnval: any) => {
                                    if (!returnval) {
                                        (async () => {
                                            await LAWYER.update({
                                                state: true
                                            }, {
                                                where: {
                                                    username: invited
                                                }
                                            })
                                        })();
                                        return { success: false, result: "Couldn't update the job properties accordingly" };
                                    }
                                    else {
                                        return { success: true, result: "Invitation gladly accepted. The lawyer won't be available for sometime!" }
                                    }
                                })
                                .catch((error: any) => {
                                    (async () => {
                                        await LAWYER.update({
                                            state: true
                                        }, {
                                            where: {
                                                username: invited
                                            }
                                        })
                                    })();
                                    return { success: false, result: error };
                                })
                        }
                    })
                    .catch((error: any) => {
                        return { success: false, result: error };
                    })
            }

        }
    })
        .catch((error: any) => {
            return { success: false, result: error };
        })
});


const availableLawyers = async (params: any) => {
    const bar_id = params.bar_id;
    BAR.findAll({
        attributes: ['name', 'surname', 'email', 'average_rating'],
        include: [
            {
                model: LAWYER,
                include: [
                    {
                        model: RATE,
                        attributes: [[sequelizer.fn('AVG', sequelizer.col('rating')), 'average_rating']],
                        group: 'rated'
                    }
                ],
                where: {
                    state: true,
                },
            },
        ],
        where: { bar_id: bar_id },
        order: [['average_rating', 'DESC']]
    }).then((result: any) => {
        return { success: true, result: result };
    }).catch((error: any) => {
        return { success: false, result: error };
    })
};


const getUserProfile = async (params: any) => {
    const username = params.username;
    return LAWYER.findOne({
        where: {
            username: username,
        },
    }).then((result: any) => {
        return { success: true, result: result };
    })
        .catch((error: any) => {
            return { success: false, result: error };
        })
};

const loginUser = async (data: any) => {
    return LAWYER.findOne({
        where: { username: data.username },
    }).then((result: any) => {
        if (!result) {
            return {
                success: false,
                result: "Failed to find a user with the given username!",
            };
        }
        else {
            const pass = data.password;
            const truePass = result.password;
            console.log("True Password:", truePass);
            console.log("encrypted Result:", pass);
            const resultPasswordCheck = bcrypt
                .compare(pass, truePass)
                .then((match: any) => {
                    console.log("True Password:", truePass);
                    console.log("Match Result:", match);
                    if (!match) {
                        return { success: false, result: "Check the inserted password!" };
                    } else {
                        return { success: true, result: "Successfully logged in" };
                    }
                });
            return resultPasswordCheck
        }
    })
        .then((val: any) => {
            return val;
        })
        .catch((error: any) => {
            return { success: false, result: error };
        });
};

const rateUser = async (params: any) => {
    const rater = params.username;
    const rated = params.rated;
    const rating = params.rating;
    rateSchema.safeParse({
        rater: rater,
        rated: rated,
        rating: parseInt(rating),
    });
    return RATE.create({
        rater: rater,
        rated: rated,
        rating: rating,
    }).then((val: any) => {
        return { success: true, result: val };
    })
        .catch((error: any) => {
            return { success: false, result: error };
        })
};



const registerBar = async (data: any) => {
    const username = data.username;
    const bar_id = data.bar_id;
    return LAWYER.update(
        { bar_id: bar_id },
        { where: { username: username } }
    ).then((val: any) => {
        return { success: true, result: val };
    })
        .catch((error: any) => {
            return { success: false, result: error };
        })
};


const registerUser = function (reqBody: any) {
    const dataBody = reqBody;
    var refreshtokenUser = jwt.sign({ username: dataBody.username }, jwtKey);
    lawyerSchema.safeParse(dataBody);
    var hashedPassword = bcrypt.hashSync(dataBody.password, 10);
    return LAWYER.create({
        username: dataBody.username,
        password: hashedPassword,
        name: dataBody.name,
        surname: dataBody.surname,
        birth_date: dataBody.birth_date,
        email: dataBody.email,
        address: dataBody.address,
        latitude: dataBody.latitude,
        longitude: dataBody.longitude,
        bar_id: null,
        partner: null,
        state: true,
        verified: false
    }).then((val: any) => {
        return { success: true, result: "User registered successfully", refreshToken: refreshtokenUser };
    }).catch((error: any) => {
        return { success: false, result: error };
    })
};


const sendInvitation = async (params: any) => {
    try {
        const inviter = params.inviter;
        const invited = params.invited;
        const job_id = params.job_id;
        inviteSchema.parse({
            inviter: inviter,
            invited: invited,
            job_id: job_id,
        });
        const verificationCheckInviter = await LAWYER.findOne({
            attributes: ['verified', 'state'],
            where: { username: inviter }
        });
        const verificationCheckInvited = await LAWYER.findOne({
            attributes: ['verified', 'state'],
            where: { username: invited }
        });
        const work = await JOB.findOne({
            where: {
                job_id: job_id,
                job_ended: false
            }
        })
        if (!work) {
            return { success: false, result: "Job with such ID doesn't exist!" };
        }
        else {
            if (work.principal_lawyer != inviter) {
                return { success: false, result: "This job wasn't assigned to the current user!" };
            }
        }

        if (verificationCheckInvited.verified == true && verificationCheckInvited.state == true && verificationCheckInviter.verified == true && verificationCheckInviter.state == false) {
            await INVITE.create({
                inviter: inviter,
                invited: invited,
                job_id: job_id,
            });
            return { success: true, result: "Invitation sent successfully!" };
        }
        else {
            return { success: false, result: "Both users should be verified!" };
        }

    } catch (error) {
        return { success: false, result: error };
    }
};


const sendWithdrawRequest = (async (params: any) => {
    const jobConfirmation = await JOB.findOne({
        where: { assistant_lawyer: params.username, job_id: params.job_id }
    });
    if (!jobConfirmation) {
        return { success: false, result: "Data mismatch: Please check the job_id" }
    }
    else {
        return JOB.update({
            withdrawRequest: true
        }, {
            where: {
                job_id: params.job_id
            }
        }
        ).then((val: any) => {
            if (!val) {
                return { success: false, result: "Error encountered. Please try again" }
            }
            else {
                return { success: true, result: "Withdraw request has been sent successfully!" }
            }
        })
            .catch((error: any) => {
                return { success: false, result: error }
            })
    }
})


const withdrawResponse = (async (params: any) => {
    const job_check = await (JOB.findOne({
        where: {
            principal_lawyer: params.username,
            job_id: params.job_id
        }
    }));
    if (!job_check) {
        return { success: false, result: "Data Mismatch: Please check the data correctness" };
    }
    else {
        const assistLawyer = job_check.assistant_lawyer;
        if (!assistLawyer) {
            return { success: false, result: "No withdraw request exists!" };
        }
        if (params.response == true) {
            return job_check.update({
                withdrawRequest: false,
                assistant_lawyer: null
            })
                .then((val: any) => {
                    if (!val) {
                        return { success: false, result: "Error encountered: Please try the service later again" };
                    }
                    else {
                        return LAWYER.update({ state: true }, { where: { username: assistLawyer } }).then((val: any) => {
                            if (!val) {
                                return { success: false, result: "Error encountered: Please try the service later again" };
                            }
                            else {
                                return { success: true, result: "The withdraw request has been responded to successfully!" };
                            }
                        }).catch((error: any) => {
                            return { success: false, result: error }
                        })

                    }
                })
                .catch((error: any) => {
                    return { success: false, result: error }
                })
        }
        else {
            return job_check.update({
                withdrawRequest: false,
            })
                .then((val: any) => {
                    if (!val) {
                        return { success: false, result: "Error encountered: Please try the service later again" };
                    }
                    else {
                        return { success: true, result: "The withdraw request has been responded to successfully!" };
                    }
                })
                .catch((error: any) => {
                    return { success: false, result: error }
                })

        }
    }

});

export { getUserProfile, availableLawyers, acceptInvitation, loginUser, rateUser, registerBar, registerUser, sendInvitation, sendWithdrawRequest, withdrawResponse, rejectInvitation };