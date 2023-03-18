import React from "react";
import CommentList from "./CommentList";
import CreateComment from "./CreateComment";
import { PostProps } from "./Post";

const PostItem = ({
  post,
  handleDelete,
}: {
  post: PostProps;
  handleDelete(id: string): void;
}) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button
            type="button"
            className="btn btn-square btn-sm"
            onClick={() => handleDelete(post.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-700 font-serif font-medium text-lg">
          {post.title}
        </p>
        <div className="divider"></div>
        <h3>Comments</h3>
        <CommentList comments={post.comments} />
        <div className="divider"></div>
        <div className="mt-1">
          <CreateComment postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
