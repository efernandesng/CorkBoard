export default function handle(req, res) {
    console.log(req.body); // The request body
    console.log(req.query); // The url querystring
    console.log(req.cookies); // The passed cookies
    res.end('Hello World');
  }
  