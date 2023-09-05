import React, { useEffect } from "react";

function Home({ setLoginDataFromLocalStorage }) {
  useEffect(() => {
    setLoginDataFromLocalStorage();
  }, []);
  return (
    <section className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to our blogging platform</h1>
        <p className="lead">
          A digital haven for passionate writers, avid readers, and thoughtful
          commentators.
        </p>
        <hr className="my-4" />
        <p>
          In this vibrant online community, we invite you to explore a world of
          ideas, stories, and perspectives that span the spectrum of human
          experiences. Whether you're a seasoned author, an aspiring blogger, or
          simply curious to discover new voices, you'll find a welcoming space
          here.
        </p>
        <p>
          Our platform offers a seamless user experience, with intuitive login
          and registration screens that make joining our community a breeze.
          Once you're in, the possibilities are endless. Dive into our Home
          Screen, where a captivating grid of blogs awaits you, each a unique
          window into the minds of our talented contributors.
        </p>
        <p>
          Are you drawn to a particular blog? Click through to the Blog Detail
          page, where you can immerse yourself in the content and engage with
          the community. Share your thoughts, spark discussions, and connect
          with fellow enthusiasts. Feel the power of words and ideas as they
          come to life through the art of blogging.
        </p>
        <p>
          If you're ready to make your mark, we encourage you to become a
          registered user. Create your own blogs, share your insights, and
          invite others to join the conversation. Every voice is valued here,
          and your contributions will find their place in this ever-evolving
          tapestry of knowledge and creativity.
        </p>
        <p>
          Our commitment to a vibrant, respectful, and inclusive community
          extends to our moderation system. Admin users ensure the quality and
          integrity of our content by editing and deactivating comments and
          blogs when necessary, ensuring a safe and enriching environment for
          all.
        </p>
        <p>
          So, welcome to our blogging haven, where words take flight, and ideas
          find a home. We can't wait to see where your journey with us will
          lead. Explore, create, connect, and let your voice be heard.
        </p>
      </div>
    </section>
  );
}

export default Home;
