import { useEffect, useState } from "react";
import { dbService } from "fbase";
import Jweet from "components/Jweet";
import JweetFactory from "components/JweetFactory";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  height: 100%;
`;

const Home = ({ userObj }) => {
  const [jweets, setJweets] = useState([]);

  /* method I - No Real Time
  const getJweets = async () => {
    const dbJweets = await dbService.collection("jweets").get();
    dbJweets.forEach((document) => {
      const jweetObject = {
        ...document.data(),
        id: document.id,
      };
      setJweets((prev) => [jweetObject, ...prev]);
    });
  };
  */

  useEffect(() => {
    //method II - Real time update page
    dbService
      .collection("jweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const jweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJweets(jweetArray);
      });
  }, []);
  return (
    <Container>
      <JweetFactory userObj={userObj} />
      {jweets.map((jweet) => (
        <Jweet
          key={jweet.id}
          jweetObj={jweet}
          isOwner={jweet.creatorId === userObj.uid}
        />
      ))}
    </Container>
  );
};

export default Home;
