import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import NavMenu from "./NavMenu";

function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchFeed = async () => {
    const res = await fetch(
      "http://localhost:4000/api/v1/feed"
    );
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchFeed();
  }, []);


  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white">

      <NavMenu />

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-xl font-semibold">No posts yet</h2>
      <p className="text-gray-400 mt-2">
        Be the first to share something on LUNE 🎬
      </p>
    </div>
      ) : (
        posts.map((post) => (
          <FeedCard key={post._id} post={post} refresh={fetchFeed} />
        ))
      )}

    </div>
  );
}

export default Feed;