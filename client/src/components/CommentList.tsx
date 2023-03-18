type Props = {
  id: string;
  content: string;
  status?: string;
};

const CommentList = ({ comments }: { comments: Props[] }) => {
  return (
    <ul className="flex flex-col gap-2">
      {comments?.map((comment) => {
        let content;

        if (comment.status === "pending") {
          content = "This comment is awaiting moderation";
        }
        if(comment.status === "rejected") {
          content = "This comment has been rejected";
        }
        if(comment.status === "approved") {
          content = comment.content;
        }
       return ( <li key={`${comment.id}`} className="text-lg font-serif font-medium">
          <span>{content}</span>
        </li>)
      })}
    </ul>
  );
};

export default CommentList;
