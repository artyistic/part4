const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, c) => a + c.likes, 0);
};

const favBlog = (blogs) => {
  return blogs.reduce((max, curr) => (max.likes > curr.likes ? max : curr));
};

const mostBlogs = (blogs) => {
  let maxBlogs = 1;
  let mostBlogs = blogs[0].author;
  const map = new Map();
  blogs.map((blog) => {
    if (map.has(blog.author)) {
      let currBlogs = map.get(blog.author);
      currBlogs++;
      map.set(blog.author, currBlogs);
      if (currBlogs > maxBlogs) {
        mostBlogs = blog.author;
        maxBlogs = currBlogs;
      }
    } else {
      map.set(blog.author, 1);
    }
  });

  return {
    author: mostBlogs,
    blogs: maxBlogs,
  };
};

const mostLikes = (blogs) => {
  let maxLikes = blogs[0].likes;
  let mostLikes = blogs[0].author;
  const map = new Map();
  blogs.map((blog) => {
    if (map.has(blog.author)) {
      let currLikes = map.get(blog.author);
      currLikes += blog.likes;
      map.set(blog.author, currLikes);
      if (currLikes > maxLikes) {
        mostLikes = blog.author;
        maxLikes = currLikes;
      }
    } else {
      map.set(blog.author, blog.likes);
    }
  });

  return {
    author: mostLikes,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favBlog,
  mostBlogs,
  mostLikes,
};
