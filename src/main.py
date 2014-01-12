import webapp2

index_text = open('static/index.html').read();

class MainPage(webapp2.RequestHandler):

  def get(self):
    self.response.write(index_text)

app = webapp2.WSGIApplication([('/.*', MainPage)],
                              debug=True)
