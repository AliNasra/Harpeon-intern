const { BAR, LAWYER, sequelizer ,RATE} = require("./initializeDatabase.ts");

const availableLawyers = async (params: any) => {
      const bar_id = params.bar_id;
      BAR.findAll({
        attributes:['name','surname','email','average_rating'],
        include: [
          {
            model: LAWYER,
            include:[
              {
                model:RATE,
                attributes:[[sequelizer.fn('AVG',sequelizer.col('rating')),'average_rating']],
                group: 'rated'
              }
            ],
            where: {
              state: true,
            },
          },
        ],
        where: { bar_id: bar_id },
        order: [['average_rating','DESC']]
      }).then((result:any)=>{
        return {success: true,result:result};
      }).catch((error:any)=>{
        return { success: false, result: error };
      })
  };
export{availableLawyers};