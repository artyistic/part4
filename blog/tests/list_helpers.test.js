const listHelper = require("../utils/list_helper.js");
const testBlogs = require("./testBlogs.js");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(testBlogs.listWithOneBlog.array);
    expect(result).toBe(5);
  });

  test("should also work with more blogs", () => {
    const result = listHelper.totalLikes(testBlogs.listWithMoreBlog.array);
    expect(result).toBe(36);
  });
});

describe("max likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.favBlog(testBlogs.listWithOneBlog.array);
    expect(result).toEqual(testBlogs.listWithOneBlog.fav);
  });

  test("should also work with more blogs", () => {
    const result = listHelper.favBlog(testBlogs.listWithMoreBlog.array);
    expect(result).toEqual(testBlogs.listWithMoreBlog.fav);
  });
});

describe("most Blogs", () => {
  test("when list has only one blog, most blog is the author with one blogs", () => {
    const result = listHelper.mostBlogs(testBlogs.listWithOneBlog.array);
    expect(result).toEqual(testBlogs.listWithOneBlog.mostBlogs);
  });

  test("should also work with more blogs", () => {
    const result = listHelper.mostBlogs(testBlogs.listWithMoreBlog.array);
    expect(result).toEqual(testBlogs.listWithMoreBlog.mostBlogs);
  });
});

describe("most Likes", () => {
  test("when list has only one blog, most blog is the author with one blogs", () => {
    const result = listHelper.mostLikes(testBlogs.listWithOneBlog.array);
    expect(result).toEqual(testBlogs.listWithOneBlog.mostLikes);
  });

  test("should also work with more blogs", () => {
    const result = listHelper.mostLikes(testBlogs.listWithMoreBlog.array);
    expect(result).toEqual(testBlogs.listWithMoreBlog.mostLikes);
  });
});
