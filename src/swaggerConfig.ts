const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version:'1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    // servers: ['http://127.0.0.1:5000'],
  },
  apis: ['**/*.ts'], 
};

const specs = swaggerJsdoc(options);

export default specs;