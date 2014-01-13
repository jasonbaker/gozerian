import webapp2

index_text = open('static/index.html').read();

class MainPage(webapp2.RequestHandler):

  def get(self):
    self.response.write(index_text)
    self.response.headers['Cache-Control'] = 'max-age: 86400'

app = webapp2.WSGIApplication([('/.*', MainPage)],
                              debug=True)
