const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const MEASUREMENT_ID = process.env.MEASUREMENT_ID;
const API_SECRET = process.env.API_SECRET;

app.post("/purchase", async (req, res) => {
  const { client_id, value, currency, transaction_id, items } = req.body;

  try {
    await axios.post(
      \`https://www.google-analytics.com/mp/collect?measurement_id=\${MEASUREMENT_ID}&api_secret=\${API_SECRET}\`,
      {
        client_id,
        events: [
          {
            name: "purchase",
            params: {
              transaction_id,
              value,
              currency,
              items,
            },
          },
        ],
      }
    );
    res.status(200).send("Evento enviado com sucesso");
  } catch (err) {
    res.status(500).send("Erro ao enviar evento");
  }
});

app.get("/", (req, res) => {
  res.send("Servidor GA4 Measurement Protocol ativo");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor iniciado na porta " + PORT);
});