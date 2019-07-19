export default function handle(req, res) {
    // tslint:disable-next-line: no-console
    console.log(req.body); // The request body
    // tslint:disable-next-line: no-console
    console.log(req.query); // The url querystring
    // tslint:disable-next-line: no-console
    console.log(req.cookies); // The passed cookies
    res.end('Hello World');
  }
  