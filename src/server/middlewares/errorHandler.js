export default function errorHandler(app) {
  app.use((err, req, res, next) => {
    // Error handling
    res.status(403);
    res.send('Error!');
  });
}
