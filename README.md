pb-logs-firebase
================

Use Firebase to store and track conversation logs between your Pandorabot and your users. Based on [this blog post](http://blog.pandorabots.com).

### Usage

```bash
git clone https://github.com/djfdev/pb-logs-firebase.git
cd pb-logs-firebase
bower install
```

Make sure to include your root Firebase URL in both `js/user.js` and `js/log.js`:

```javascript
...
var root = "https://your-firebase.firebase.io.com/";
...
```

You will also need to provide your Pandorabots API credentials in `js/user.js`:

```javascript
...
var pb = new Pandorabot("aiaas.pandorabots.com", APP_ID, BOTNAME, USER_KEY);
...
```

Note: `talk.js` requires cookies, so you must enable file cookies in your browser or use a server.
