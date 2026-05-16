const swaggerUi=require("swagger-ui-express");

app.use("/docs",swaggerUi.serve,
 swaggerUi.setup({
   openapi:"3.0.0",
   info:{title:"Senior API"}
 })
);