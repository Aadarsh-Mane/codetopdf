export const generateText = async (req, res) => {
  const { prompt } = req.body;
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDkJjdP4M_w7kTIaLHFyMuM8SuWZhnuuuc"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  res.json({ result: result.response.text() });
};
app.get("/dj", generateText);
app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});
