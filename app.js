import express from "express";
const app = express();
const port = 3000;

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;

  res.json({
    id: productId,
    name: `${productId} name`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
