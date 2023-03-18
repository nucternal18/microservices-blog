import React from "react";
import axios from "axios";

const CreatePost = () => {
  const [postTitle, setPostTitle] = React.useState<string>("");

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
        const res = await axios.post("http://posts.com/create-posts", {
          title: postTitle,
        });
        if (res.status !== 201) throw new Error("Something went wrong");
        setPostTitle("");
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
        console.error(error);
      }
    },
    [postTitle]
  );
  return (
    <form className="flex  flex-col w-full gap-2" onSubmit={handleSubmit}>
      <div className="form-control w-full ">
        <label htmlFor="title" className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          id="title"
          type="text"
          value={postTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPostTitle(e.target.value)
          }
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
