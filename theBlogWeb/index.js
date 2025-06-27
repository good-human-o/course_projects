import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port  = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Blog posts will be stored here
let blogPosts = [];

app.get('/', (req, res) => {
    res.render('index.ejs', { posts: blogPosts }); // ✅ now EJS gets "posts"
});

app.post('/write', (req, res) => {
    res.render('write.ejs');
});

app.post('/submit', (req, res) => {
    const date = new Date(); // ⏰ get current date

    // ✅ Create the post object from the form
    const post = {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        id : blogPosts.length, // Assuming we don't have any existing posts yet
        date: date.toLocaleDateString() // You can format this better if you want
    };

    blogPosts.push(post); // ✅ add it to array

    res.redirect('/'); // ✅ redirect to home page
});

app.get('/post/:id', (req, res) => {
  const id = req.params.id;
  const post = blogPosts[id];  // ✅ just call it 'post' for clarity

  if (post) {
      res.render('post.ejs', { post: post });
  } else {
      res.status(404).send("Post not found");
  }
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const post = blogPosts[id];  // ✅ just call it 'post' for clarity

  if (post) {
      res.render('edit.ejs', { post: post });
  } else {
      res.status(404).send("Post not found");
  }
});

app.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const postIndex = blogPosts.findIndex(post => post.id === parseInt(id));

  if (postIndex!== -1) {
    const updatedPost = {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      content: req.body.content,
      id: parseInt(id),
      date: blogPosts[postIndex].date
    };
    blogPosts[postIndex] = updatedPost;
    res.redirect('/');
    } else {
    res.status(404).send("Post not found");
    }
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  if (blogPosts[id]) {
      blogPosts.splice(id, 1);
      // Optional: reassign IDs
      blogPosts = blogPosts.map((post, index) => ({ ...post, id: index }));
      res.redirect('/');
  } else {
      res.status(404).send("Post not found");
  }
});


app.listen(port, (req,) => {
    console.log(`Server running on port ${port}`);
});
