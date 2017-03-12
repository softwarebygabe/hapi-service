const server = require("../server.js").createServer(8080)

describe('example', function(){

  it("responds with status code 200 and example text", function(done) {
    var options = {
      method: "GET",
      url: "/hapi-service/example"
    };

    server.inject(options, function(response) {
      expect(response.statusCode).toBe(200);
      expect(response.result).toBe('This is an example!');
      done();
    });
  });
})
