const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Harpeon Summer 2023 Lawyer App Backend Project",
            description: "This project is submitted as part of the deliverables of the aforementioned internship program",
            contact: {
                name: "Check Harpeon's website for contact info"
            },
            servers: [{
                url: '/docs',
                description: 'Development server',
            }]
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security:
        {
            bearerAuth: []
        }
    },
    apis: ['./src/routes/*.route.ts']
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs }