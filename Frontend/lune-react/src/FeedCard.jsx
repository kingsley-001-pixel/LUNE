import React from "react";
import { FaHeart, FaComment } from "react-icons/fa";

function FeedCard({ post, refresh }) {
  const token = localStorage.getItem("token");

  const likePost = async () => {
    await fetch(
      `https://lune-backend-eclm.onrender.com/api/v1/feed/like/${post._id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    refresh();
  };

  return (
    <div className="h-screen snap-start flex flex-col justify-center items-center p-4">

      {/* MOVIE BACKDROP STYLE */}
      <div className="relative w-full max-w-md bg-gray-900 rounded-2xl overflow-hidden">

        <img
          src={`https://image.tmdb.org/t/p/w500${post.moviePoster}`}
          className="w-full h-80 object-cover opacity-60"
        />

        {/* OVERLAY */}
        <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black">

          <h2 className="text-lg font-bold">
            {post.movieTitle}
          </h2>

          <p className="text-sm text-gray-300">
            {post.comment}
          </p>

          <div className="flex items-center gap-4 mt-3">

            <button onClick={likePost} className="flex items-center gap-1">
              <FaHeart /> {post.likes.length}
            </button>

            <button className="flex items-center gap-1">
              <FaComment /> {post.comments.length}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FeedCard;