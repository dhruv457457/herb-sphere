import React, { useState, useEffect } from "react";
import { auth, firestore } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

const CommunityForum = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newReply, setNewReply] = useState("");
  const [activePostId, setActivePostId] = useState(null);

  useEffect(() => {
    // Fetch authenticated user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Fetch posts from Firestore
    const q = query(collection(firestore, "posts"), orderBy("createdAt", "desc"));
    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => {
      unsubscribe();
      unsubscribePosts();
    };
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      try {
        await addDoc(collection(firestore, "posts"), {
          content: newPost,
          userId: user.uid,
          userName: user.displayName || user.email || "Anonymous",
          createdAt: serverTimestamp(),
          replies: [],
        });
        setNewPost("");
      } catch (error) {
        console.error("Error adding post: ", error);
      }
    }
  };

  const handleReplySubmit = async (postId) => {
    if (newReply.trim()) {
      const postRef = doc(firestore, "posts", postId);
      const post = posts.find((p) => p.id === postId);

      const updatedReplies = [
        ...post.replies,
        {
          replyContent: newReply,
          userId: user.uid,
          userName: user.displayName || user.email || "Anonymous",
          createdAt: new Date().toISOString(),
        },
      ];

      try {
        await updateDoc(postRef, { replies: updatedReplies });
        setNewReply("");
      } catch (error) {
        console.error("Error adding reply: ", error);
      }
    }
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Community Forum</h1>

      {user ? (
        <form onSubmit={handlePostSubmit} className="mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Ask a question or share a thought..."
            className="w-full p-4 border rounded-lg mb-4 focus:outline-none focus:ring focus:border-green-500"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
          >
            Post
          </button>
        </form>
      ) : (
        <p className="text-center text-red-500 mb-6">Please log in to post or reply.</p>
      )}

      <div>
        {posts.map((post) => (
          <div key={post.id} className="mb-6 p-6 bg-white shadow-md rounded-lg">
            <p className="font-semibold text-lg text-green-700">{post.userName}</p>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <button
              className="text-blue-600 hover:underline mb-4"
              onClick={() => setActivePostId(post.id === activePostId ? null : post.id)}
            >
              {activePostId === post.id ? "Hide Replies" : "View Replies"}
            </button>

            {activePostId === post.id && (
              <div className="mt-4">
                {post.replies.length > 0 ? (
                  post.replies.map((reply, index) => (
                    <div key={index} className="ml-6 bg-gray-100 p-3 rounded-lg mb-2">
                      <p className="font-semibold text-sm text-gray-800">{reply.userName}</p>
                      <p className="text-gray-600">{reply.replyContent}</p>
                    </div>
                  ))
                ) : (
                  <p className="ml-6 text-gray-500">No replies yet.</p>
                )}

                {user && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleReplySubmit(post.id);
                    }}
                    className="mt-4"
                  >
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="Reply to this post..."
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-3 hover:bg-blue-700"
                    >
                      Reply
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
