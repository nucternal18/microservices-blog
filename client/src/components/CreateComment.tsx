import React from "react";
import axios from "axios";

const CreateComment = ({ postId }: { postId: string}) => {
 const [postComment, setPostComment] = React.useState<string>("");

 const handleSubmit = React.useCallback(
   async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     try {
       const res = await axios.post(`http://posts.com/posts/${postId}/comments`, {
         content: postComment,
       });
       if (res.status !== 201) throw new Error("Something went wrong");
       setPostComment("");
     } catch (error) {
       if (error instanceof Error) console.log(error.message);
       console.error(error);
     }
   },
   [postComment]
 );
 return (
   <form className="flex  flex-col w-full gap-2" onSubmit={handleSubmit}>
     <div className="form-control w-full ">
       <label htmlFor="comment" className="label">
         <span className="label-text">Comment</span>
       </label>
       <input
         id="comment"
         type="text"
         value={postComment}
         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
           setPostComment(e.target.value)
         }
         placeholder="Type here"
         className="input input-bordered w-full"
       />
     </div>
     <button className="btn btn-primary" type="submit">
       Add Comment
     </button>
   </form>
 );
};

export default CreateComment;
