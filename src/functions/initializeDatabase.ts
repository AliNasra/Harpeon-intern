import { DataTypes } from "sequelize";
const dotenv = require('dotenv');
const Sequelize = require('sequelize');
dotenv.config();
const sequelizer = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: 'postgres'
    }
);

const CITY = sequelizer.define("CITY", {
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    city_name: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
}, {
    tableName: "CITY"
});

const BAR = sequelizer.define("BAR", {
    bar_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bar_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: "BAR"
});

const LAWYER = sequelizer.define("LAWYER", {
    username: {
        type: DataTypes.STRING(250),
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    bar_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    tableName: "LAWYER"
});

const RATE = sequelizer.define("RATE", {
    rater: {
        type: DataTypes.STRING(250),
        primaryKey: true
    },
    rated: {
        type: DataTypes.STRING(250),
        primaryKey: true
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isratingCorrect: function () {
                if (RATE.rating > 10) {
                    throw new Error('You can give a rating on scale of 10')
                }
            }
        }
    }
}, {
    tableName: "RATE"
});

const JOB = sequelizer.define("JOB", {
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    principal_lawyer: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    assistant_lawyer: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    withdrawRequest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    ,
    job_ended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}
    , {
        tableName: "JOB"
    });

const INVITE = sequelizer.define("INVITE", {
    invitation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    inviter: {
        type: DataTypes.STRING(250)
    },
    invited: {
        type: DataTypes.STRING(250)
    },
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "INVITE"
});



(async () => {
    await BAR.hasMany(LAWYER, {
        foreignKey: "bar_id",
        sourceKey: "bar_id"
    });
})();
(async () => {
    await LAWYER.belongsTo(BAR
        , { targetKey: 'bar_id', foreignKey: 'bar_id' });
})();

(async () => {
    await CITY.hasMany(BAR, {
        foreignKey: "city_id",
        sourceKey: "city_id"
    });
})();

(async () => {
    await BAR.belongsTo(CITY
        , { targetKey: 'city_id', foreignKey: 'city_id' });
})();

(async () => {
    await LAWYER.hasMany(RATE, {
        foreignKey: "rater",
        sourceKey: "username"
    });
})();


(async () => {
    await LAWYER.hasMany(RATE, {
        foreignKey: "rated",
        sourceKey: "username"
    });
})();

(async () => {
    await RATE.belongsTo(LAWYER
        , { targetKey: 'username', foreignKey: 'rated' });
})();

(async () => {
    await RATE.belongsTo(LAWYER
        , { targetKey: 'username', foreignKey: 'rater' });
})();

(async () => {
    await LAWYER.hasMany(INVITE, {
        foreignKey: "inviter",
        sourceKey: "username"
    });
})();

(async () => {
    await LAWYER.hasMany(INVITE, {
        foreignKey: "invited",
        sourceKey: "username"
    });
})();

(async () => {
    await INVITE.belongsTo(LAWYER
        , { targetKey: 'username', foreignKey: 'invited' });
})();

(async () => {
    await INVITE.belongsTo(LAWYER
        , { targetKey: 'username', foreignKey: 'inviter' });
})();

(async () => {
    await JOB.hasMany(INVITE, {
        foreignKey: "job_id",
        sourceKey: "job_id"
    });
})();

(async () => {
    await INVITE.belongsTo(JOB
        , { targetKey: 'job_id', foreignKey: 'job_id' });
})();

(async () => {
    await LAWYER.hasOne(JOB, {
        foreignKey: "principal_lawyer",
        sourceKey: "username"
    });
})();

(async () => {
    await LAWYER.hasOne(JOB, {
        foreignKey: "assistant_lawyer",
        sourceKey: "username"
    });
})();

(async () => {
    await JOB.belongsTo(LAWYER
        , { targetKey: 'username', foreignKey: 'principal_lawyer' });
})();

(async () => {
    await JOB.belongsTo(LAWYER
        , { targetKey: 'username', foreignKey: 'assistant_lawyer' });
})();

(async () => {
    sequelizer.sync()
})();
module.exports = { sequelizer, CITY, BAR, LAWYER, RATE, INVITE, JOB };